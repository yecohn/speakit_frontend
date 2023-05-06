import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
// import { Permissions } from "expo-permissions";
import { PermissionsAndroid } from "react-native";

const Microphone = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [recordingPermission, setRecordingPermission] = useState(null);

  async function requestMicrophonePermission() {
    try {
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
        console.log("Microphone permission granted");
      } else {
        console.log("Microphone permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const startRecording = async () => {
    try {
      await requestMicrophonePermission();
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const info = await FileSystem.getInfoAsync(recording.getURI());
      console.log(`File size: ${info.size}`);
      setRecording(null);
      await loadSound();
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: recording.getURI(),
      });
      setSound(sound);
      console.log("Sound loaded successfully");
    } catch (err) {
      console.error("Failed to load sound", err);
    }
  };

  const playRecording = async () => {
    try {
      if (Boolean(sound)) {
        await sound.playAsync();
        console.log("Playing sound");
      } else {
        console.error("Sound object is not loaded");
      }
    } catch (err) {
      console.error("Failed to play recording", err);
    }
  };

  return (
    <>
      {recording ? (
        <TouchableOpacity onPress={stopRecording}>
          <Text>Stop recording</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={startRecording}>
          <Text>Start recording</Text>
        </TouchableOpacity>
      )}
      {Boolean(sound) && (
        <TouchableOpacity onPress={playRecording}>
          <Text>Play recording</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Microphone;
