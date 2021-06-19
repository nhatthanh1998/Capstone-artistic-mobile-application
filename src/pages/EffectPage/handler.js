import {fetchAllStyles} from '../../apis/styles'
import {setStyles} from '../../redux/slicers/style.slicer'
import { sendTransferPhotoRequest, requestSavePhotoToAlbum } from '../../apis/photos'
import { DEFAULT_STYLE_ID } from '../../enums/default-style-id'
import { MAIN_PAGE } from '../../enums/page-name'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import { fetchAlbums } from '../../apis/albums'


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

export const handleRequestSavePhoto = async ({dispatch, selectedStyle, generatedImage}) => {
    const photoLocation = generatedImage[selectedStyle.id]
    const response = await requestSavePhotoToAlbum({photoLocation})
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


export const handlePressSavePhoto = async ({setSaveModalPhotoVisible, setAlbums, dispatch}) => {
    setSaveModalPhotoVisible(true)
    dispatch(setIsLoading(true))
    const response = await fetchAlbums()
    setAlbums(response)
    dispatch(setIsLoading(false))
}