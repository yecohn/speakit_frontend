import ChatListItem from "../components/ChatListItem";
import { FlatList } from "react-native";
import { StyleSheet, Pressable } from "react-native";
import chats from "../../assets/data/chats.json";
// "assets/data/chats.json";


const ChatsScreen = ({navigation}) => {

  return (
      <>
        <FlatList data={chats} renderItem={({ item }) => (
            <Pressable 
              onPress={() => navigation.navigate("Chat", {
                user_id: item.user.id
              })}
              style={styles.container}
            >
              <ChatListItem chat={item} />
            </Pressable>
        )} 
        />
      </>
  );  
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 0,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  content: {
    flex: 1,
    // backgroundColor: "red",
    borderBottomColor: "red",
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
});

export default ChatsScreen;