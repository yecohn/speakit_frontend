import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData } from '../../tools/asyncStorage';


const CustomDrawerContent = (props) => {
    const { navigation } = props;
    [user__id, setUser__id] = useState(null);
    
    // write use effect hook to retrieve user_id from async storage
    useEffect(() => {
        async function FetchUserId() {
            const user_id = await getData('user_id');
            setUser__id(user_id);
        }
        FetchUserId();
    }, []);
        
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <View style={styles.drawerHeader}>
            <Icon name="menu" size={30} onPress={() => navigation.closeDrawer()} />
        </View>
        {/* <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('SignIn')}>
            <Icon name="login" size={24} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Register')}>
            <Icon name="account-plus" size={24} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Register</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Chat', {user_id: user__id})}>
            <Icon name="chat" size={24} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Lecture')}>
            <Icon name="book-open" size={24} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Lecture</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Topics', {user_id: user__id})}>
            <Icon name="book-open" size={24} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Topics</Text>
        </TouchableOpacity>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  drawerHeader: {
    alignItems: 'flex-start',
    marginLeft: 16,
    marginTop: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  drawerIcon: {
    marginRight: 16,
    color: '#757575',
  },
  drawerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#757575',
  },
});

export default CustomDrawerContent;
