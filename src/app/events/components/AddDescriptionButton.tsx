import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import { useEvent } from "../context/EventContext";
import * as Icons from "../../../assets/icons";

const AddDescriptionButton: React.FC = () => {
  const { event, setEvent } = useEvent();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempDescription, setTempDescription] = useState(event.description);

  const handleSave = () => {
    setEvent((prev) => ({ ...prev, description: tempDescription }));
    setIsModalVisible(false);
  };

  // Optionally, a cancel handler to dismiss the modal without saving changes
  const handleCancel = () => {
    setTempDescription(event.description); // Reset to the current event description
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* The button that opens the modal */}
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.button}
      >
        {event.description ? (
          <Text style={styles.descriptionText}>{event.description}</Text>
        ) : (
          <View style={styles.placeholderContainer}>
            {/* Uncomment and use your icon if needed */}
            {/* <Icons.Edit width={18} height={18} style={styles.icon} /> */}
            <Text style={styles.placeholderText}>Add Description</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent={true}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add Description</Text>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Add description for your event"
              value={tempDescription}
              onChangeText={setTempDescription}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>add description</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  placeholderContainer: {
    flexDirection: "row",
    alignItems: "center",
    // gap isn't supported on all React Native versions, so you might want to use margin:
    // gap: 8,
  },
  icon: {
    tintColor: "#666",
    marginRight: 8,
  },
  placeholderText: {
    color: "#666",
  },
  descriptionText: {
    color: "#000",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalContainer: {
    marginTop: "20%",
    backgroundColor: "white",
    width: "90%",
    height: "50%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    height: "70%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top", 
    backgroundColor: "#F4F3F3",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    padding: 18,
    width: "30%",
    borderRadius: 30,
    borderColor: "#ddd",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  saveButton: {
    padding: 18,
    width: "60%",
    borderRadius: 30,
    backgroundColor: "#000000",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default AddDescriptionButton;
