import React from "react";
import MapView from "react-native-maps";
import { StyleSheet} from "react-native";
import { Marker } from "react-native-maps";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapBottomSheetModal from "./MapBottomSheetModal";
import { useSearchLocationContext } from "../context/SearchLocationContext";
import { useLocationPermission } from "../hooks/useLocationPermission";


const SearchLocation: React.FC = () => {
    const { region, mapRef } = useSearchLocationContext();
    useLocationPermission();

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
          <MapBottomSheetModal />  
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
},
sheetContent: {
    flex: 1,
    paddingHorizontal: 16,
},
searchInput: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 5,
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