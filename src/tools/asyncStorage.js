import AsyncStorage from '@react-native-async-storage/async-storage';


import { exp } from 'react-native-reanimated';



// Retrieve user_id from AsyncStorage
export const getData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(('@'+key));
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
        console.log(error);
    }
}

export const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@'+key, jsonValue)
      } catch (error) {
        console.log(error);
      }
}
