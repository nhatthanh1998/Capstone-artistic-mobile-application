import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux'
import {setGeneratedImageAccessURL} from '../redux/slicers/generated-image.slicer'
export function useSocket() {
    const socket = io('ws://192.168.1.26:3000')
    const dispatch = useDispatch()

    socket.on('connection', async data => {
        const {socketID} = data
        await AsyncStorage.setItem('socketID', socketID)
    })

    socket.on('TRANSFER_COMPLETED', async data => {
        const {accessURL, styleID} = data
        console.log("in service TRANSFER COMPLETE-selectedStyleID:", styleID)
        console.log("in service TRANSFER COMPLETE-accessURL:", accessURL)
        console.log(data)

        await dispatch(setGeneratedImageAccessURL({accessURL: accessURL, styleID}))
    })
    return socket
}
