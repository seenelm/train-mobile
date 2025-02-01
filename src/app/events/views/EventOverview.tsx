import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { EventResponse } from '../models/eventModel';

const EventOverview: React.FC = () => {
  const route = useRoute();
  const { event } = route.params as { event: EventResponse };
  console.log("Admin", event.admin);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title & Date */}
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.date}>{event.startTime}</Text>

      {/* Time */}
      <Text style={styles.time}>
        {event.startTime} - {event.endTime}
      </Text>

      {/* Location */}
      <Text style={styles.location}>Location: {event.location}</Text>

      {/* Description */}
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>{event.description}</Text>

      {/* Admin */}
      <Text style={styles.sectionTitle}>Admin</Text>
      {event.admin.map((adminName, index) => (
        <Text key={index} style={styles.listItem}>
          {adminName}
        </Text>
      ))}

      {/* Invitees */}
      <Text style={styles.sectionTitle}>Invitees</Text>
      {event.invitees.map((invitee, index) => (
        <Text key={index} style={styles.listItem}>
          {invitee}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10
  },
  date: {
    fontSize: 18,
    marginBottom: 5
  },
  time: {
    fontSize: 18,
    marginBottom: 5
  },
  location: {
    fontSize: 18,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    lineHeight: 22
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 2
  }
});

export default EventOverview;
