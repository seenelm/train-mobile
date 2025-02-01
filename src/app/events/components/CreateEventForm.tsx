import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import EventInput from "./EventInput";
import DateTimePickerButton from "./DateTimePicker";
import SubmitButton from "./SubmitButton";
import { CreateEventFormProps } from "../types/createEventFormProps";
import { CreateEventRequest } from "../models/createEventRequest";
import { Event, fromEvent } from "../types/eventTypes";
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import EventUtil from "../utils/EventUtil";

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const userId = useSelector(selectUser);

  const [event, setEvent] = useState<Event>({
    name: "",
    admin: [userId],
    invitees: [],
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    description: "",
  })

  const handleEvent = (key: keyof Event, value: any) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [key]: value,
    }))
  };

  const handleSubmit = () => {
    const createEventRequest: CreateEventRequest = fromEvent(event);
    onSubmit(createEventRequest);
  };

  return (
    <View style={styles.container}>
      <EventInput placeholder="Event Name" value={event.name} onChangeText={(text) => handleEvent('name', text)} />
      <EventInput placeholder="Event Description" value={event.description} onChangeText={(text) => handleEvent('description', text)} />
      <EventInput placeholder="Event Location" value={event.location} onChangeText={(text) => handleEvent('location', text)} />

      <View style={styles.row}>
      <DateTimePickerButton
        value={event.startTime}
        mode="date"
        onChange={(e, date) => date && setEvent(prev => ({ ...prev, startTime: EventUtil.updateDate(prev.startTime, date) }))}
        displayText={event.startTime.toLocaleDateString()}
      />

      <DateTimePickerButton
        value={event.startTime}
        mode="time"
        onChange={(e, time) => time && setEvent(prev => ({ ...prev, startTime: EventUtil.updateTime(prev.startTime, time) }))}
        displayText={event.startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      />
    </View>

    <View style={styles.row}>
      <DateTimePickerButton
        value={event.endTime}
        mode="date"
        onChange={(e, date) => date && setEvent(prev => ({ ...prev, endTime: EventUtil.updateDate(prev.endTime, date) }))}
        displayText={event.endTime.toLocaleDateString()}
      />

      <DateTimePickerButton
        value={event.endTime}
        mode="time"
        onChange={(e, time) => time && setEvent(prev => ({ ...prev, endTime: EventUtil.updateTime(prev.endTime, time) }))}
        displayText={event.endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      />
    </View>

      <SubmitButton onPress={handleSubmit} text="Save Event" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});

export default CreateEventForm;