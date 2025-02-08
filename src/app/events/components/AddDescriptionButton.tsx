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

      {/* Modal for editing the description */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true} // Use transparent background for an overlay effect
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.input}
              multiline
              placeholder="Add a description"
              value={tempDescription}
              onChangeText={setTempDescription}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                {/* Uncomment if you want to use an icon */}
                {/* <Icons.Check width={20} height={20} /> */}
                <Text style={styles.saveButtonText}>Save</Text>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top", // Ensures the text starts at the top of the TextInput
    backgroundColor: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  saveButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default AddDescriptionButton;
