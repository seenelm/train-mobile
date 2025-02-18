import React, { useState, useRef, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Platform } from "react-native";
import GeoLocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";


interface Location {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

const SearchLocation: React.FC = () => {
    const [locationQuery, setLocationQuery] = useState<string>("");
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const mapRef = useRef<MapView | null>(null);

    useEffect(() => {
        async function requestAndGetLocation() {
          if (Platform.OS === "ios") {
            const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log("Location permission result:", result);
            if (result === RESULTS.GRANTED) {
              GeoLocation.getCurrentPosition(
                (position) => {
                  console.log("Current position:", position);
                },
                (error) => {
                  console.error("Error getting location", error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
            } else {
              console.log("Location permission denied");
            }
          }
        }
        requestAndGetLocation();
      }, []);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}></MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});

export default SearchLocation;