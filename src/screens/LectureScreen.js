import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";

const LectureScreen = ({ route, navigaton }) => {
  const [lesson, setLesson] = useState("");

  // useEffect function that fetch a lesson endpoint on the server
  useEffect(() => {
    async function FetchData() {
      const response = await fetch("http://35.236.62.168/lesson/", {
        method: "GET",
      });
      const json = await response.json();
      console.log(JSON.stringify(json));
      setLesson(json);
    }
    FetchData();
  }, []);

  return (
    <View>
      <Text style={styles.container}>Lesson</Text>
      <Text>{lesson}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LectureScreen;
