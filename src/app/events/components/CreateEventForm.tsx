import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import EventInput from "./EventInput";
import DateTimePickerButton from "./DateTimePicker";
import Button from "../../../components/button";
import { CreateEventFormProps } from "../types/eventTypes";
import EventUtil from "../utils/eventUtils";
import { EventRequest, fromEvent } from "../models/eventModel";
import { useEvent } from "../context/EventContext";
import * as Icons from "../../../assets/icons";
import { MainStackParamList } from "../../../navigation/types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { selectLocation } from "../../../services/locationSlice";
import { AlertTime } from "../types/eventTypes";
import ContextMenu from "react-native-context-menu-view";

type CreateEventFormNavigationProp = StackNavigationProp<MainStackParamList, "SearchLocation">;

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const selectedLocation = useSelector(selectLocation);
  const { event, updateEvent } = useEvent();
  const navigation = useNavigation<CreateEventFormNavigationProp>();
  const [showAlertMenu, setShowAlertMenu] = useState(false);

  useEffect(() => {
    updateEvent({ location: selectedLocation });
  }, [selectedLocation]);

  const handleSubmit = () => {
    const createEventRequest: EventRequest = fromEvent(event);
    onSubmit(createEventRequest);
  };

  const nav = (screen: keyof MainStackParamList) => {
    try {
    navigation.navigate(screen);
    } catch (e) {
      console.log("Nav Error: ", e);
    }
  };

  const getAlertTimeText = (alertTime?: AlertTime): string => {
    switch (alertTime) {
      case AlertTime.AT_TIME:
        return "At time of event";
      case AlertTime.FIFTEEN_MIN:
        return "15 minutes before";
      case AlertTime.THIRTY_MIN:
        return "30 minutes before";
      case AlertTime.ONE_HOUR:
        return "1 hour before";
      default:
        return "At time of event";
    }
  };

  const handleAlertTimeSelect = (index: number) => {
    let selectedAlertTime: AlertTime;
    
    switch (index) {
      case 0:
        selectedAlertTime = AlertTime.AT_TIME;
        break;
      case 1:
        selectedAlertTime = AlertTime.FIFTEEN_MIN;
        break;
      case 2:
        selectedAlertTime = AlertTime.THIRTY_MIN;
        break;
      case 3:
        selectedAlertTime = AlertTime.ONE_HOUR;
        break;
      default:
        selectedAlertTime = AlertTime.AT_TIME;
    }
    
    updateEvent({ alertTime: selectedAlertTime });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Event</Text>
      <EventInput
        placeholder="Event Name"
        value={event.name}
        onChangeText={(text) => updateEvent({ name: text })}
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
              updateEvent({ startTime: EventUtil.updateDate(event.startTime, date)})
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
              updateEvent({ startTime: EventUtil.updateTime(event.startTime, time)})
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
              updateEvent({ endTime: EventUtil.updateTime(event.endTime, time)})
            }
            textStyle={styles.datePickerText}
            displayText={event.endTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        </View>
        <Button imgSource={Icons.more} imgStyle={styles.editImage} style={styles.editDate}/>
      </View>

      <EventInput
        placeholder="Add Location"
        value={event.location}
        imgSrc={Icons.location}
        imgStyle={styles.locationImg}
        onPress={() => nav('SearchLocation')}
      />

      {/* Alert Section */}
      <View style={styles.dateRow}>
        <Text style={styles.date}>Alert</Text>
      </View>
      <EventInput

        onPress={() => setShowAlertMenu(true)}
        hasAlert={true}
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

      <Button onPress={handleSubmit} style={styles.save} textStyle={styles.saveText}>Create Event</Button>
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
    fontSize: 13,
  },
  date: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  quarterWidth: {
    flex: 1,
  },
  pickerContainer: {
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  timeText: {
    alignSelf: "center",
  },
  save: {
    borderRadius: 5,
    margin: 10,
    paddingVertical: 20,
  },
  saveText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editImage: {
    width: 30,
    height: 30,
  },
  editDate: {
    borderRadius: 5,
    paddingVertical: 13, 
    alignSelf: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  locationImg: {
    width: 20, 
    height: 20,
  },
  searchImg: {
    width: 20,
    height: 20,
  },
  // Alert styles matching EventInput
  alertWrapper: {
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "flex-start",
  },
  alertContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    height: 60, // Match the height of EventInput
    width: "70%", // Ensure full width
    marginLeft: 13,
  },
  alertContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  alertInputText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  alertIcon: {
    width: 20,
    height: 20,
  },
});

export default CreateEventForm;