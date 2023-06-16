import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { storeData } from "../tools/asyncStorage";

const SignIn = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSignIn = async () => {
    try { 
      console.log("Signing in");
      form = new FormData();
      form.append("username", username);
      form.append("password", password);

      const response = await fetch("http://35.236.62.168/login", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: form,
      });
      const json = await response.json();

      if (response.status == 200) {
        console.log('Signed in user #' + json.user_id + ' with chat id #' + json.chatId);
        storeData("user_id", json.user_id);
        storeData('chatId', json.chatId)
        navigation.navigate("DrawerStack", {
          screen: "Chat",
          params: {
            user_id: json.chatId,
            // chat_id: chatId,
          },
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
        <Text>need to register first ?</Text>
        <Button title="Register" onPress={handleRegister} />
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
