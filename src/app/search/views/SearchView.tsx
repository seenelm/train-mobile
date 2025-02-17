import React, { useState, useRef, useEffect } from "react";
import { TextInput, FlatList, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../components/Profile";
import Group from "../components/Group";
import searchicon from "../../../assets/icons/search.png";
import { useSearchUsers } from "../services/searchActions";
import { useIsFocused } from "@react-navigation/native";
import back from "../../../assets/icons/back.png";
import Button from "../../../components/button";
import { SearchProps } from "../types/searchProps";

interface SearchItem {
  _id: string;
  name: string;
  groupName: string;
  username: string;
  isMember: boolean;
  accountType: number;
}

const Search: React.FC<SearchProps> = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const isFocused = useIsFocused();
  const textInputRef = useRef(null);

  const { data } = useSearchUsers(search);
  console.log("Search Data: ", data);

//   useEffect(() => {
//     if (isFocused) {
//       setSearch("");
//       textInputRef.current?.focus();
//     }
//   }, [isFocused]);

  const renderItem = ({ item }: { item: SearchItem }) => {
    if (item.username) {
      return (
        <View style={searchStyles.searchContainer}>
          <Profile showForwardIcon={true} />
        </View>
      );
    } else if (
      item.groupName &&
      item.isMember === false &&
      item.accountType === 1
    ) {
      return (
        <Group/>
      );
    } else if (
      item.groupName &&
      item.isMember === false &&
      item.accountType === 2
    ) {
      return (
        <Group/>
      );
    } else {
      return (
        <Group/>
      );
    }
  };

  return (
    <SafeAreaView style={searchStyles.container}>
      <View style={searchStyles.header}>
        <Button
          style={searchStyles.iconContainer}
          imgStyle={searchStyles.back}
          imgSource={back}
          onPress={() => navigation.goBack()}
        />
        <View style={searchStyles.searchBar}>
          <Image
            source={searchicon}
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          <TextInput
            ref={textInputRef}
            placeholder="Jump to..."
            style={searchStyles.textInput}
            onChangeText={(text) => setSearch(text)}
            value={search}
            autoCorrect={false}
            spellCheck={false}
            autoFocus={true}
          />
        </View>
      </View>

      <View style={{ alignSelf: "stretch" }}>
        <FlatList
          contentContainerStyle={{ paddingLeft: 15 }}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </SafeAreaView>
  );
};

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: "white",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    height: 40,
    backgroundColor: "#F6F6F8",
  },
  searchIcon: {
    padding: 10,
  },
  textInput: {
    width: "80%",
    height: "100%",
  },
  searchContainer: {
    paddingRight: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  iconContainer: {
    width: 20,
    height: 20,
    backgroundColor: "transparent",
  },
  back: {
    width: 20,
    height: 20,
    marginLeft: 5,
    marginTop: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Search;