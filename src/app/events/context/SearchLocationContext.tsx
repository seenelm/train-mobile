import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import MapView from "react-native-maps";

interface SearchLocationContextType {
  region: Region | null;
  setRegion: React.Dispatch<React.SetStateAction<Region | null>>;
  mapRef: React.MutableRefObject<MapView | null>;
  updateMapView: (lat: number, lng: number) => void;
}

const SearchLocationContext = createContext<SearchLocationContextType | undefined>(undefined);

interface SearchLocationProviderProps {
  children: ReactNode;
}

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const SearchLocationProvider: React.FC<SearchLocationProviderProps> = ({ children }) => {
  const [region, setRegion] = useState<Region | null>(null);
  const mapRef = useRef<MapView | null>(null);

  // Update region after user selects location
  const updateMapView = (lat: number, lng: number) => {
    console.log(`UPDATE MAP VIEW LAT: ${lat} LONG: ${lng}`);
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

  return (
    <SearchLocationContext.Provider value={{ 
      region,
      setRegion,
      mapRef,
      updateMapView
    }}>
      {children}
    </SearchLocationContext.Provider>
  );
};

export const useSearchLocationContext = () => {
  const context = useContext(SearchLocationContext);
  if (!context) {
    throw new Error('useSearchLocationContext must be used within a Provider');
  }
  return context;
};