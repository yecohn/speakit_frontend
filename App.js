// Screens import for navigation
import ChatScreen from "./src/screens/ChatScreen";
import SignIn from "./src/screens/SignIn";
import Register from "./src/screens/Register";
import LectureScreen from "./src/screens/LectureScreen";
import TopicsScreen from "./src/screens/TopicsScreen";

import { StyleSheet, View } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import CustomDrawerContent from "./src/components/DrawerMenu/drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function AuthStack() {

  return(
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>

  );
};

function DrawerStack () {
  return(
    <Drawer.Navigator
      initialRouteName="Chat"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Chat" component={ChatScreen} />
      <Drawer.Screen name="Lecture" component={LectureScreen} />
      <Drawer.Screen name="Topics" component={TopicsScreen} />
    </Drawer.Navigator>  
  );
};


export default function App() {

  return (
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="AuthStack" component={AuthStack} options= {{headerShown: false}} />
        <Stack.Screen name="DrawerStack" component={DrawerStack} options= {{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
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
