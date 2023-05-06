import { View, Text, FlatList } from "react-native";
import Message from "../components/Message";
import messages from "../../assets/data/messages.json";
import Microphone from "../components/InputMic";

const ChatScreen = ({route, navigaton}) => {


  const {user_id} = route.params;

  return (
    <View>
      <Microphone />
      <FlatList
        data = {messages}
        renderItem={({ item }) => <Message message={item} user_id={user_id} />}
        style={{ padding: 10 }}
        inverted
        />
    </View>
  );
};

export default ChatScreen;