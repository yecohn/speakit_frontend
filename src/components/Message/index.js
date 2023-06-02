// src/components/Message/index.js
import { useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';
TranslatorConfiguration.setConfig(ProviderTypes.Google, 'a6f61f01b171a9768f0de0c60bede603762446eb', 'en','fr');

dayjs.extend(relativeTime);


const Message = ({ message }) => {

  const [translation, setTranslation] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  // Check if the message is from the user or the machine for style purposes
  const isMyMessage = () => {
    return message.origin === 'user';
  };

  // Split the message into words
  const words = message.text.split(' ');


  // Render a word with a touchable opacity and a modal that shows the translation when pressed
  const renderWord = (word, index) => {
    return(
      <View>
        <TouchableOpacity key={index} onPress={() => setShowTranslation(!showTranslation)}>
          <Text>{word}</Text>
        </TouchableOpacity>
        <Modal visible={showTranslation} animationType="slide">
          <View style={styles.modalContainer}>
            <PowerTranslator text={word} />
            {/* <Text>{translation}</Text> */}
          </View> 
        </Modal>
      </View>
            

    )
  };       

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
          alignSelf: isMyMessage() ? "flex-end" : "flex-start",
        },
      ]}
    >
      {words.map((word, index) => renderWord(word, index))}
      {/* <Text>{message.text}</Text> */}

      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",

		// Shadows
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  message: {},
  time: {
    alignSelf: "flex-end",
    color: "grey",
  },
  modalContainer: {
  },
});

export default Message;