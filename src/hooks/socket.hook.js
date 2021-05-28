import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux'
import {setGeneratedImageAccessURL} from '../redux/slicers/generated-image.slicer'
import {setOriginImage} from '../redux/slicers/origin-image.slicer'
import { setIsLoading } from '../redux/slicers/is-loading.slicer'

export function useSocket() {
    const socket = io('ws://192.168.1.26:3000')
    const dispatch = useDispatch()

    socket.on('connection', async data => {
        const {socketID} = data
        await AsyncStorage.setItem('socketID', socketID)
    })

    socket.on('UPLOAD_IMAGE_SUCCESS', async data => {
        dispatch(setOriginImage(data))
        dispatch(setIsLoading(false))
    })
    

    socket.on('TRANSFER_COMPLETED', async data => {
        const {accessURL, styleID} = data
        dispatch(setGeneratedImageAccessURL({accessURL: accessURL, styleID}))
        dispatch(setIsLoading(false))
    })
    return socket
}
