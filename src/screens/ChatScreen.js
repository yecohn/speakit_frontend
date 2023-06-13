// ChatScreen.js

// Packages import
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

// Component import
import Message from "../components/Message";
import Microphone from "../components/InputMic";
import { set } from "react-native-reanimated";

const ChatScreen = ({ route, navigaton }) => {
  const { user_id } = route.params;
  const first_message = {
    user: { id: user_id, username: "Me" },
    origin: "user",
    text: "Message pour meubler quand il n y a pas encore de chat",
    createdAt: Date.now(),
  };
  const [messages, setMessages] = useState([]);
  const [cache, setCache] = useState(false);
  const [cacheInputText, setCacheInputText] = useState("");
  const [needFetch, setNeedFetch] = useState(false);
  const [inputText, setInputText] = useState("");
  const isFocused = useIsFocused();

  useEffect(() => {

    if(isFocused) {

      async function FetchData() {
        const response = await fetch("http://35.236.62.168/chat/" + user_id, {
          method: "GET",
        });

        const json = await response.json();
        setMessages(json.messages);
      }
      setCache(false);

      FetchData();     

    }
  }, [needFetch, isFocused]);

  async function PostMessage(newmessage) {
    await fetch("http://35.236.62.168/chat/" + user_id + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newmessage,
    });
  }

  const handleInputText = (newText) => {
    setInputText(newText);
  };

  const handleSend = async () => {
    if (!inputText) return;
    const newMessage = {
      user: { id: user_id, username: "Me" },
      origin: "user",
      text: inputText,
      createdAt: Date.now(),
    };
    setCacheInputText(inputText);
    setInputText("");
    setCache(true);

    const json = JSON.stringify(newMessage);
    await PostMessage(json);
    setNeedFetch(!needFetch);
  };

  const cacheMessage = () => {
    const cacheMessage = {
      user: { id: user_id, username: "Me" },
      origin: "user",
      text: cacheInputText,
      createdAt: Date.now(),
    };
    return (
      <View style={styles.messagesContainer}>
        <Message message={cacheMessage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => (item.origin!='system') && <Message message={item} />}
        style={styles.chat}
        inverted
        contentContainerStyle={styles.messagesContainer}
      />
      {cache ? cacheMessage() : null}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          defaultValue={inputText}
          // onChangeText={(newText) => setInputText(newText)}
          onChangeText={(newText) => handleInputText(newText)}
        />

        <Microphone user_id={user_id} />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Constants.statusBarHeight,
  },
  messagesContainer: {
    flexDirection: "column-reverse",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgray",
    padding: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "gray",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "green",
    borderRadius: 999,
    padding: 8,
    marginHorizontal: 8,
  },
  // chat: {
  //   flex: 1,
  //   flexDirection: "row-reverse",
  // },
});

export default ChatScreen;
