import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useUpdateEvent } from '../services/eventActions';
import Button from '../../../components/button';
import { UserEventResponse } from '../models/eventModel';
import { Event } from "../types/eventTypes";
import { EventRequest, fromEvent } from "../models/eventModel";
import { useSelector } from 'react-redux';
import { selectUser } from '../../../services/authSlice';
import { useEvent } from '../context/EventContext';

interface EditEventFormProps {
  userEventResponse: UserEventResponse;
  onSave: (updatedEvent: EventRequest) => void;
  onCancel: () => void;
};

const EditEventForm: React.FC<EditEventFormProps> = ({ userEventResponse, onSave, onCancel }) => {
  const adminId = useSelector(selectUser);
  const { mutate: updateEventMutation } = useUpdateEvent(userEventResponse.event.id, adminId);
  const { updateEvent } = useEvent();

  // Local state for the form fields.
  const [eventName, setEventName] = useState(userEventResponse.event.name);
  const [eventDescription, setEventDescription] = useState(userEventResponse.event.description);
  const [eventStartTime, setEventStartTime] = useState(userEventResponse.event.startTime);
  const [eventLocation, setEventLocation] = useState(userEventResponse.event.location);

  const handleSave = () => {
    // Create an updated event request object using the form state.
    const updatedEvent: EventRequest = fromEvent({
      ...userEventResponse.event,
      name: eventName,
      description: eventDescription,
      startTime: eventStartTime,
      location: eventLocation,
    });

    // Trigger the PUT mutation.
    updateEventMutation(updatedEvent);

    // Update Event Context
    updateEvent(updatedEvent);
    // Call the onSave callback (for example, to close the edit form).
    onSave(updatedEvent);
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Edit Event</Text>

      <Text style={styles.label}>Event Name</Text>
      <TextInput
        style={styles.input}
        value={eventName}
        onChangeText={setEventName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={eventDescription}
        onChangeText={setEventDescription}
        multiline
      />

      <Text style={styles.label}>Start Time</Text>
      <TextInput
        style={styles.input}
        value={eventStartTime}
        onChangeText={setEventStartTime}
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={eventLocation}
        onChangeText={setEventLocation}
      />

      <View style={styles.editButtonsContainer}>
        <Button style={styles.saveButton} onPress={handleSave}>
          Save
        </Button>
        <Button style={styles.cancelButton} onPress={onCancel}>
          Cancel
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '100%',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    flex: 1,
    marginLeft: 5,
  },
});

export default EditEventForm;
