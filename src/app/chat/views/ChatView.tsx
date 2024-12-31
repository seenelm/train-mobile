import React from "react";
import { View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatView: React.FC<{}> = () => {
  return (
    <SafeAreaView>
    <View
    >
      <Text>
        ChatView
      </Text>
      <TextInput 
        placeholder="Enter your email"
      />
    </View>
    </SafeAreaView>
  );
};

export default ChatView;
