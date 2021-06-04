import React, { useState } from 'react'
import {View, Image, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { RegisterSuccessModal } from './RegisterSuccessModal'

async function downloadImage(imageUrl) {
    const {granted} = await MediaLibrary.getPermissionsAsync();
    if (!granted) {
        console.log("Permission not granted")
        return;
    }
    try {
        const fileName = imageUrl.lastIndexOf('/')
        const fileUri = `${FileSystem.documentDirectory}${fileName}.png`;
        const downloadedFile = await FileSystem.downloadAsync(imageUrl, fileUri);

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
        console.log("Download Done")
      } catch (e) {
        console.log("Error at the end", e)
    }
}

function deleteFile() {

}


export const PageHeader = ({item, index, onClose}) => {
    const [isOpenConfirmModel, setIsOpenConfirmModel] = useState(false)

    const confirmDeletePhoto = () => {
        setIsOpenConfirmModel(true)
    }

    const onConfirm = () => {
        setIsOpenConfirmModel(false)
        console.log("Delete nha em trai")
    }

    const onCancel = () => {
        setIsOpenConfirmModel(false)
    }

    return ( 
        <View style={tailwind("flex flex-row bg-white px-5 py-4")}>
            <View style={tailwind("w-1/3")}>
                <TouchableOpacity onPress={onClose}>
                    <Image style={tailwind("w-7 h-7")} source={{uri: "https://image.flaticon.com/icons/png/512/2223/2223615.png"}}></Image>
                </TouchableOpacity>
            </View>
            <View style={tailwind("flex flex-row w-2/3 justify-end")}>
                <TouchableOpacity onPress={confirmDeletePhoto}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={{uri: "https://image.flaticon.com/icons/png/512/1214/1214428.png"}}></Image>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => downloadImage(item.accessURL)}>
                    <Image style={tailwind("w-6 h-6 mr-6")} source={{uri: "https://image.flaticon.com/icons/png/512/1828/1828784.png"}}></Image>
                </TouchableOpacity>
                <Image style={tailwind("w-6 h-6 ")} source={{uri: "https://image.flaticon.com/icons/png/512/1159/1159633.png"}}></Image>
            </View>
            <RegisterSuccessModal onCancel={onCancel} onConfirm={onConfirm} isVisible={isOpenConfirmModel}/>
        </View>
    )
}