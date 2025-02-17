import React, { useState } from "react";
import { TouchableOpacity, Text, Platform, View, StyleSheet, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateTimePickerButtonProps {
  value: Date;
  mode: "date" | "time";
  onChange: (event: any, selectedDate?: Date) => void;
  displayText: string;
  buttonStyle?: object;
  textStyle?: object;
}

const DateTimePickerButton: React.FC<DateTimePickerButtonProps> = ({ value, mode, onChange, displayText, buttonStyle, textStyle }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => setShowPicker(true)}
      >
        <Text style={[styles.buttonText, textStyle]}>{displayText}</Text>
      </TouchableOpacity>
      {showPicker && (
        <Modal transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={value}
                mode={mode}
                display={Platform.OS === "ios" ? (mode === "date" ? "inline" : "spinner") : "default"}
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  onChange(event, selectedDate);
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  button: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold"
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DateTimePickerButton;