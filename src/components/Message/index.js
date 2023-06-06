// src/components/Message/index.js
import { useState } from 'react';

import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal 
} from "react-native";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { set } from 'react-native-reanimated';

// import { 
//   PowerTranslator, 
//   ProviderTypes, 
//   TranslatorConfiguration, 
//   TranslatorFactory 
// } from 'react-native-power-translator';

// TranslatorConfiguration.setConfig(ProviderTypes.Google, 'a6f61f01b171a9768f0de0c60bede603762446eb', 'he','en');

dayjs.extend(relativeTime);

const Message = ({ message }) => {

  const [selectedWord, setSelectedWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  const isMyMessage = () => {
    return message.origin === "user";
  };

  // Split the message into words
  const words = message.text.split(' ');


  const fetchTranslation = async (word) => {
    try {
      const response = await fetch("http://");
      const json = await response.json();
      setTranslation(json.translation);
    } catch (error) {
      console.error('Error fetching translation:', error);
    }
  };

  // Render a word with a touchable opacity and a modal that shows the translation when pressed
  const renderWord = (word, index) => {
    return(
      <View key={index} style={styles.word}>
        <TouchableOpacity onPress={() => {
          setShowTranslation(true)
          fetchTranslation(word)
          }}>
          <Text>{word}</Text>
        </TouchableOpacity>
      </View>
            

    )
  };       

  return (
    <View
      style={[
        styles.messageContainer,
        {
          backgroundColor: isMyMessage() ? "#DCF8C5" : "white",
          alignSelf: isMyMessage() ? "flex-end" : "flex-start",
        },
      ]}>

        <View style={styles.textContainer}>
          {words.map((word, index) => renderWord(word, index))}
        </View>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
      
      <Modal 
      visible={showTranslation} 
      animationType="slide"
      >
        <TouchableOpacity 
          onPress={() => setShowTranslation(false)}
          style={styles.closeButton}
          >
          <View style={styles.modalContainer}>

            <Text>Close</Text>
            {/* <PowerTranslator text={selectedWord} /> */}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "70%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  textContainer: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    direction: 'rtl',
  },
  word: {
    marginRight: 5,
    // writingDirection: 'rtl',
  },
  modalContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  time: {
    alignSelf: "flex-end",
    color: "grey",
  },
});

export default Message;
