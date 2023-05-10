import {
    View,
    Text,
    TextInput,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Linking,
  } from "react-native";

  import React, { useState, useEffect } from "react";
  import YoutubePlayer from 'react-native-youtube-iframe';

//   import { getData } from './../tools/asyncStorage';


  // topics object that includes three topics with a topic name, id, short description, and link to youtube video




  const TopicsScreen = ({ route, navigation }) => {

    const [needFetch, setNeedFetch] = useState(false);
    const [topics, setTopics] = useState([]);

    const { user_id } = route.params;

    useEffect(() => {
        async function FetchData() {
            const response = await fetch("http://localhost:8000/topics/", {
                method: "GET",
            });
            const json = await response.json();
            setTopics(json);
        }
        FetchData();
    }, [needFetch]);

    const triggerTopicChat = async (topic_id) => {
        try {
            await fetch("http://localhost:8000/topics/" + topic_id, {
                method: "GET",
            });
        } catch (error) {
            console.log(error);
        }
    };



    function thumbnail(link) {
        const video_id = link.substring(link.indexOf('=')+1);
        const thumbnail = ['http://img.youtube.com/vi/', video_id, '/hqdefault.jpg'].join('');
        // const image = require();
        return thumbnail;
    };


    // function that creates a list of images where each element requires an image from a uri given by thumbnail function

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
            <Text style={styles.container}>Topics</Text>
            <Image uri={ 'https://reactnative.dev/docs/assets/p_cat2.png'} />
            {/* <FlatList
                data={topics}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.topicItem}
                        onPress={() => {handleOnPress(item, navigation)}}>
                        <View>
                            <Text style={styles.topicText}>{item.name}</Text>
                            <Text style={styles.topicDescription}>{item.description}</Text>
                            {/* <Image style={styles.topicThumbnail} source={thumbnail(item.link)} contentFit='cover' /> 
                        </View>

                    </TouchableOpacity>
                    <View>
                        <YoutubePlayer
                            height={300}
                            play={true}
                            videoId={item.link.substring(0, item.link.indexOf('=')+1)} // '84WIaK3bl_s'
                        />
                    </View>
                )}
            /> */}
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
    topicThumbnail: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
  });
  

  export default TopicsScreen;