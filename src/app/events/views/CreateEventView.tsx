import React, { useState } from "react";
import { View, StyleSheet, TextStyle } from "react-native";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import Button from "../../../components/button";
import Form from "../../../components/form";

const CreateEventView: React.FC = () => {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const safeAreaEdges: Edge[] = ['top', 'left', 'right'];

  const formInputs = [
    {
      placeholder: "Enter event name",
      value: eventName,
      onChangeText: setEventName,
    },
    {
      placeholder: "Enter event description",
      value: eventDescription,
      onChangeText: setEventDescription,
      style: {
        height: 100,
        textAlignVertical: 'top'
      } as TextStyle,
    },
    {
      placeholder: "Enter event location",
      value: eventLocation,
      onChangeText: setEventLocation,
    },
  ];

  return (
    <SafeAreaView edges={safeAreaEdges} style={styles.container}>
      <View style={styles.content}>
        <Form
          title="Create Event"
          inputs={formInputs}
          containerStyle={styles.formContainer}
        />
        <Button style={styles.dateButton} textStyle={styles.dateButtonText}>
          Select a date
        </Button>
        <Button style={styles.saveButton}>Save Event</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  content: {
    padding: 20,
  },
  formContainer: {
    padding: 0,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  dateButtonText: {
    fontSize: 16,
    color: "#555",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
});

export default CreateEventView;