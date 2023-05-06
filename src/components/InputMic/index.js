import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
// import { Permissions } from "expo-permissions";
import { PermissionsAndroid } from "react-native";

const Microphone = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [sound, setSound] = useState(null);
  const [recordingPermission, setRecordingPermission] = useState(null);


  // async function requestMicrophonePermission() {
  //   try {
  //     const result = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  //       {
  //         title: "Microphone Permission",
  //         message: "This app needs access to your microphone",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );

  //     if (result === PermissionsAndroid.RESULTS.GRANTED) {

  //       console.log("Microphone permission granted");
  //     } else {
  //       console.log("Microphone permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // }

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
        setRecordingPermission(true);
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
        const {recording} = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);
        setIsRecording(true);
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
      setIsRecording(false);
      await loadSound();
      await playRecording();
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

  // const handleOnPress = async () => {
  //   if (!recordingPermission) {
  //     await requestRecordAudioPermission();
  //   }
  //   if (isRecording) {
  //     console.log('Is recording', isRecording)
  //     await stopRecording();
  //   } else {
  //     console.log('Is recording', isRecording)
  //     await startRecording();
  //   }
  // };

  return (
    <>
      {
        !recordingPermission ? (
          <TouchableOpacity onPress={requestRecordAudioPermission}>
            <Image source={require("./icon.png")} style={styles.microphone} />
          </TouchableOpacity> 
        ) : (
          isRecording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image source={require("./icon.png")} style={styles.microphone} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image source={require("./icon.png")} style={styles.microphone} />
            </TouchableOpacity>
          )
        )
      }

      {/* {recording ? (
        <TouchableOpacity onPressIn={stopRecording} onPressOut>
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
      )} */}
    </>
  );
};


const styles = StyleSheet.create({
  microphone: {
    width: 100,
    height: 100,
  },
});

export default Microphone;
