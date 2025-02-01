import React, { useState } from "react";
import { Button, Platform, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DateTimePickerButtonProps {
  value: Date;
  mode: "date" | "time";
  onChange: (event: any, selectedDate?: Date) => void;
  displayText: string;
}

const DateTimePickerButton: React.FC<DateTimePickerButtonProps> = ({ value, mode, onChange, displayText }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <Button
        title={displayText}
        onPress={() => setShowPicker((prev) => !prev)}
        color="#007BFF"
      />
      {showPicker && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === "ios" ? (mode === "date" ? "inline" : "spinner") : "default"}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            onChange(event, selectedDate);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});

export default DateTimePickerButton;
