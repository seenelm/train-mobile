import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

//TODO: Improve the typing of this interface
interface HeaderProps {
  leftComponent?: ReactNode;
  middleComponent?: ReactNode;
  rightComponent?: ReactNode;
}



const Header: React.FC<HeaderProps> = ({ leftComponent, middleComponent, rightComponent }) => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={{ ...styles.safeArea, paddingBottom: -insets.bottom }}>
        <View style={styles.leftSection}>{leftComponent}</View>
        <View style={styles.middleSection}>{middleComponent}</View>
        <View style={styles.rightSection}>{rightComponent}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flex: 1,
    alignItems: "flex-start",
  },
  middleSection: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  rightSection: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Header;
