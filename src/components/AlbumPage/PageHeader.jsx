import React, { useState } from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { DownloadSuccessModal } from '../../commons/components/modals/DownloadSuccessModal'
import { ConfirmDeleteModal } from '../../commons/components/modals/ConfirmDeleteModal'


function deleteFile() {

}


export const PageHeader = ({item, index, onClose}) => {
    const [isShowConfirmDeleteModel, setIsShowConfirmDeleteModel] = useState(false)
    const [isShowDownloadSuccessModel, setIsShowDownloadSuccessModel] = useState(false)
    const {accessURL} = item

    const confirmDeletePhoto = () => {
        setIsShowConfirmDeleteModel(true)
    }

    const onConfirm = () => {
        



        setIsShowDownloadSuccessModel(false)
    }

    const onDownloadImage = async () => {
        const {granted} = await MediaLibrary.getPermissionsAsync();
        if (!granted) {
            console.log("Permission not granted")
            return;
        }
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

    return ( 
        <View style={tailwind("flex flex-row bg-white px-5 py-4")}>
            <View style={tailwind("w-1/3")}>
                <TouchableOpacity onPress={onClose}>
                    <Image style={tailwind("w-7 h-7")} source={require('../../assets/icons/left_icon_black.png')}></Image>
                </TouchableOpacity>
            </View>
            <View style={tailwind("flex flex-row w-2/3 justify-end")}>
                <TouchableOpacity onPress={confirmDeletePhoto}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={require('../../assets/icons/delete_black.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDownloadImage}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={require('../../assets/icons/download_black.png')}></Image>
                </TouchableOpacity>
                <Image style={tailwind("w-6 h-6 ")} source={require('../../assets/icons/edit_black.png')}></Image>
                
            </View>
            <ConfirmDeleteModal onCancel={() => {
                setIsShowConfirmDeleteModel(false)
            }} onConfirm={onConfirm} isVisible={isShowConfirmDeleteModel}/>
            <DownloadSuccessModal isVisible={isShowDownloadSuccessModel} onClose={() => setIsShowDownloadSuccessModel(false)}/>
        </View>
    )
}