import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Message from "../components/Message";
// import messages from "../../assets/data/messages.json";
import Microphone from "../components/InputMic";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = ({ route, navigaton }) => {
  const [messages, setMessages] = useState([]);
  const { user_id } = route.params;
  const [needFetch, setNeedFetch] = useState(false);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    async function FetchData() {
      const response = await fetch("http://localhost:8000/chat/" + user_id, {
        method: "GET",
      });
      const json = await response.json();
      setMessages(json.messages);
      console.log("fetch data");
    }
    FetchData();
  }, [needFetch]);

  async function PostMessage(newmessage) {
    await fetch("http://localhost:8000/chat/" + user_id + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newmessage,
    });
  }

  const handleSend = async () => {
    if (inputText) {
      const newMessage = {
        user: { id: user_id, username: "Me" },
        message: inputText,
        createdAt: Date.now(),
      };
      console.log(inputText);
      const json = JSON.stringify(newMessage);
      await PostMessage(json);
      // send message form to server
      setInputText("");
      setNeedFetch(!needFetch);
      console.log("need fetch" + needFetch);
    } else {
      console.log("empty message");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Message message={item} user_id={user_id} />}
        style={styles.chat}
        inverted
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          defaultValue={inputText}
          onChangeText={(newText) => setInputText(newText)}
        />

        <Microphone />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          onChangeText={setInputText}
        >
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
    flexDirection:'column-reverse',
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
