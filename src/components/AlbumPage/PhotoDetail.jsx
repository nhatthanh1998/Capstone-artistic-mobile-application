import React, { useEffect, useState } from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import { DownloadSuccessModal } from '../../commons/components/modals/DownloadSuccessModal'
import { ConfirmDeleteModal } from '../../commons/components/modals/ConfirmDeleteModal'
import {requestDeletePhoto, } from '../../apis/photos'
import {deletePhotoFromAlbums } from '../../redux/slicers/albums.slicer'


export const PhotoDetail = ({photo, visible, handlePressBack}) => {
    const [showDownloadSuccessModal, setShowDownloadSuccessModal] = useState(false)
    const [isConfirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
    const [originImageHeight, setOriginImageHeight] = useState(0)
    const [showMenu, setShowMenu] = useState(false)

    // Action

    const handleConfirmDeleteModal = async ({photoId}) => {
        const response = await requestDeletePhoto({photoId})
        dispatch(deletePhotoFromAlbums(response))
        handlePressBack()
    }

    const handlePressDeleteButton = () => {
        setConfirmDeleteModalVisible(true)
    }

    const handleCancleDeleteModal = () => {
        setConfirmDeleteModalVisible(false)
    }

    const handlePressDownloadButton = () => {

    }

    useEffect(() => {
        if(photo != null) {
            Image.getSize(photo.accessURL, (_, height) => {
                setOriginImageHeight(height)
            })
        }
    }, [photo])

    if(photo === null) {
        return <Text>No photo selected!</Text>
    } else {
        return (
            <Modal style={tailwind("m-0")} isVisible={visible}>
                <View style={tailwind("w-full h-full bg-gray-900")}>
                    <View style={tailwind("flex flex-row z-20 absolute py-5 w-full")}>
                        <TouchableOpacity style={tailwind("w-1/3 pl-5")} onPress={() => {handlePressBack()}}>
                            <Image source={require('../../assets/icons/left-arrow.png')} style={tailwind("h-5 w-5")}/>
                        </TouchableOpacity>
                        <View style={tailwind("w-1/3")}>
                            <Text style={tailwind("text-sm font-thin text-white text-center")}>{photo.photoName}</Text>
                        </View>
                        <View style={tailwind("w-1/3 flex items-end pr-5")}>
                            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                                <Image source={require('../../assets/icons/more.png')} style={tailwind("h-5 w-5")}/>
                            </TouchableOpacity>
                            {showMenu ? <View style={{...tailwind("py-4 px-6 mt-4 rounded-xl"), ...styles.darken_2}} hide>
                                <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")}>
                                    <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/share.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Share</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                onPress = {() => {
                                    handleDownload()
                                }}
                                >
                                    <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/download.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Download</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                onPress = {() => {handlePressDeleteButton()}}
                                >
                                    <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/delete.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Delete</Text>
                                </TouchableOpacity>
                            </View>: null}
                        </View>
                    </View>
    
                    <View style="z-10 relative">
                        <Image
                            style={{height: originImageHeight}} 
                            source={{uri: photo.accessURL}}
                            resizeMode="contain"/>  
                    </View>

                    <DownloadSuccessModal show = {showDownloadSuccessModal} />
                    <ConfirmDeleteModal isVisible = {isConfirmDeleteModalVisible} onConfirm = {() => handleConfirmDeleteModal({photoId: id})} onCancel = {() => handleCancleDeleteModal()}/>
                </View>                 
            </Modal>
        )
    }
}