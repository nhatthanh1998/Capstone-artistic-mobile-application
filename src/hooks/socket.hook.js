import io from 'socket.io-client'
import {setGeneratedImage} from '../redux/slicers/generated-image.slicer'
import {setOriginImage} from '../redux/slicers/origin-image.slicer'
import { setIsLoading } from '../redux/slicers/is-loading.slicer'
import { TRANSFER_PHOTO_COMPLETED, TRANSFER_VIDEO_COMPLETED, UPLOAD_IMAGE_SUCCESS} from '../enums/socket-event'
import {SOCKET_SERVER} from '../config/index'
import { requestGetNotifications } from '../apis/notifications';
import { setNotifications } from '../redux/slicers/notifications.slicer';
import { addMedia } from '../redux/slicers/albumss.slicer';

const socket = io(SOCKET_SERVER)
export function useSocket() {
    return socket
}

export const emitEvent = async ({event, payload}) => {
    await socket.emit(event, payload)
}

export const setUpListen = async ({userId, dispatch}) => {
    await socket.on(userId, data => {
        const {action} = data
        switch(action) {
            case TRANSFER_VIDEO_COMPLETED: {
                const {albumId, media} = data
                dispatch(addMedia({albumId, media}))
                requestGetNotifications().then(({data, count}) => {
                    dispatch(setNotifications({
                        notifications: data,
                        count,
                    }))
                })
                break;
            }
            case TRANSFER_PHOTO_COMPLETED: {
                const {accessURL, styleId, transferPhotoLocation} = data
                dispatch(setGeneratedImage({accessURL, styleId, transferPhotoLocation}))
                dispatch(setIsLoading(false))
                break;
            }
            case UPLOAD_IMAGE_SUCCESS: {
                dispatch(setOriginImage(data))
                dispatch(setIsLoading(false))
                dispatch(addMedia({albumId: data.albumId, media: data}))
                break;
            }
        }
    })
}

