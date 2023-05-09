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
    return (
      <View style={styles.container}>
        <Text>Lecture Screen</Text>
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