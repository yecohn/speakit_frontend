import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Image, StyleSheet, View, Dimensions } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
// import { Permissions } from "expo-permissions";
import { PermissionsAndroid } from "react-native";

const { width, height } = Dimensions.get('window');
const buttonSize = Math.min(width, height) * 0.12;

const Microphone = () => {
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);

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
  }

  
  

  const startRecording = async () => {
      try {
        await requestRecordAudioPermission();
        const {recording} = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
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
      setRecording(undefined);


      await loadSound();
      if (Boolean(sound)) {
        await uploadRecording();
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const uploadRecording = async () => {
    const data = new FormData();
    data.append("audio_input", {recording});
    const res = await fetch(
      "http://localhost:8000/upload",
      {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      }
    );
    const resJson = await res.json();
    if (resJson.status === "success") {
      console.log("Upload successful");
    } else {
      console.log("Upload failed");
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
      {<TouchableOpacity 
          onPressIn={recording ? undefined : startRecording}
          onPressOut={recording ? stopRecording : undefined}
          style={styles.microphoneButton}> 
          <Image source={require("./icon.png")} style={styles.microphoneIcon} />
        </TouchableOpacity>}
      {Boolean(sound) && <TouchableOpacity onPress={playRecording}>
              <Text>Play recording</Text>
            </TouchableOpacity>}
    </>
  );
};


const styles = StyleSheet.create({
  microphoneButton: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: height * 0.05,
    alignSelf: 'center',
    zIndex: 1,
  },
  microphoneIcon: {
    width: buttonSize * 0.5,
    height: buttonSize * 0.5,
    resizeMode: 'contain',
  },
});

export default Microphone;
