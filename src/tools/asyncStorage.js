import AsyncStorage from '@react-native-async-storage/async-storage';
import { exp } from 'react-native-reanimated';



// Retrieve user_id from AsyncStorage
export const getData = async (item) => {
try {
    const value = await AsyncStorage.getItem(item);
    } catch (error) {
        console.log(error);
    }
}

export const storeData = async (item, value) => {
    try {
    await AsyncStorage.setItem(item, value);
    } catch (error) {
    console.log(error);
    }
}
