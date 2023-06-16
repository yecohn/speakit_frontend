import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { PermissionsAndroid } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Microphone = ({ user_id, onChange }) => {

  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(new Audio.Sound());
  const [answerURI, setAnswerURI] = useState(null);

  async function requestRecordAudioPermission() {
    try {
      await Audio.requestPermissionsAsync();
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: "Microphone Permission",
          message: "This app needs access to your microphone",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Record Audio permission granted");
        return true;
      } else {
        console.log("Record Audio permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const startRecording = async () => {
    try {  
      await requestRecordAudioPermission();
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const info = await FileSystem.getInfoAsync(uri);
      console.log(`File size: ${info.size}, file uri: ${uri}`);
      setRecording(undefined);
      
      await uploadRecording(uri);
      onChange();
      await downloadRecording();
      // await loadSound();
      // await playSound();
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const uploadRecording = async (uri) => {

    const formData = new FormData();
    const filetype = uri.split('.').pop();
    const filename = uri.split('/').pop();
    formData.append('audio_data', {
      uri,
      type: `audio/${filetype}`,
      name: filename,
    });
    try {

      const res = await fetch("http://35.236.62.168/chat/" + user_id + "/microphone", {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      onChange();
    } catch (err) {
      console.error("Failed to upload recording", err);
    }
    
  };

  const downloadRecording = async () => {
    try {
      const res = await fetch("http://35.236.62.168/chat/" + user_id + "/microphone/download", {
        method: "GET",
      });
      console.log(await res);
      // setAnswerURI(res.url);
    } catch (err) {
      console.error("Failed to download recording", err);
    }
  };



  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: answerURI,
      });
      setSound(sound);
      console.log("Sound loaded successfully");
    } catch (err) {
      console.error("Failed to load sound", err);
    }
  };

  const playSound = async () => {
    try {
      if (Boolean(sound)) {
        await sound.playAsync();
        console.log("Playing sound");
        setSound(null);
      } else {
        console.error("Sound object is not loaded correctly");
      }
    } catch (err) {
      console.error("Failed to play sound", err);
    }
  };

  return (
    <>
      {
        <TouchableOpacity
          onPressIn={recording ? undefined : startRecording}
          onPressOut={recording ? stopRecording : undefined}
          style={styles.microphoneButton}
        >
          <Ionicons name="mic-outline" size={24} color="gray" />
        </TouchableOpacity>
      }
      {/* {Boolean(sound) && (
        <TouchableOpacity onPress={playRecording}>
          <Text>Play recording</Text>
        </TouchableOpacity>
      )} */}
    </>
  );
};

const { width, height } = Dimensions.get("window");
const buttonSize = Math.min(width, height) * 0.12;

const styles = StyleSheet.create({
  microphoneButton: {
    paddingHorizontal: 8,
  },
});

export default Microphone;
