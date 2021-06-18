import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import tailwind from 'tailwind-rn'
import { styles } from '../../../styles'
import { DownloadSuccessModal } from '../../../commons/components/modals/DownloadSuccessModal'
import { ConfirmDeleteModal } from '../../../commons/components/modals/ConfirmDeleteModal'
import { handleCancleDeleteModal,
    handleConfirmDeleteModal,
    handlePressDeleteButton,
    handlePressDownloadButton, 
    getMediaLibraryPermission, 
    handlePressBack,
    handleCloseDownloadSuccessModal
 } from './handler'



export const PhotoDetail = ({ photo, visible, setVisible }) => {
    const dispatch = useDispatch()
    const [showDownloadSuccessModal] = useState(false)
    const [isConfirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false)
    const [isDownloadSuccessModalVisible, setDownloadSucessModalVisible] = useState(false)
    const [originImageHeight, setOriginImageHeight] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    const [mediaPermission, setMediaPermission] = useState(null)


    useEffect(() => {
        getMediaLibraryPermission({ setMediaPermission })
    }, [])

    useEffect(() => {
        if (photo != null) {
            Image.getSize(photo.accessURL, (_, height) => {
                setOriginImageHeight(height)
            })
        }
    }, [photo])

    if (mediaPermission === null) {
        return <Text>Something when wrong with the Media Permission</Text>
    }

    if (mediaPermission === false) {
        return <Text>Media Permission not granted!</Text>
    } else {
        return (
            <Modal 
            animationOut="bounceOut"
            animationIn="bounceInUp"
            animationInTiming={350}
            animationOutTiming={250} style={tailwind("m-0")} isVisible={visible}>
                {
                    photo == null ? <></> :
                    (
                        <View style={tailwind("w-full h-full relative")}>
                            <View style={{...tailwind("flex flex-row absolute py-5 w-full z-20 bg-gray-900")}}>
                                <TouchableOpacity style={tailwind("w-1/3 pl-5")} onPress={() => {handlePressBack({setVisible})}}>
                                    <Image source={require('../../../assets/icons/left-arrow.png')} style={tailwind("h-5 w-5")}/>
                                </TouchableOpacity>
                                <View style={tailwind("w-1/3")}>
                                    <Text style={tailwind("text-sm font-thin text-white text-center")}>{photo.photoName}</Text>
                                </View>
                                <View style={tailwind("w-1/3 flex items-end pr-5")}>
                                    <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                                        <Image source={require('../../../assets/icons/more.png')} style={tailwind("h-5 w-5")}/>
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
                                    <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => console.log("Press")}>
                                        <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../../assets/icons/share.png')}></Image>
                                        <Text style={tailwind("text-xs font-thin text-white")}>Share</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                    onPress = {() => {
                                        handlePressDownloadButton({accessURL: photo.accessURL, setDownloadSucessModalVisible})
                                    }}
                                    >
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
                            <View style={tailwind("pt-20 flex flex-row items-center justify-center w-full h-full bg-gray-900")}>
                                <Image
                                    style={{height: originImageHeight, ...tailwind("w-full")}} 
                                    source={{uri: photo.accessURL}}
                                    resizeMode="contain"/>  
                            </View>
                            <DownloadSuccessModal isVisible = {isDownloadSuccessModalVisible} 
                            onClose={() => {handleCloseDownloadSuccessModal({setDownloadSucessModalVisible})}}
                            />
                            <ConfirmDeleteModal 
                            isVisible = {isConfirmDeleteModalVisible} 
                            onConfirm = {() => handleConfirmDeleteModal({photoId: photo.id, dispatch, setConfirmDeleteModalVisible, setVisible})} 
                            onCancel = {() => handleCancleDeleteModal({setConfirmDeleteModalVisible})}/>
                        </View> 
                    )
                }                
            </Modal>
        )
    }
}