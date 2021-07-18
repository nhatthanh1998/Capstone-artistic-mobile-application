import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'
import { selectStyles, setSelectedStyle, selectSelectedStyle, selectPrevSelectedStyle } from '../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../redux/slicers/origin-image.slicer'
import { selectGeneratedImageAccessURL, setGeneratedImage, selectGeneratedImagePhotoLocations } from '../../redux/slicers/generated-image.slicer'
import { getStyles, handlePressSavePhoto, requestTransferImage, handleExit, handleRequestSavePhoto } from './handler'
import { DEFAULT_STYLE_ID } from "../../enums/default-style-id"
import tailwind from "tailwind-rn";
import { View, TouchableOpacity, StatusBar, Image, Text, BackHandler, ToastAndroid } from 'react-native'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'
import { Loading } from '../../commons/components/Loading/Loading'
import { SaveToAlbumSuccessModal } from '../../commons/components/modals/SaveToAlbumSuccessModal'
import { SavePhotoToAlbumModal } from '../../commons/components/modals/SavePhotoToAlbumModal/SavePhotoToAlbumModal'
import { QuitModal } from '../../commons/components/modals/QuitModal'
import { handlePressBack } from "../CameraPage/handler";


export const EffectPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const [isDisableSave, setDisableSave] = useState(true)
    const [albums, setAlbums] = useState(null)
    const [selectedAlbum, setSelectedAlbum] = useState(null)
    const [albumError, setAlbumError] = useState('')
    const styles = useSelector(selectStyles)
    const selectedStyle = useSelector(selectSelectedStyle)
    const prevSelectedStyle = useSelector(selectPrevSelectedStyle)
    const originImage = useSelector(selectOriginImage)
    const generatedImage = useSelector(selectGeneratedImageAccessURL)
    const photoLocations = useSelector(selectGeneratedImagePhotoLocations)
    const isLoading = useSelector(selectIsLoading)
    const [showSaveSuccessModel, setShowSaveSuccessModel] = useState(false)
    const [isSavePhotoModalVisible, setSavePhotoModalVisible] = useState(false)
    const [showQuitModal, setShowQuitModal] = useState(false)

    useEffect(() => {
        StatusBar.setHidden(true)
        getStyles({dispatch})
        BackHandler.addEventListener("hardwareBackPress", handlePressHardwareBackButton)
        return () => { BackHandler.removeEventListener() }
    }, [])


    useEffect(() => {
        dispatch(setGeneratedImage({ accessURL: originImage.accessURL, styleId: DEFAULT_STYLE_ID, transferPhotoLocation: null}))
        dispatch(setSelectedStyle({id: DEFAULT_STYLE_ID}))
    }, [originImage])


    useEffect(() => {
        requestTransferImage({
            generatedImage,
            photoLocation:originImage.accessURL,
            selectedStyle,
            dispatch
        })

        selectedStyle.id === DEFAULT_STYLE_ID ? setDisableSave(true) : setDisableSave(false)
    }, [selectedStyle])


    const handlePressHardwareBackButton = () => {
        setShowQuitModal(true)
        return true
    }
    return (
        <View style={tailwind("flex-1 relative h-full")}>
            <QuitModal
                isVisible={showQuitModal}
                onCancel={() => setShowQuitModal(false)}
                onConfirm={() => handleExit({navigation, setShowQuitModal, dispatch})}
            />

            <SaveToAlbumSuccessModal 
                isVisible={showSaveSuccessModel} 
                onConfirm={() => setShowSaveSuccessModel(false)} 
                onCancel={() => handleExit({navigation, setShowSaveSuccessModel, dispatch})}
            />

            <SavePhotoToAlbumModal 
                isVisible={isSavePhotoModalVisible}
                onCancel={() => {setSavePhotoModalVisible(false)}}
                albums={albums}
                selectedAlbum={selectedAlbum}
                setSelectedAlbum={setSelectedAlbum}
                onConfirm={() => {
                    handleRequestSavePhoto({setAlbumError, setSavePhotoModalVisible, setShowSaveSuccessModel, dispatch, navigation, albumId:selectedAlbum, photoLocation:photoLocations[selectedStyle.id]})
                }}/>
            <Loading isLoading={isLoading}/>

            <View style={tailwind("flex flex-row items-center bg-white px-5 py-4 relative z-20")}>
                <View style={tailwind("w-1/3")}>
                    <TouchableOpacity onPress={() => setShowQuitModal(true)}>
                        <Image style={tailwind("w-5 h-5")} source={require('../../assets/icons/x-square.png')}></Image>
                    </TouchableOpacity>
                </View>
                <View style={tailwind("w-1/3")}>
                    <Text style={tailwind("text-lg font-medium")}>Effect Page</Text>
                </View>
                <View style={tailwind("flex flex-row w-1/3 justify-end")}>
                    <TouchableOpacity
                    disabled={isDisableSave}
                    onPress={() => {handlePressSavePhoto({setAlbums, setSavePhotoModalVisible, dispatch})}}>
                        <Image style={tailwind("w-5 h-5")} source={require('../../assets/icons/download_black.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <ImageBox photoURL={generatedImage[selectedStyle.id]} prevPhotoURL={generatedImage[prevSelectedStyle.id]}/>
            <ListEffectBoxContainer
                styles={styles}
                originImageAccessURL={originImage.accessURL}
            />
        </View >
    )
}
