import React from "react";
import { View, FlatList, StyleSheet} from "react-native";
import EventCard from "./EventCard";
import { useGetUserEvents } from "../services/eventActions";
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import { useCalendarContext } from "../context/CalendarProvider";

export const EventList = () => {
    const { selectedDate } = useCalendarContext();
    console.log("selected date in eventlist", selectedDate);
    const userId = useSelector(selectUser);
    const { data: events } = useGetUserEvents(userId);
    console.log("events", events)
    return (
        <View style={{ flex: 1}}>
            <FlatList
                data={events}
                renderItem={({ item }) => <EventCard item={item} />}
                keyExtractor={(item) => item.event._id}
                contentContainerStyle={styles.eventList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create ({
    eventList: {
        padding: 20
    }

});
