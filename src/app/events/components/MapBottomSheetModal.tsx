import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity, Image } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSearchLocation } from "../hooks/useSearchLocation";
import { Location } from "../hooks/useSearchLocation";
import { AppDispatch } from "../../../services/store";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { addLocation } from "../../../services/locationSlice";

const MapBottomSheetModal: React.FC = () => { 
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['10%', '50%', '90%'], []);
    const { searchLocations, locationQuery, locations, selectLocation } = useSearchLocation();
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const navigation = useNavigation();

    const dispatch = useDispatch<AppDispatch>();

    const logSheet = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleSheet = useCallback(() => {
        sheetRef.current?.snapToIndex(3);
    }, []);

    const handleSelectedLocationSheet = useCallback(() => {
      sheetRef.current?.snapToIndex(2);
  }, []);

    // When a location is pressed, store it in state
    const handleLocationSelect = (locationId: string) => {
        selectLocation(locationId);
        const location = locations.find(item => item.place_id === locationId);
        if (location) {
            setSelectedLocation(location);
            handleSelectedLocationSheet();
            handleSheet();
        }
    };

    const handleAddLocation = (address: string) => {
      console.log("Handle Adding Location:", address);
      dispatch(addLocation(address));
      navigation.goBack();
    };

    // Return to search view
    const handleBackToSearch = () => {
        setSelectedLocation(null);
    };

    // Search View Component
    const renderSearchView = () => (
        <>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a location"
                value={locationQuery}
                onChangeText={searchLocations}
                onFocus={handleSheet}
            />
            <FlatList
                data={locations}
                keyExtractor={(item) => item.place_id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.resultItem}
                        onPress={() => handleLocationSelect(item.place_id)}
                    >
                        <View style={[styles.iconContainer, { backgroundColor: "lightgray" }]}>
                            <Image
                                source={{ uri: item.icon }}
                                style={styles.icon}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.locationName}>{item.locationName}</Text>
                            <Text style={styles.formattedAddress}>{item.formattedAddress}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </>
    );

    // Details View Component
    const renderDetailsView = () =>
      selectedLocation ? (
        <View style={styles.detailsContainer}>
            <View style={styles.detailsHeader}>
                <Text style={styles.detailsTitle}>{selectedLocation.locationName}</Text>
                <TouchableOpacity onPress={handleBackToSearch} style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.detailsAddress}>{selectedLocation.formattedAddress}</Text>
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => handleAddLocation(selectedLocation.formattedAddress)}
            >
                <Text style={styles.addButtonText}>Add Location</Text>
            </TouchableOpacity>
        </View>
      ) : null;

    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                onChange={logSheet}
                backgroundStyle={styles.sheetBackground}
                handleIndicatorStyle={styles.handleIndicator}
            >
                <BottomSheetView style={styles.sheetContent}>
                    {selectedLocation ? renderDetailsView() : renderSearchView()}
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sheetBackground: {
        backgroundColor: "#fff",
        borderRadius: 20,
    },
    handleIndicator: {
        backgroundColor: "#000",
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 5,
        fontSize: 16,
        backgroundColor: "#f5f5f5",
        marginBottom: 10,
    },
    resultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20, // Makes the container circular
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    textContainer: {
        flex: 1,
    },
    locationName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    formattedAddress: {
        fontSize: 14,
        color: '#666',
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    detailsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    detailsTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: '#007aff',
    },
    detailsAddress: {
        fontSize: 16,
        marginBottom: 30,
    },
    addButton: {
        backgroundColor: '#007aff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default MapBottomSheetModal;
