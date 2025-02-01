import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, Animated, PanResponder } from "react-native";
import EventCard from "./EventCard";
import { useGetUserEvents } from "../services/eventActions";
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import { useCalendarContext } from "../context/CalendarProvider";

export const EventList = () => {
    const { selectedDate, setSelectedDate } = useCalendarContext();
    const userId = useSelector(selectUser);
    const { data: events } = useGetUserEvents(userId);
    const animation = useRef(new Animated.Value(1)).current;
    const translateX = useRef(new Animated.Value(0)).current;
    const currentDateRef = useRef(selectedDate);

    // Always keep ref updated
    useEffect(() => {
        currentDateRef.current = selectedDate;
    }, [selectedDate]);

    // Animation setup
    useEffect(() => {
        const direction = selectedDate > currentDateRef.current ? -1 : 1;
        
        Animated.parallel([
            Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(translateX, {
                toValue: 50 * direction,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            Animated.parallel([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    }, [selectedDate]);

    // Pan responder with correct date reference
    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 10;
            },
            onPanResponderRelease: (_, gestureState) => {
                if (Math.abs(gestureState.dx) > 50 || Math.abs(gestureState.vx) > 0.3) {
                    const baseDate = new Date(currentDateRef.current);
                    
                    if (gestureState.dx > 0) {
                        baseDate.setDate(baseDate.getDate() - 1);
                    } else {
                        baseDate.setDate(baseDate.getDate() + 1);
                    }
                    
                    setSelectedDate(baseDate);
                }
            },
        })
    ).current;

    const normalizeDate = (date: Date) => 
        new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const filteredEvents = events?.filter(event => {
        const start = normalizeDate(new Date(event.event.startTime));
        const end = normalizeDate(new Date(event.event.endTime));
        const current = normalizeDate(selectedDate);
        return current >= start && current <= end;
    }) || [];

    return (
        <Animated.View 
            style={[{ flex: 1 }, { opacity: animation, transform: [{ translateX }] }]}
            {...panResponder.panHandlers}
        >
            <FlatList
                data={filteredEvents}
                renderItem={({ item }) => <EventCard item={item} />}
                keyExtractor={(item) => item.event.id}
                contentContainerStyle={styles.eventList}
                showsVerticalScrollIndicator={false}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    eventList: {
        padding: 20
    }
});