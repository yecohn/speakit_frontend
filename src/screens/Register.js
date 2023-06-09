import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [level, setLevel] = useState("Beginner");

  const [nativeLanguage, setNativeLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("French");

  const handleRegister = async () => {
    try {
      console.log("Registering new user...");
      // console.log({ username, email, password, nativeLanguage, targetLanguage, level});
      const response = await fetch("http://35.236.62.168/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          level,
          email,
          targetLanguage,
          targetLanguage,
        }),
      });

      if (response.status == 200) {
        console.log("Finished registering new user");
        navigation.navigate("SignIn");
      } else {
        throw new Error("Could not redirect to Sign In page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Register to SpeakIt!</Text>
          <Input
            placeholder="Username"
            onChangeText={(input) => setUserName(input)}
            value={username}
          />
          <Input
            placeholder="Email"
            onChangeText={(input) => setEmail(input)}
            value={email}
          />
          <Input
            placeholder="Password"
            onChangeText={(input) => setPassword(input)}
            value={password}
            secureTextEntry
          />
          <Text>What is your native language?</Text>
          <Picker
            // style={styles.picker}
            selectedValue={nativeLanguage}
            mode={"dropdown"}
            onValueChange={(language, itemIndex) => setNativeLanguage(language)}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="Hebrew" value="Hebrew" />
          </Picker>
          <Text>What language do you want to learn?</Text>
          <Picker
            // style={styles.picker}
            selectedValue={targetLanguage}
            onValueChange={(language, itemIndex) => setTargetLanguage(language)}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="French" value="French" />
            <Picker.Item label="Spanish" value="Spanish" />
            <Picker.Item label="Hebrew" value="Hebrew" />
          </Picker>
          <Text>What do you think is your current level?</Text>
          <Picker
            // style={styles.picker}
            selectedValue={level}
            enabled={false}
            onValueChange={(level, itemIndex) => setLevel(level)}
          >
            <Picker.Item label="Beginner" value="Beginner" />
          </Picker>
          <Button
            title="Register"
            onPress={handleRegister}
            style={styles.register}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Register;
