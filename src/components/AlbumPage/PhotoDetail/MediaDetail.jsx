import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import tailwind from 'tailwind-rn'
import { styles } from '../../../styles'
import { DownloadSuccessModal } from '../../../commons/components/modals/DownloadSuccessModal'
import { ConfirmDeleteModal } from '../../../commons/components/modals/ConfirmDeleteModal'
import { MoveMediaToAnotherAlbumModal } from '../../../commons/components/modals/MoveMediaToAnotherAlbumModal/MoveMediaToAnotherAlbumModal'
import {handleMoveMedia} from './handler'


import { handleCancleDeleteModal,
    handleConfirmDeleteModal,
    handlePressDeleteButton,
    handlePressDownloadButton, 
    getMediaLibraryPermission, 
    handlePressBack,
    handleCloseDownloadSuccessModal
 } from './handler'
import { Video, AVPlaybackStatus } from 'expo-av';


export const MediaDetail = ({ media, visible, setVisible, navigation }) => {
    const dispatch = useDispatch()
    const [isConfirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
    const [isDownloadSuccessModalVisible, setDownloadSucessModalVisible] = useState(false)
    const [isMoveMediaModalShow, setMoveMediaModalShow] = useState(false)
    const [originImageHeight, setOriginImageHeight] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [mediaPermission, setMediaPermission] = useState(null)

    useEffect(() => {
        getMediaLibraryPermission({ setMediaPermission })
    }, [])

    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        if (media != null) {
            if(media.type == "PHOTO") {
                Image.getSize(media.accessURL, (width, height) => {
                    setOriginImageHeight(screenWidth * height / width)
                })
            }
        }
    }, [media])

    const renderContent = (media) => {
        if(media.type == "PHOTO") {
            return (
                <View style={tailwind("flex flex-row items-end justify-center w-full h-full bg-black")}>
                    <Image
                        style={{height: originImageHeight, ...tailwind("w-full")}} 
                        source={{uri: media.accessURL}}
                        resizeMode="contain"/>  
                </View>
            )
        } else {
            return (
                <View style={tailwind("flex bg-black justify-center items-center w-full")}>
                    <Video style={tailwind("w-full h-full")}
                        useNativeControls
                        resizeMode="contain" 
                        source={{
                            uri: media.m3u8_720p_playlsit
                    }}/>
                </View>
            )    
        }
    }

    if (mediaPermission === null) {
        return <Text>Something when wrong with the Media Permission</Text>
    }

    if (mediaPermission === false) {
        return <Text>Media Permission not granted!</Text> 
    }
    return (
        <Modal 
        animationOut="bounceOut"
        animationIn="bounceInUp"
        animationInTiming={350}
        animationOutTiming={250} style={tailwind("m-0")} isVisible={visible}>
            {
                media !== null ?
                (
                    <View style={tailwind("w-full h-full relative")}>
                        <View style={{...tailwind("flex flex-row absolute py-5 w-full z-20")}}>
                            <View style={tailwind("w-1/2 pl-5")}>
                                <TouchableOpacity style={{...tailwind("w-7 h-7 flex items-center justify-center rounded-lg"), ...styles.lighten_2, ...styles.shadow_2}} onPress={() => {handlePressBack({setVisible})}}>
                                    <Image source={{uri: "https://image.flaticon.com/icons/png/512/130/130831.png"}} style={tailwind("w-4 h-4")}/>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={tailwind("w-1/2 flex items-end pr-5")}>
                                <TouchableOpacity onPress={() => setShowMenu(!showMenu)}
                                    style={{...tailwind("w-7 h-7 flex items-center justify-center rounded-lg"), ...styles.lighten_2, ...styles.shadow_2}} >
                                    <Image source={{uri: "https://image.flaticon.com/icons/png/512/512/512142.png"}} style={tailwind("w-4 h-4")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            showMenu ? (
                            <View style={{...tailwind("py-4 z-20 absolute right-0 px-6 mt-14 mr-5 rounded-xl"), ...styles.darken_2}} hide>
                                <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => console.log("Press")}>
                                    <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../../assets/icons/paint.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Transfer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => setMoveMediaModalShow(true)}>
                                    <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../../assets/icons/share.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Move</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")} onPress = {() => {
                                    handlePressDownloadButton({accessURL: media.accessURL, setDownloadSucessModalVisible})
                                }}>
                                    <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../../assets/icons/download.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Download</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                    onPress = {() => {handlePressDeleteButton({setConfirmDeleteModalVisible})}}
                                >
                                    <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../../assets/icons/delete.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            ) : null
                        }
                        {
                            renderContent(media)
                        }
                        <DownloadSuccessModal isVisible = {isDownloadSuccessModalVisible} 
                            onClose={() => {handleCloseDownloadSuccessModal({setDownloadSucessModalVisible})}}
                        />
                        <ConfirmDeleteModal 
                            isVisible = {isConfirmDeleteModalVisible} 
                            onConfirm = {() => handleConfirmDeleteModal({photoId: media.id, dispatch, setConfirmDeleteModalVisible, setVisible})} 
                            onCancel = {() => handleCancleDeleteModal({setConfirmDeleteModalVisible})}/>
                        <MoveMediaToAnotherAlbumModal
                            isVisible={isMoveMediaModalShow}
                            onCancel={() => {setMoveMediaModalShow(false)}}
                            onConfirm={handleMoveMedia}
                            media={media}
                            navigation={navigation}
                            setMediaDetailVisible = {setVisible}
                        />
                    </View> 
                ) : <></>
            }                
        </Modal>
    )
}
