import { useEffect} from "react";
import GeoLocation from "react-native-geolocation-service";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Platform, Alert } from "react-native";
import { useSearchLocationContext } from "../context/SearchLocationContext";

export const useLocationPermission = () => {
    const { updateMapView } = useSearchLocationContext();

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
};