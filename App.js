import { StyleSheet, View } from "react-native";
import ChatsScreen from "./src/screens/ChatsScreen";
import ChatScreen from "./src/screens/ChatScreen";
import Signin from "./src/screens/SignIn";
import Register from "./src/screens/Register";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import CustomDrawerContent from "./src/components/DrawerMenu/drawer";



export default function App() {
  // const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Sign In"
          drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen
            name="Signin"
            component={Signin}
            options={{ title: "Sign in" }}
          />
          <Drawer.Screen
            name="Register"
            component={Register}
            options={{ title: "Register" }}
          />
          <Drawer.Screen
            name="Chats"
            component={ChatsScreen}
          />
          <Drawer.Screen
            name="Chat"
            component={ChatScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    paddingVertical: 50,
  },
});
