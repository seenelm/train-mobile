import React from "react";
import { FlatList, StyleSheet, Animated } from "react-native";
import EventCard from "./EventCard";
import { useGetUserEvents } from "../services/eventActions";
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import { useCalendarContext } from "../context/CalendarContext";
import useEventListAnimation from "../hooks/useEventListAnimation";

export const EventList = () => {
    const { selectedDate } = useCalendarContext();
    const userId = useSelector(selectUser);
    const { data: events } = useGetUserEvents(userId);

    const { animation, translateX, panResponder } = useEventListAnimation();

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