import React, { useState, useRef, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Platform, Alert, TextInput, FlatList, TouchableOpacity, Text } from "react-native";
import GeoLocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { gkey } from "../../../common/config";
import { Marker } from "react-native-maps";


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
  description: string;
  place_id: string;
}

const SearchLocation: React.FC = () => {
    const [locationQuery, setLocationQuery] = useState<string>("");
    const [region, setRegion] = useState<Region | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [address, setAddress] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const mapRef = useRef<MapView | null>(null);

    useEffect(() => {
      requestLocationPermission();
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
    
    // Get address from Google Maps API
    // const getAddressFromCoordinates = async (lat: number, lng: number) => {
    //   try {
    //       const response = await fetch(
    //         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${gkey}`
    //       );
    //       const data = await response.json();
    //       console.log("ADDRESS: ", data);

    //       if (data.status === "OK") {
    //         setAddress(data.results[0].formatted_address);
    //       } else {
    //         setAddress("Address not found");
    //       }
    //     } catch (error) {
    //       console.error("Error fetching address:", error);
    //       setAddress("Error fetching address");
    //     }
    //     setLoading(false);
    //   };
    


      // Search for Locations
      const searchLocations = async (query: string) => {
        if (!query) return;
        setLocationQuery(query);

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${gkey}&types=geocode`
          );
          const data = await response.json();
          console.log("Search Location Data: ", data);

          if (data.status === "OK") {
            const locations: SearchResult[] = [];
            for (const item of data.predictions) {
              const location: SearchResult = { place_id: item.place_id, description: item.description};
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
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };


    return (
      <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for a location"
        value={locationQuery}
        onChangeText={searchLocations}
      />

      {/* Search Results List */}
      {searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.place_id}
          style={styles.searchResults}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.resultItem} onPress={() => selectLocation(item.place_id)}>
              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* Map View */}
      <MapView
        ref={mapRef}
        style={styles.map}
        // region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* Marker for the selected location */}
        { region && (
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          )
        }
      </MapView>

      {/* Button to Get Current Location */}
      <TouchableOpacity style={styles.locationButton} onPress={requestLocationPermission}>
        <Text style={styles.buttonText}>📍 Use My Location</Text>
      </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    margin: 10,
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
  map: {
    width: "100%",
    height:  "100%",
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