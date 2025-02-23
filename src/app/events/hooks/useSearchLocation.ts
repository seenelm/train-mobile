import { useState } from "react";
import { gkey } from "../../../common/config";
import { useSearchLocationContext } from "../context/SearchLocationContext";

export interface Location {
  formattedAddress: string;
  place_id: string;
  locationName: string;
  icon: string;
  iconBackgroundColor: string;
}

export const useSearchLocation = () => {
    const [locationQuery, setLocationQuery] = useState<string>("");
    const [locations, setLocations] = useState<Location[]>([]);
    const { updateMapView } = useSearchLocationContext();

    const searchLocations = async (query: string) => {
        if (!query || query.length === 0) {
            setLocations([]);
        }
        setLocationQuery(query);
        try {
            const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${gkey}`
            );
            const data = await response.json();
            console.log("Search Location Data: ", data);

            if (data.status === "OK") {
                const locations: Location[] = [];
                for (const item of data.results) {
                    const location: Location = { 
                    place_id: item.place_id, 
                    formattedAddress: item.formatted_address,
                    icon: item.icon,
                    iconBackgroundColor: item.icon_background_color,
                    locationName: item.name
                    };
                    locations.push(location);
                }
                console.log("Locations: ", locations);
                setLocations(locations);
            } else {
                setLocations([]);
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
                console.log(`SELECT LOCATION LAT: ${lat} LONG: ${lng}`);
                updateMapView(lat, lng);
                setLocations([]); // Clear search results after selection
                setLocationQuery(""); // Reset search bar
                // sheetRef.current?.snapToIndex(1); // Collapse bottom sheet
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    return {
        selectLocation,
        searchLocations,
        locationQuery,
        locations
    }
  
};