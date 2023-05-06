import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [level, setLevel] = useState("");

  const handleRegister = async () => {
    try {
      console.log("start fetching");
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, level, email }),
      });
      console.log("finish fetch");
      // const responsejson = await response.json();
      console.log(JSON.stringify(response));
      // console.log("start jsonify");

      if (response.status == 200) {
        console.log("start navigation");
        navigation.navigate("Signin");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Input placeholder="Name" onChangeText={setUserName} value={username} />
        <Input placeholder="Email" onChangeText={setEmail} value={email} />
        <Input placeholder="Level" onChangeText={setLevel} value={level} />
        <Input
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button
          title="Register"
          onPress={handleRegister}
          style={styles.register}
        />
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

  register: {
    flex: 1,
    direction: "column",
    alignItems: "bottom",
    justifyContent: "center",
  },
});

export default Register;
