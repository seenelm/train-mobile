import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import EventInput from "./EventInput";
import DateTimePickerButton from "./DateTimePicker";
import Button from "../../../components/button";
import { CreateEventFormProps } from "../types/eventTypes";
import { Event } from "../types/eventTypes";
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import EventUtil from "../utils/eventUtils";
import { EventRequest, fromEvent } from "../models/eventModel";

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const userId = useSelector(selectUser);
  const [showEndDate, setShowEndDate] = useState(false);

  const [event, setEvent] = useState<Event>({
    name: "",
    admin: [userId],
    invitees: [],
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    description: "",
  });

  const handleEvent = (key: keyof Event, value: any) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const createEventRequest: EventRequest = fromEvent(event);
    onSubmit(createEventRequest);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Event</Text>
      <EventInput
        placeholder="Event Name"
        value={event.name}
        onChangeText={(text) => handleEvent("name", text)}
      />
      {/* Start Date/Time, End Time, and End Date (if shown) in the same row */}
      <View style={styles.row}>
        <View style={styles.quarterWidth}>
          <DateTimePickerButton
            value={event.startTime}
            mode="date"
            onChange={(e, date) =>
              date &&
              setEvent((prev) => ({
                ...prev,
                startTime: EventUtil.updateDate(prev.startTime, date),
              }))
            }
            displayText={event.startTime.toLocaleDateString()}
          />
        </View>
        {showEndDate && (
          <View style={styles.quarterWidth}>
            <DateTimePickerButton
              value={event.endTime}
              mode="date"
              onChange={(e, date) =>
                date &&
                setEvent((prev) => ({
                  ...prev,
                  endTime: EventUtil.updateDate(prev.endTime, date),
                }))
              }
              displayText={event.endTime.toLocaleDateString()}
            />
          </View>
        )}
        <View style={styles.quarterWidth}>
          <DateTimePickerButton
            value={event.startTime}
            mode="time"
            onChange={(e, time) =>
              time &&
              setEvent((prev) => ({
                ...prev,
                startTime: EventUtil.updateTime(prev.startTime, time),
              }))
            }
            displayText={event.startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </View>

        <View style={styles.quarterWidth}>
          <DateTimePickerButton
            value={event.endTime}
            mode="time"
            onChange={(e, time) =>
              time &&
              setEvent((prev) => ({
                ...prev,
                endTime: EventUtil.updateTime(prev.endTime, time),
              }))
            }
            displayText={event.endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </View>

        
      </View>
      <EventInput
        placeholder="Event Description"
        value={event.description}
        onChangeText={(text) => handleEvent("description", text)}
      />
      <EventInput
        placeholder="Event Location"
        value={event.location}
        onChangeText={(text) => handleEvent("location", text)}
      />

      

      {/* Add/Remove End Date Button */}
      <Button
        onPress={() => {
          if (!showEndDate) {
            setEvent((prev) => ({ ...prev, endTime: prev.startTime }));
          }
          setShowEndDate(!showEndDate);
        }}
        style={styles.addDate}
        textStyle={styles.addDateText}
      >
        {showEndDate ? "Remove End Date" : "+ End Date"}
      </Button>

      <Button onPress={handleSubmit} style={styles.save}>Save Event</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    margin: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  quarterWidth: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  pickerContainer1: {
    flex: 1,
    marginRight: 150,
  },
  addDate: {
    backgroundColor: "transparent",
    
  },
  addDateText: {
    color: "black",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  save: {
    borderRadius: 5,
    margin: 10,
  }
});

export default CreateEventForm;