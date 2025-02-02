import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { EventResponse } from '../models/eventModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from "../../../assets/icons";


const EventOverview: React.FC = () => {
  const route = useRoute();
  const { event } = route.params as { event: EventResponse };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.date}>{formatDate(event.startTime)}</Text>
      </View>

      {/* Details Card */}
      <View style={styles.card}>
        <View style={styles.detailItem}>
          <Image source={Icons.time} style={styles.icon} />
          <Text style={styles.detailText}>
            {new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
            {new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>

        <View style={styles.detailItem}>
        <Image source={Icons.location} style={styles.icon} />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About the Event</Text>
        <Text style={styles.description}>{event.description}</Text>
      </View>

      {/* People Section */}
      <View style={styles.peopleContainer}>
        <View style={styles.peopleSection}>
          <Text style={styles.sectionTitle}>Organizers</Text>
          {event.admin.map((adminName, index) => (
            <View key={index} style={styles.personItem}>
              {/* <MaterialIcons name="person" size={18} color="#444" /> */}
              <Text style={styles.personText}>{adminName}</Text>
            </View>
          ))}
        </View>

        <View style={styles.peopleSection}>
          <Text style={styles.sectionTitle}>Invitees ({event.invitees.length})</Text>
          {event.invitees.map((invitee, index) => (
            <View key={index} style={styles.personItem}>
              {/* <MaterialIcons name="person-outline" size={18} color="#444" /> */}
              <Text style={styles.personText}>{invitee}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  icon: {
    width: 20,
    height: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#444',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  peopleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  peopleSection: {
    width: '48%',
  },
  personItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
    padding: 12,
    borderRadius: 8,
  },
  personText: {
    marginLeft: 12,
    color: '#444',
  },
});

export default EventOverview;