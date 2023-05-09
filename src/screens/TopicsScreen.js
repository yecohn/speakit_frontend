import {
    View,
    Text,
    TextInput,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Linking,
  } from "react-native";
  import React, { useState, useEffect } from "react";
//   import { getData } from './../tools/asyncStorage';


  // topics object that includes three topics with a topic name, id, short description, and link to youtube video




  const TopicsScreen = ({ route, navigation }) => {

    // const topics = [ 
    //     {
    //         id: 1,
    //         name: "Topic 1",
    //         description: "This is the first topic",
    //         video: "https://www.youtube.com/watch?v=0pThnRneDjw",
    //         transcript: "This is the transcript for the first topic",
    //     },
    //     {
    //         id: 2,
    //         name: "Topic 2",
    //         description: "This is the second topic",
    //         video: "https://www.youtube.com/watch?v=0pThnRneDjw",
    //         transcript: "This is the transcript for the second topic",
    //     },
    //     {
    //         id: 3,
    //         name: "Topic 3",
    //         description: "This is the third topic",
    //         video: "https://www.youtube.com/watch?v=0pThnRneDjw",
    //         transcript: "This is the transcript for the third topic",
    //     },
    // ];
    const [needFetch, setNeedFetch] = useState(false);
    const [topics, setTopics] = useState([]);

    const { user_id } = route.params;

    useEffect(() => {
        async function FetchData() {
            const response = await fetch("http://localhost:8000/topics/", {
                method: "GET",
            });
            const json = await response.json();
            console.log(JSON.stringify(json));
            setTopics(json);
        }
        FetchData();
    }, [needFetch]);

    // component triggerTopicChat tells the server with address to specific topic to make an action with some api call
    const triggerTopicChat = async (topic_id) => {
        try {
            await fetch("http://localhost:8000/topics/" + topic_id, {
                method: "GET",
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnPress = async (item, navigation) => {
        Linking.openURL(item.link);
        await triggerTopicChat(item.topic_id);
        navigation.navigate("Chat", {
            user_id: user_id,
        });
        setNeedFetch(!needFetch);
    };

    return (
        <View>
            <FlatList
                data={topics}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.topicItem}
                        onPress={() => {handleOnPress(item, navigation)}}>

                        <Text style={styles.topicText}>{item.name}</Text>
                        <Text style={styles.topicDescription}>{item.description}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
            
    );

  };

  const styles = StyleSheet.create({
    // styles for a topics flatlist item, where all items are touchable opacity
    // each item has a topic name that is bigger, just below a short description, and below a link to a youtube video

    topicItem: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    topicText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    topicDescription: {
        fontSize: 15,
        textAlign: "center",
    },
    topicVideo: {
        fontSize: 10,
        textAlign: "center",
    },
  });
  

  export default TopicsScreen;