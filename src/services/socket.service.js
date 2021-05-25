import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux'
import {setGeneratedImageAccessURL} from '../redux/slicers/generated-image.slicer'
import {setOriginImage} from '../redux/slicers/origin-image.slicer'
export function useSocket() {
    const socket = io('ws://192.168.1.26:3000')
    const dispatch = useDispatch()

    socket.on('connection', async data => {
        const {socketID} = data
        await AsyncStorage.setItem('socketID', socketID)
    })

    socket.on('UPLOAD_IMAGE_SUCCESS', async data => {
        console.log("transfer success")
        console.log(data)
        await dispatch(setOriginImage(data))
    })
    

    socket.on('TRANSFER_COMPLETED', async data => {
        const {accessURL, styleID} = data
        await dispatch(setGeneratedImageAccessURL({accessURL: accessURL, styleID}))
    })
    return socket
}
