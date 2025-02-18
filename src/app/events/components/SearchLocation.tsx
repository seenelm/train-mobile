import React, { useState, useRef, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Platform, Alert, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import GeoLocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { gkey } from "../../../common/config";
import { Marker } from "react-native-maps";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Region {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

interface Location {
  address: string;
  addressName: string;
}

interface SearchResult {
  // description: string;
  formattedAddress: string;
  place_id: string;
  locationName: string;
  icon: string;
  iconBackgroundColor: string;
}

const SearchLocation: React.FC = () => {
    const [locationQuery, setLocationQuery] = useState<string>("");
    const [region, setRegion] = useState<Region | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [address, setAddress] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const mapRef = useRef<MapView | null>(null);
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = ['50%', '90%'];


    useEffect(() => {
      requestLocationPermission();
    }, []);

    useEffect(() => {
      sheetRef.current?.expand();
    }, []);
    

    // Request location permission from native ios or android device
    async function requestLocationPermission() {
      try {
        const result = await request(
          Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        console.log("Location permission result:", result);

        if (result === RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          // Show Alert
          Alert.alert("Permission Denied", "Location access is needed to show your position on the map.");
          console.log("Location permission denied");
        }
      } catch (error) {
        console.error("Permission error: ", error);
      }
    }

    // Get devices latitude and longitude
    const getCurrentLocation = () => {
      GeoLocation.getCurrentPosition(
        (position) => {
          updateMapView(position.coords.latitude, position.coords.longitude);
          console.log("Current position:", position);
        },
        (error) => {
          console.error("Error getting location", error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    // Update region after user selects location
    const updateMapView = (lat: number, lng: number) => {
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05
      });

      mapRef.current?.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        },
        1000
      )
    };
    
    


      // Search for Locations
      const searchLocations = async (query: string) => {
        if (!query) return;
        setLocationQuery(query);
        try {
          // const response = await fetch(
          //   `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${gkey}&types=geocode`
          // );

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${gkey}`
          );
          const data = await response.json();
          console.log("Search Location Data: ", data);

          if (data.status === "OK") {
            const locations: SearchResult[] = [];
            for (const item of data.results) {
              const location: SearchResult = { 
                place_id: item.place_id, 
                formattedAddress: item.formatted_address,
                icon: item.icon,
                iconBackgroundColor: item.icon_background_color,
                locationName: item.name
              };
              locations.push(location);
            }
            console.log("Locations: ", locations);
            setSearchResults(locations);
          } else {
            setSearchResults([]);
          }
        } catch (error) {
          console.error("Error fetching places:", error);
        }
      }

      const selectLocation = async (placeId: string) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${gkey}`
          );
          const data = await response.json();
          console.log("SELECT LOCATION DATA: ", data);
          if (data.status === "OK") {
            const { lat, lng } = data.result.geometry.location;
            updateMapView(lat, lng);
            setSearchResults([]); // Clear search results after selection
            setLocationQuery(""); // Reset search bar
            // sheetRef.current?.snapToIndex(1); // Collapse bottom sheet
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };


      return (
        <GestureHandlerRootView style={styles.container}>
          {region &&
            <MapView
                ref={mapRef}
                style={styles.map}
                region={region}
                showsUserLocation={true}
                showsMyLocationButton={false}
            >
          
                {region && <Marker coordinate={region} />}
            </MapView>
          }

            <BottomSheet
                ref={sheetRef}
                index={0}
                snapPoints={snapPoints}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                backgroundStyle={styles.sheetBackground}
                handleIndicatorStyle={styles.handleIndicator}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for a location"
                        value={locationQuery}
                        onChangeText={searchLocations}
                        onFocus={() => sheetRef.current?.snapToIndex(2)}
                    />
                    <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.place_id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.resultItem}
                                onPress={() => selectLocation(item.place_id)}
                            >
                                <Text>{item.formattedAddress}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </BottomSheetView>
            </BottomSheet>

            {/* <TouchableOpacity 
                style={styles.locationButton} 
                onPress={requestLocationPermission}
            >
                <Text style={styles.buttonText}>📍</Text>
            </TouchableOpacity> */}
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height:  "100%",
},
sheetBackground: {
    backgroundColor: '#fff',
    borderRadius: 20,
},
handleIndicator: {
    backgroundColor: '#ccc',
    width: 40,
    height: 4,
    marginVertical: 8,
},
sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
},
searchInput: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
},
  searchResults: {
    position: "absolute",
    top: 60,
    backgroundColor: "#fff",
    zIndex: 1,
    width: "95%",
    alignSelf: "center",
    borderRadius: 5,
    maxHeight: 200,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  locationButton: {
    position: "absolute",
    bottom: 30,
    left: "20%",
    right: "20%",
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SearchLocation;