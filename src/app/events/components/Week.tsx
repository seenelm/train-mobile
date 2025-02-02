import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import EventUtil from "../utils/eventUtil";
import { WeekProps } from "../types/eventTypes";

const Week: React.FC<WeekProps> = React.memo(({ week, selectedDate, onSelectDate }) => (
    <View style={styles.weekContainer}>
      {week.map((date, index) => {
        const isFirstDayOfMonth = date.getDate() === 1;
        const monthAbbreviation = isFirstDayOfMonth
          ? date.toLocaleDateString("default", { month: "short" })
          : "";
  
        const dateColor = date.getMonth() === selectedDate.getMonth() ? "black" : "grey";
        return (
          <TouchableOpacity
            key={index}
            style={styles.cell}
            onPress={() => onSelectDate(date)}
          >
            {isFirstDayOfMonth && (
              <Text style={styles.monthAbbreviationText}>
                {monthAbbreviation}
              </Text>
            )}
            <Text
              style={[
                styles.dateText,
                { color: dateColor },
                EventUtil.normalizeDate(date).getTime() === EventUtil.normalizeDate(selectedDate).getTime() && styles.selectedDate,
              ]}
            >
              {date.getDate()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
));

  const styles = StyleSheet.create({
    weekContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cell: {
        flex: 1,
        alignItems: "center",
        height: 40,
    },
    monthAbbreviationText: {
        fontSize: 10,
        color: "black",
        height: 10,
        marginTop: -10,
    },
    dateText: {
        fontSize: 16,
        color: "black",
        height: 25,
    },
    selectedDate: {
        color: "red",
        fontWeight: "bold",
    },
});

export default Week;
