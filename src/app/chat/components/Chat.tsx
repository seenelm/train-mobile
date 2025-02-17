import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Icons from "../../../assets/icons";
import { ChatItem, RootStackParamList } from '../types/chatTypes';


type ChatProps = {
  chats: ChatItem[];
};

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, "ChatView">;

const Chat: React.FC<ChatProps> = ({ chats }) => {
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.chatContainer}
      onPress={() => navigation.navigate("ChatView", { chatName: item.name })} // Pass the name
    >
      <Image source={Icons.groupProfile} style={styles.profilePicture} />
      <View style={styles.chatContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={chats}
      renderItem={renderChatItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
});

export default Chat;