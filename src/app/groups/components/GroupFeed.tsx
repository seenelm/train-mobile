import React from "react";
import { View, Text, StyleSheet } from "react-native";

function GroupFeed() {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GroupFeed;