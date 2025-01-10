import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface HeaderProps {
  leftComponent?: ReactNode;
  middleComponent?: ReactNode;
  rightComponent?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ leftComponent, middleComponent, rightComponent }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>{leftComponent}</View>
      <View style={styles.middleSection}>{middleComponent}</View>
      <View style={styles.rightSection}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    height: 60,
    position: "relative",
    backgroundColor: "white",
  },
  leftSection: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 1,
  },
  middleSection: {
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0,
  },
  rightSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1,
  },
});

export default Header;
