import { Text, View, Image, StyleSheet, Pressable } from "react-native";
// import { image } from "./prince.jpeg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const ChatListItem = ({chat}) => {
  return (
    
      // <View style={styles.container}>
      //   <Text>{chat.user.name}</Text>
      //   <View style={styles.row}>
      //     <Text>{chat.lastMessage.text}</Text>
      //     <Text style={styles.subTitle}>
      //       {dayjs(chat.lastMessage.createdAt).fromNow(true)}
      //   </Text>
      //   </View>
        
        
        
        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name} numberOfLines={1}>
              {chat.user.name}
            </Text>
            <Text style={styles.subTitle}>
              {dayjs(chat.lastMessage.createdAt).fromNow(true)}
            </Text>
          </View>
          <Text style={styles.subTitle}>
            <Text>{chat.lastMessage.text}</Text>
          </Text>
        </View>
      // </View>
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

export default ChatListItem;
