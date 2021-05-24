import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const socket = io('ws://192.168.1.26:3000')

socket.on('connection', async data => {
    const {socketID} = data
    console.log("here",socketID)
    await AsyncStorage.setItem('socketID', socketID)
})