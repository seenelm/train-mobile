import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EventInput from "./EventInput";
import DateTimePickerButton from "./DateTimePicker";
import Button from "../../../components/button";
import { CreateEventFormProps } from "../types/eventTypes";
import { Event } from "../types/eventTypes";
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import EventUtil from "../utils/eventUtils";
import { EventRequest, fromEvent } from "../models/eventModel";
import * as Icons from "../../../assets/icons";

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
        hasButton={true}
      />
      {/* Start Date/Time, End Time, and End Date (if shown) in the same row */}

      <View style={styles.dateRow}>
        <Text style={styles.date}>Date</Text>
      </View>
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
            textStyle={styles.datePickerText}
          />
        </View>


        <Text style={styles.timeText}>From</Text>

        
      
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
            textStyle={styles.datePickerText}
            displayText={event.startTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}

          />
        </View>
        <Text style={styles.timeText}>To</Text>
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
            textStyle={styles.datePickerText}
            displayText={event.endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </View>
        <Button imgSource={Icons.edit} imgStyle={styles.editImage} style={styles.editDate}/>
      </View>

      <EventInput
        placeholder="Add Location"
        value={event.location}
        imgSrc={Icons.location}
        imgStyle={styles.locationImg}
        onChangeText={(text) => handleEvent("location", text)}
      />

      <View style={styles.dateRow}>
        <Text style={styles.date}>Add People</Text>
      </View>
      <EventInput 
        placeholder="Search contacts"
        imgSrc={Icons.search}
        imgStyle={styles.searchImg}
        onChangeText={() => {}}
      /> 

      <Button onPress={handleSubmit} style={styles.save}>Save Event</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    margin: 10,
  },
  dateRow: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 5,
    marginRight: 10,
  },
  datePickerText: {
    fontSize: 14,
  },
  date: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  quarterWidth: {
    flex: 1, // Adjust this as needed
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  timeText: {
    alignSelf: "center",
    marginHorizontal: 5,
  },
  save: {
    borderRadius: 5,
    margin: 10,
  },
  editImage: {
    width: 20,
    height: 20,
  },
  editDate: {
    borderRadius: 5,
    height: 40,
    alignSelf: "center"
  },
  locationImg: {
    width: 20, 
    height: 20,
  },
  searchImg: {
    width: 20,
    height: 20,
  }
});

export default CreateEventForm;