import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icons from "../../../assets/icons";
import Button from '../../../components/button';
import { UserEventResponse } from '../models/eventModel';
import EditEventForm from '../components/EditEventForm';

const EventOverview: React.FC = () => {
  const route = useRoute();
  const [eventStatus, setEventStatus] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const { userEventResponse } = route.params as { userEventResponse: UserEventResponse };
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    handleEventStatus();
  }, []);

  const handleEventStatus = () => {
    if (userEventResponse.status === 1) {
      setEventStatus("Maybe");
    } else if (userEventResponse.status === 2) {
      setEventStatus("Accepted");
    } else {
      setEventStatus("Rejected");
    }
  };

  const handleOptionSelect = (option: string) => {
    console.log(`User selected: ${option}`);
    // Additional logic to update event status can be added here.
    setModalVisible(false);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLocationPress = () => {
    if (!userEventResponse.event.location || userEventResponse.event.location.length === 0) {
      console.log("Location doesn't exist");
      return;
    }
    const address = encodeURIComponent(userEventResponse.event.location);
    const url = Platform.OS === 'ios'
      ? `maps://?q=${address}`
      : `geo:0,0?q=${address}`;
    
    Linking.openURL(url).catch(err =>
      console.error("Failed to open map", err)
    );
  };

  const handleEditPress = () => {
    console.log('Edit button pressed');
    setIsEditing(true);
  };

  const handleSaveEdit = (updatedEvent: any) => {
    console.log("Updated event: ", updatedEvent);
    // Here you could update your state or call your backend API to update the event.
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditEventForm
        userEventResponse={userEventResponse}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Edit Button on the top right corner */}
      <Button
        style={styles.editButton}
        imgSource={Icons.editing}
        imgStyle={styles.editIcon}
        onPress={handleEditPress}
      />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Drag Handle */}
        <View style={styles.dragHandle}></View>

        {/* Event Type */}
        <View style={styles.eventType}>
          <Text style={styles.eventTypeText}>Work</Text>
        </View>

        {/* Event Name */}
        <Text style={styles.eventName}>{userEventResponse.event.name}</Text>

        {/* User Profiles */}
        <View style={styles.usersContainer}>
          {userEventResponse.event.admin.concat(userEventResponse.event.invitees).map((_, index) => (
            <Image
              key={index}
              source={Icons.groupProfile}
              style={styles.profileImage}
            />
          ))}
        </View>

        {/* Description */}
        <Text style={styles.eventDescription}>
          {userEventResponse.event.description}
        </Text>

        {/* Date Box with Icon */}
        <View style={styles.infoBox}>
          <View style={styles.iconRow}>
            <Image source={Icons.time} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {formatDate(userEventResponse.event.startTime)}
            </Text>
          </View>
        </View>

        {/* Location Box with Icon */}
        <TouchableOpacity style={styles.infoBox} onPress={handleLocationPress}>
          <View style={styles.iconRow}>
            <Image source={Icons.location} style={styles.infoIcon} />
            <Text style={styles.infoText}>
              {userEventResponse.event.location}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Status Button */}
        <Button
          textStyle={styles.statusText}
          style={styles.statusButton}
          onPress={() => setModalVisible(true)}
        >
          {eventStatus}
        </Button>
      </ScrollView>

      {/* Modal for selecting status */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Status</Text>
            <TouchableOpacity
              style={[styles.modalButton, styles.acceptButton]}
              onPress={() => handleOptionSelect('Accept')}
            >
              <Text style={styles.modalButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.maybeButton]}
              onPress={() => handleOptionSelect('Maybe')}
            >
              <Text style={styles.modalButtonText}>Maybe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.declineButton]}
              onPress={() => handleOptionSelect('Decline')}
            >
              <Text style={styles.modalButtonText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'transparent',
    padding: 8,
    borderRadius: 4,
  },
  editIcon: {
    width: 28,
    height: 28,
  },
  dragHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginVertical: 15,
    marginTop: 0,
  },
  eventType: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignSelf: 'center',
  },
  eventTypeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  eventName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  eventDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    alignSelf: 'flex-start',
    lineHeight: 22,
  },
  usersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 4,
  },
  infoBox: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 18,
    marginVertical: 10,
    width: '100%',
    elevation: 3,
    alignItems: 'flex-start',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    flexShrink: 1,
  },
  statusButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 30,
  },
  statusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: '600',
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: 'green',
  },
  maybeButton: {
    backgroundColor: 'goldenrod',
  },
  declineButton: {
    backgroundColor: 'red',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  modalCancelText: {
    marginTop: 12,
    color: 'red',
    fontSize: 16,
  },
});

export default EventOverview;
