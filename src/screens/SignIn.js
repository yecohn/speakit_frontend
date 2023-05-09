import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { storeData } from "../tools/asyncStorage";
// import { AuthSession } from 'expo';
// import * as Google from 'expo-google-app-auth';

// const CLIENT_ID = 'your-google-client-id';

const SignIn = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSignIn = async () => {
    try {
      console.log("start fetching");
      form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: form,
      });
      const json = await response.json();

      console.log("finish fetch");

      if (response.status == 200) {
        const userId = json.user_id;
        console.log("start navigation");
        navigation.navigate("Chat", {
          user_id: userId,
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <>
      <View style={styles.container}>
        <Input
          placeholder="username"
          onChangeText={setUserName}
          value={username}
        />
        <Input
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button title="Sign In" onPress={handleSignIn} />
        <Text>
          need to register first ?
          <Button title="Register" onPress={handleRegister} />
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignIn;
