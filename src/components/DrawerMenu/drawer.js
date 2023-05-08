import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.drawerHeader}>
        <Icon name="menu" size={30} onPress={() => navigation.closeDrawer()} />
      </View>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('SignIn')}>
        <Icon name="login" size={24} style={styles.drawerIcon} />
        <Text style={styles.drawerText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Register')}>
        <Icon name="account-plus" size={24} style={styles.drawerIcon} />
        <Text style={styles.drawerText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Chat')}>
        <Icon name="chat" size={24} style={styles.drawerIcon} />
        <Text style={styles.drawerText}>Chat</Text>
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
