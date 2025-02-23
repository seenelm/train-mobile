import React from "react";
import SearchLocation from "../components/SearchLocation";
import { SearchLocationProvider } from "../context/SearchLocationContext";


const SearchLocationView: React.FC = () => {
  return (
    <SearchLocationProvider>
        <SearchLocation/>
    </SearchLocationProvider>
  );
};

export default SearchLocationView;