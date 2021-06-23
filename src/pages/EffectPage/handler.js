import {fetchAllStyles} from '../../apis/styles'
import {setStyles} from '../../redux/slicers/style.slicer'
import { sendTransferPhotoRequest, requestSavePhotoToAlbum } from '../../apis/photos'
import { DEFAULT_STYLE_ID } from '../../enums/default-style-id'
import { MAIN_PAGE } from '../../enums/page-name'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import { fetchAlbums } from '../../apis/albums'
import { ALBUM_DETAIL_PAGE } from '../../enums/page-name'
import { cleanOriginImage } from '../../redux/slicers/origin-image.slicer'
import { cleanGeneratedImage } from '../../redux/slicers/generated-image.slicer'

export const getStyles = async ({dispatch}) => {
    const response = await fetchAllStyles()
    dispatch(setStyles(response))
}

export const requestTransferImage = async ({generatedImage, selectedStyle, photoLocation, dispatch}) => {
    const { id } = selectedStyle
    if(generatedImage[id] === undefined && id !== DEFAULT_STYLE_ID) {
        dispatch(setIsLoading(true))
        await sendTransferPhotoRequest({photoLocation, selectedStyle})
    }
}



export const handlePressBack = ({setBackModalVisible}) => {
    setBackModalVisible(true)
}

export const handleConfirmGoBack = ({navigation, setBackModalShow}) => {
    setBackModalShow(false)
    navigation.navigate(MAIN_PAGE)
}

export const handleContinueEdit = ({setBackModalVisible}) => {
    setBackModalVisible(false)
}


export const handlePressSavePhoto = async ({setSavePhotoModalVisible, setAlbums, dispatch}) => {
    setSavePhotoModalVisible(true)
    dispatch(setIsLoading(true))
    const response = await fetchAlbums()
    setAlbums(response)
    dispatch(setIsLoading(false))
}

handlePressCancelSavePhotoModal = ({setSavePhotoModalVisible}) => {
    setSavePhotoModalVisible(false)
}

export const handleRequestSavePhoto = async ({ photoLocation, albumId, setAlbumError, dispatch, navigation }) => {
    if(albumId === null) {
        setAlbumError("Album must be selected!")
    } else {
        setAlbumError("")
        dispatch(setIsLoading(true))
        await requestSavePhotoToAlbum({photoLocation, albumId})
        dispatch(cleanGeneratedImage())
        dispatch(cleanOriginImage())
        dispatch(setIsLoading(false))
        navigation.navigate(ALBUM_DETAIL_PAGE, {
            albumId
        })
    }
}
