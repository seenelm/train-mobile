import React from "react";
import { View, Text, StyleSheet} from "react-native";

import ContextMenu from "react-native-context-menu-view";


const AlertContextMenu: React.FC = () => {
  return (
<ContextMenu 
        style={styles.alertContainer}
        actions={[
          { title: "At time of event" }, 
          { title: "15 minutes before" }, 
          { title: "30 minutes before" }, 
          { title: "1 hour before" }
        ]}
        
        dropdownMenuMode={true}
      >
        <Text style={styles.alertInputText}></Text>
      </ContextMenu>
  );
};



const styles = StyleSheet.create({
    // Alert styles matching EventInput
    alertWrapper: {
      marginHorizontal: 10,
      marginBottom: 10,
      alignItems: "flex-start",
    },
    alertContainer: {
      flexDirection: "row",
      height: 60, // Match the height of EventInput
      width: "70%", // Ensure full width
      marginLeft: 13,
    },
    alertContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    alertInputText: {
      flex: 1,
      fontSize: 14,
      color: "#333",
    },
    alertIcon: {
      width: 20,
      height: 20,
    },
  });

  export default AlertContextMenu;