import io from 'socket.io-client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux'
import {setGeneratedImage} from '../redux/slicers/generated-image.slicer'
import {setOriginImage} from '../redux/slicers/origin-image.slicer'
import { setIsLoading } from '../redux/slicers/is-loading.slicer'
import {TRANSFER_COMPLETED, UPLOAD_IMAGE_SUCCESS} from '../enums/socket-event'
import {SOCKET_SERVER} from '@env'
import { requestGetNotifications } from '../apis/notifications';
import { setNotifications } from '../redux/slicers/notifications.slicer';
import { setMediasNull } from '../redux/slicers/albumss.slicer';

const socket = io("ws://192.168.1.26:3000")
export function useSocket() {
    const dispatch = useDispatch()

    socket.on('connection', async data => {
        const {socketId} = data
        await AsyncStorage.setItem('socketId', socketId)
    })

    socket.on(UPLOAD_IMAGE_SUCCESS, async data => {
        dispatch(setOriginImage(data))
        dispatch(setIsLoading(false))
    })
    

    socket.on(TRANSFER_COMPLETED, async data => {
        const {accessURL, styleId, transferPhotoLocation} = data
        dispatch(setGeneratedImage({accessURL, styleId, transferPhotoLocation}))
        dispatch(setIsLoading(false))
    })
    return socket
}

export const emitEvent = async ({event, payload}) => {
    await socket.emit(event, payload)
}

export const setUpListen = async ({userId, dispatch}) => {
    await socket.on(userId, data => {
        const {action} = data
        switch(action) {
            case 'TRANSFER_VIDEO_COMPLETE': {
                const {albumId} = data
                requestGetNotifications().then(({data, count}) => {
                    dispatch(setNotifications({
                        notifications: data,
                        count,
                    }))
                    dispatch(setMediasNull({id: albumId}))
                })
                break;
            }
        }
    })
}

