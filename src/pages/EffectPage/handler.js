import { fetchAllStyles } from '../../apis/styles'
import { setStyles } from '../../redux/slicers/style.slicer'
import { sendTransferPhotoRequest, requestSavePhotoToAlbum } from '../../apis/photos'
import { DEFAULT_STYLE_ID } from '../../enums/default-style-id'
import { MAIN_PAGE } from '../../enums/page-name'
import { setIsLoading } from '../../redux/slicers/is-loading.slicer'
import { fetchAlbums } from '../../apis/albums'
import { ALBUM_DETAIL_PAGE } from '../../enums/page-name'
import { cleanOriginImage } from '../../redux/slicers/origin-image.slicer'
import { cleanGeneratedImage } from '../../redux/slicers/generated-image.slicer'
import { addMedia } from '../../redux/slicers/albumss.slicer'
import Toast from 'react-native-toast-message';


export const getStyles = async ({ dispatch }) => {
    const response = await fetchAllStyles()
    dispatch(setStyles(response))
}

export const requestTransferImage = async ({ generatedImage, selectedStyle, photoLocation, dispatch }) => {
    let isValid = true
    if (photoLocation.includes("file://")) {
        isValid = false
        Toast.show({
            text1: "Info",
            text2: "Server is setting up your photo.",
            type: 'info',
            position: 'top'
        })
    }

    if (isValid === true) {
        const { id } = selectedStyle
        if (!generatedImage[id] && id !== DEFAULT_STYLE_ID) {
            dispatch(setIsLoading(true))
            const { data, message, statusCode } = await sendTransferPhotoRequest({ photoLocation, selectedStyle })
            if(!data) {
                dispatch(setIsLoading(false))
            }
            if (message && statusCode) {
                dispatch(setIsLoading(false))
                Toast.show({
                    text1: "Error",
                    text2: "This style is not support for now!",
                    type: 'error',
                    position: 'top'
                })
            }
        }
    }
}

export const handleExit = ({ navigation, setShowSaveSuccessModel, dispatch, setShowQuitModal }) => {
    setShowSaveSuccessModel && setShowSaveSuccessModel(false)
    setShowQuitModal && setShowQuitModal(false)
    dispatch(cleanGeneratedImage())
    dispatch(cleanOriginImage())
    navigation.navigate(MAIN_PAGE)
}

export const handleContinueEdit = ({ setBackModalVisible }) => {
    setBackModalVisible(false)
}

export const getAlbums = async ({ setAlbums }) => {
    const response = await fetchAlbums()
    setAlbums(response)
}

export const handleRequestSavePhoto = ({ photoLocation, albumId, setAlbumError, dispatch, setShowSaveSuccessModel, setSavePhotoModalVisible, setSelectedAlbum }) => {
    if (albumId === null) {
        setAlbumError("Album must be selected!")
    } else {
        setAlbumError("")
        setSavePhotoModalVisible(false)
        dispatch(setIsLoading(true))
        requestSavePhotoToAlbum({ photoLocation, albumId }).then(media => {
            dispatch(setIsLoading(false))
            dispatch(addMedia({ albumId, media }))
            setShowSaveSuccessModel(true)
            setSelectedAlbum(null)
        }).catch(error => {
            console.log(error)
            Toast.show({
                text1: "Error",
                text2: error,
                type: 'error',
                position: 'top'
            })
        })
        // dispatch(cleanGeneratedImage())
        // dispatch(cleanOriginImage())

        // navigation.navigate(ALBUM_DETAIL_PAGE, {
        //     albumId
        // })
    }
}
