import { View, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from 'react';
import Message from "../components/Message";
import messages from "../../assets/data/messages.json";
import Microphone from "../components/InputMic";
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';


const ChatScreen = ({route, navigaton}) => {
  
  const {user_id} = route.params;
  const [inputText, setInputText] = useState('');


  const MultiLineTextInput = () => {

  
    return (
      <TextInput
          style={styles.input}
          placeholder="Type a message"
          defaultValue={inputText}
          onChangeText={newText => setInputText(newText)}
    />
    );
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: String(Math.random()),
        text: inputText.trim(),
        sender: 'me',
      };
      // send message form to server
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data = {messages}
        renderItem={({ item }) => <Message message={item} user_id={user_id} />}
        style={styles.chat}
        inverted
        contentContainerStyle = {styles.messagesContainer}
        />
      <View style={styles.inputContainer}>
        <MultiLineTextInput />
        <Microphone />
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
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  // messageContainer: {
  //   maxWidth: '80%',
  //   borderRadius: 8,
  //   paddingHorizontal: 12,
  //   paddingVertical: 8,
  //   marginVertical: 4,
  // },
  // myMessageContainer: {
  //   backgroundColor: '#DCF8C5',
  //   alignSelf: 'flex-end',
  // },
  // theirMessageContainer: {
  //   backgroundColor: '#EAEAEA',
  //   alignSelf: 'flex-start',
  // },
  // messageText: {
  //   fontSize: 16,
  // },
  // myMessageText: {
  //   color: 'black',
  // },
  // theirMessageText: {
  //   color: 'black',
  // },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: 'green',
    borderRadius: 999,
    padding: 8,
    marginHorizontal: 8,
  },
});

export default ChatScreen;