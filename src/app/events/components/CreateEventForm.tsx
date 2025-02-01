import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { FormProps } from "../types/inputs";
import { CreateEventFormProps } from "../types/createEventFormProps";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../../components/button";
import Form from "../../../components/form";

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit }) => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const formInputs: FormProps[] = [
    {
      placeholder: "Enter event name",
      value: eventName,
      onChangeText: setEventName,
      style: {
        backgroundColor: "#f5f5f5",
        borderColor: "#ddd",
        height: 50,
      },
    },
    {
      placeholder: "Enter event description",
      value: eventDescription,
      onChangeText: setEventDescription,
      style: {
        backgroundColor: "#f5f5f5",
        borderColor: "#ddd",
        height: 50,
      },
    },
    {
      placeholder: "Enter event location",
      value: eventLocation,
      onChangeText: setEventLocation,
      style: {
        backgroundColor: "#f5f5f5",
        borderColor: "#ddd",
        height: 50,
      },
    },
  ];

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setEventDate(selectedDate);
    }
  };

  const handleStartTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndTimeChange = (event: any, selectedTime?: Date) => {
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      eventName,
      eventDescription,
      eventLocation,
      eventDate,
      startTime,
      endTime,
    });
  };

  return (
    <View style={styles.formContainer}>
      <Form
        title="Create An Event"
        inputs={formInputs}
        containerStyle={styles.formContent}
      />
      <View style={styles.row}>
        <Button
          style={styles.dateButton}
          textStyle={styles.dateButtonText}
          onPress={() => {
            setShowDatePicker((prev) => !prev);
            setShowStartTimePicker(false);
            setShowEndTimePicker(false);
          }}
        >
          {eventDate.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          })}
        </Button>
        <Button
          style={styles.dateButton}
          textStyle={styles.dateButtonText}
          onPress={() => {
            setShowStartTimePicker((prev) => !prev);
            setShowDatePicker(false);
            setShowEndTimePicker(false);
          }}
        >
          {`${startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </Button>
        <Button
          style={styles.dateButton}
          textStyle={styles.dateButtonText}
          onPress={() => {
            setShowEndTimePicker((prev) => !prev);
            setShowDatePicker(false);
            setShowStartTimePicker(false);
          }}
        >
          {`${endTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </Button>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={eventDate}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={handleDateChange}
          style={styles.picker}
        />
      )}
      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleStartTimeChange}
          style={styles.picker}
        />
      )}
      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleEndTimeChange}
          style={styles.picker}
        />
      )}
      <Button style={styles.saveButton} onPress={handleSubmit}>
        Save Event
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formContent: {
    padding: 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 5,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#555",
  },
  picker: {
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
});

export default CreateEventForm;