import {
  Text,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";




const LectureScreen = ({ route, navigaton }) => {
  const [lesson, setLesson] = useState("");
  const { user_id } = route.params;
  const isFocused = useIsFocused();

  // useEffect function that fetch a lesson endpoint on the server
  useEffect(() => {
    
    if(isFocused) {

      async function FetchData() {
        const response = await fetch("http://35.236.62.168/chat/" + user_id + "/lesson", {
          method: "GET",
        });
        const json = await response.json();
        console.log(json.lesson);
        setLesson(json.lesson);
      }
      FetchData();
    }
  }, []);


  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Here is your lesson in your target language!</Text>
      <ScrollView>
        <Text style={styles.result}>{lesson}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 10,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
  },
  result: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    color: '#666666',
  },
});

export default LectureScreen;
