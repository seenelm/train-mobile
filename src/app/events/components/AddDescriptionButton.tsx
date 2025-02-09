import React, { useState } from "react";
import { TouchableOpacity, Text, Platform, View, StyleSheet, Modal, TextInput } from "react-native";
import { AddDescriptionButtonProps } from "../types/eventTypes";
import { useEventContext } from "../context/EventProvider";

const AddDescriptionButton: React.FC<AddDescriptionButtonProps> = (props: AddDescriptionButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View>
        <TouchableOpacity style={[styles.button, props.style]} onPress={handleOpenModal}>
            {props.children && (
            <Text style={[styles.buttonText, props.textStyle]}>{props.children}</Text>
        )}
        </TouchableOpacity>
        
        <Modal
            visible={showModal}
            transparent={true}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Description</Text>
                    <TouchableOpacity onPress={handleCloseModal}>
                        <Text>Add</Text>
                    </TouchableOpacity>
                    <TextInput 
                        onChangeText={setDescription}
                        value={description}
                        placeholder="Enter description"
                        multiline={true}
                        style={styles.textInput}
                    />
                </View>
            </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: "black",
      paddingVertical: 10,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      alignSelf: "center",
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        height: 100,
    }

  });

export default AddDescriptionButton;