import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native'
import Modal from 'react-native-modal'
import tailwind from 'tailwind-rn'
import { styles } from '../../../styles'
import { DownloadSuccessModal } from '../../../commons/components/modals/DownloadSuccessModal'
import { ConfirmDeleteModal } from '../../../commons/components/modals/ConfirmDeleteModal'
import { MoveMediaToAnotherAlbumModal } from '../../../commons/components/modals/MoveMediaToAnotherAlbumModal/MoveMediaToAnotherAlbumModal'
import { handleMoveMedia } from './handler'
import { ApplyStyleModal } from '../../../commons/components/modals/ApplyStyleModal'
import { setOriginImage } from '../../../redux/slicers/origin-image.slicer'
import { RequestTransferVideoSuccessModal } from '../../../commons/components/modals/RequestTransferVideoSuccessModal'
import Toast from 'react-native-toast-message';
import { SetBackgroundModal } from '../../../commons/components/modals/SetBackgroundModal'

import { handleCancleDeleteModal,
    handleConfirmDeleteModal,
    handlePressDeleteButton,
    handlePressDownloadButton, 
    getMediaLibraryPermission, 
    handlePressBack,
    handleCloseDownloadSuccessModal
 } from './handler'
import { Video, AVPlaybackStatus } from 'expo-av';
import { EFFECT_PAGE } from '../../../enums/page-name'
import { requestTransferVideo } from '../../../apis/medias'
import { setIsLoading } from '../../../redux/slicers/is-loading.slicer'


export const MediaDetail = ({ media, visible, setVisible, navigation, albumId }) => {
    const dispatch = useDispatch()
    const [isConfirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
    const [isDownloadSuccessModalVisible, setDownloadSucessModalVisible] = useState(false)
    const [isMoveMediaModalShow, setMoveMediaModalShow] = useState(false)
    const [originImageHeight, setOriginImageHeight] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [mediaPermission, setMediaPermission] = useState(null)
    const [showApplyStyleModal, setShowApplyStyleModal] = useState(false)
    const [selectedStyleId, setSelectedStyleId] = useState(null)
    const [showRequestTransferVideoSuccessModal, setShowRequestTransferVideoSuccessModal] = useState(null)
    const [showSetBackgroundModal, setShowSetBackgroundModal] = useState(false)

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
                <View style={tailwind("flex flex-row items-center justify-center w-full h-full bg-black")}>
                    <Image
                        style={{height: originImageHeight, ...tailwind("w-full")}} 
                        source={{uri: media.accessURL}}
                    />  
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
    const handleRequestTransferVideo = async () => {
        dispatch(setIsLoading(true))
        setShowApplyStyleModal(false)
        try {
            const data = await requestTransferVideo({
                albumId,
                mediaId: media.id,
                styleId: selectedStyleId
            })
            dispatch(setIsLoading(false)) 
        } catch (error) {
            console.log(error)
            Toast.show({
                text1: "Error",
                text2: error,
                type: 'error',
                position: 'top'
            })
            dispatch(setIsLoading(false)) 
        }
        
    }

    const handleApplyStyle = (media) => {
        if(media.type == "VIDEO") {
            setShowApplyStyleModal(true)
        }
        else {
            const {accessURL} = media
            dispatch(setOriginImage({accessURL}))
            navigation.navigate(EFFECT_PAGE)
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
                        <RequestTransferVideoSuccessModal visible={true}/>
                        <ApplyStyleModal visible={showApplyStyleModal} onCancel={() => setShowApplyStyleModal(false)} setSelectedStyleId={setSelectedStyleId}
                            handleRequestTransferVideo={handleRequestTransferVideo}/>
                        <View style={{...tailwind("flex flex-row absolute py-5 w-full z-20")}}>
                            <View style={tailwind("w-1/2 flex pl-5")}>
                                <TouchableOpacity onPress={() => setShowMenu(!showMenu)}
                                    style={{...tailwind("w-7 h-7 flex items-center justify-center rounded-lg"), ...styles.lighten_2, ...styles.shadow_2}} >
                                    <Image source={require('../../../assets/icons/menu.png')} style={tailwind("w-4 h-4")}/>
                                </TouchableOpacity>
                            </View>

                            <View style={tailwind("w-1/2 pr-5 items-end")}>
                                <TouchableOpacity style={{...tailwind("w-7 h-7 flex items-center justify-center rounded-lg"), ...styles.lighten_2, ...styles.shadow_2}} onPress={() => {
                                    handlePressBack({setVisible})
                                    setShowMenu(false)
                                }}>
                                    <Image source={require('../../../assets/icons/down-arrow.png')} style={tailwind("w-4 h-4")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            showMenu ? (
                            <View style={{...tailwind("py-4 z-20 absolute px-6 mt-14 ml-5 rounded-xl"), ...styles.darken_2}} hide>
                                <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => {
                                    setShowMenu(false)
                                    handleApplyStyle(media)
                                }}>
                                    <Image style={tailwind("w-3 h-3 mr-3")} source={require('../../../assets/icons/paint.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Apply style</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")} onPress = {() => {
                                    setShowMenu(false)
                                    handlePressDownloadButton({accessURL: media.accessURL, setDownloadSucessModalVisible})
                                }}>
                                    <Image style={tailwind("w-3 h-3 mr-3")} source={require('../../../assets/icons/download.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Download</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => {
                                    setShowMenu(false)
                                    setMoveMediaModalShow(true)
                                }}>
                                    <Image style={tailwind("w-3 h-3 mr-3")} source={require('../../../assets/icons/move.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Move</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                    onPress = {() => {
                                        setShowSetBackgroundModal(true)
                                        setShowMenu(false)
                                }}>
                                    <Image style={tailwind("w-3 h-3 mr-3")} source={require('../../../assets/icons/background.png')}></Image>
                                    <Text style={tailwind("text-xs font-thin text-white")}>Set to wall</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                    onPress = {() => {
                                        handlePressDeleteButton({setConfirmDeleteModalVisible})
                                        setShowMenu(false)
                                }}>
                                    <Image style={tailwind("w-3 h-3 mr-3")} source={require('../../../assets/icons/delete.png')}></Image>
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
                            type={media.type || "PHOTO"}
                            isVisible={isConfirmDeleteModalVisible} 
                            onConfirm={() => handleConfirmDeleteModal({mediaId: media.id, albumId: media.albumId, dispatch, setConfirmDeleteModalVisible, setVisible})} 
                            onCancel={() => handleCancleDeleteModal({setConfirmDeleteModalVisible})}/>
                        <SetBackgroundModal
                            media={media}
                            isVisible={showSetBackgroundModal} 
                            onCancel={() => setShowSetBackgroundModal(false)}/>
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
