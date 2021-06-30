import {requestDeleteMedia} from '../../../apis/photos'
import {deleteMedia } from '../../../redux/slicers/albumss.slicer'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { changeMediaAlbumLocation } from '../../../apis/medias'
import { setIsLoading } from '../../../redux/slicers/is-loading.slicer';

export const handlePressBack = ({setVisible}) => {
    setVisible(false)
}

export const handleConfirmDeleteModal = async ({mediaId, albumId, dispatch, setVisible, setConfirmDeleteModalVisible}) => {
    dispatch(setIsLoading(true))
    setConfirmDeleteModalVisible(false)
    await requestDeleteMedia({ mediaId })
    dispatch(deleteMedia({albumId, mediaId}))
    dispatch(setIsLoading(false))
    handlePressBack({setVisible})
}

export const handlePressDeleteButton = ({setConfirmDeleteModalVisible}) => {
    setConfirmDeleteModalVisible(true)
}

export const handleCancleDeleteModal = ({setConfirmDeleteModalVisible}) => {
    setConfirmDeleteModalVisible(false)
}

export const handlePressDownloadButton = async ({accessURL, setDownloadSucessModalVisible}) => {
    try {
        const fileName = accessURL.lastIndexOf('/')
        const fileUri = `${FileSystem.documentDirectory}${fileName}.png`;
        const downloadedFile = await FileSystem.downloadAsync(accessURL, fileUri);
        if (downloadedFile.status != 200) {
            console.log("Error in download file")
        }
        const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
        const album = await MediaLibrary.getAlbumAsync('Download');
        if (album == null) {
            await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        setDownloadSucessModalVisible(true)
    } catch (e) {
        console.log("Error at the end", e)
    }
}


export const handleCloseDownloadSuccessModal = ({setDownloadSucessModalVisible}) => {
    setDownloadSucessModalVisible(false)
}

export const getMediaLibraryPermission = async ({setMediaPermission}) => {
    const { granted } = await MediaLibrary.getPermissionsAsync();
    if (!granted) {
        setMediaPermission(false)
    } else {
        setMediaPermission(true)
    }
}

export const handleMoveMedia = async ({mediaId, selectedAlbumId}) => {
    return await changeMediaAlbumLocation({mediaId, selectedAlbumId})
}
