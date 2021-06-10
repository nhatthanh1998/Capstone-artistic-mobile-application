import {requestDeletePhoto} from '../../../apis/photos'
import {deletePhotoFromAlbums } from '../../../redux/slicers/albums.slicer'
import * as MediaLibrary from 'expo-media-library';

export const handlePressBack = ({setVisible}) => {
    setVisible(false)
}



export const handleConfirmDeleteModal = async ({photoId, dispatch, setVisible, setConfirmDeleteModalVisible}) => {
    const response = await requestDeletePhoto({
        photoId
    })
    dispatch(deletePhotoFromAlbums(response))
    setConfirmDeleteModalVisible(false)
    handlePressBack({setVisible})
}

export const handlePressDeleteButton = ({setConfirmDeleteModalVisible}) => {
    setConfirmDeleteModalVisible(true)
}

export const handleCancleDeleteModal = ({setConfirmDeleteModalVisible}) => {
    setConfirmDeleteModalVisible(false)
}


export const handlePressDownloadButton = async ({accessURL, setIsShowDownloadSuccessModel}) => {
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
        setIsShowDownloadSuccessModel(true)
    } catch (e) {
        console.log("Error at the end", e)
    }
}


export const getMediaLibraryPermission = async ({setMediaPermission}) => {
    const { granted } = await MediaLibrary.getPermissionsAsync();
    if (!granted) {
        setMediaPermission(false)
    } else {
        setMediaPermission(true)
    }
}
