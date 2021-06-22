import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ListEffectBoxContainer } from '../../containers/EffectPage/ListEffectBoxContainer'
import { ImageBox } from '../../components/EffectPage/ImageBox'
import { selectStyles, setSelectedStyle, selectSelectedStyle, selectPrevSelectedStyle } from '../../redux/slicers/style.slicer'
import { selectOriginImage } from '../../redux/slicers/origin-image.slicer'
import { selectGeneratedImageAccessURL, setGeneratedImage, selectGeneratedImagePhotoLocations } from '../../redux/slicers/generated-image.slicer'
import { getStyles, handlePressBack, handlePressSavePhoto, requestTransferImage, handleConfirmGoBack, handleContinueEdit, handleRequestSavePhoto } from './handler'
import { DEFAULT_STYLE_ID } from "../../enums/default-style-id"
import tailwind from "tailwind-rn";
import { View, TouchableOpacity, StatusBar, Image, Text } from 'react-native'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'
import { Loading } from '../../commons/components/Loading/Loading'
import { BackEffectPageModal } from '../../commons/components/modals/BackEffectPageModal'
import { SavePhotoToAlbumModal } from '../../commons/components/modals/SavePhotoToAlbumModal'


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
    const [isBackModalVisible, setBackModalVisible] = useState(false)
    const [isSavePhotoModalVisible, setSavePhotoModalVisible] = useState(false)

    useEffect(() => {
        StatusBar.setHidden(true)
        getStyles({dispatch})
        return () => { }
    }, [])


    useEffect(() => {
        dispatch(setGeneratedImage({ accessURL: originImage.accessURL, styleId: DEFAULT_STYLE_ID, transferPhotoLocation: null}))
        dispatch(setSelectedStyle({id: DEFAULT_STYLE_ID}))
    }, [originImage])


    useEffect(() => {
        requestTransferImage({generatedImage,
             photoLocation:originImage.accessURL,
             selectedStyle,
             dispatch
        })
        selectedStyle.id === DEFAULT_STYLE_ID ? setDisableSave(true) : setDisableSave(false)
    }, [selectedStyle])

    return (
        <View style={tailwind("flex-1 relative h-full")}>
            <BackEffectPageModal 
            isVisible={isBackModalVisible} 
            onCancel={() => handleContinueEdit({setBackModalVisible})} 
            onConfirm={() => handleConfirmGoBack({navigation, setBackModalShow})}/>

            <SavePhotoToAlbumModal 
            isVisible={isSavePhotoModalVisible}
            onCancel={() => {setSavePhotoModalVisible(false)}}
            albums={albums}
            selectedAlbum={selectedAlbum}
            setSelectedAlbum={setSelectedAlbum}
            onConfirm = {() => {handleRequestSavePhoto({setAlbumError, dispatch, navigation, albumId:selectedAlbum, photoLocation:photoLocations[selectedStyle.id]})}}/>

            <Loading isLoading={isLoading}/>

            <View style={tailwind("flex flex-row items-center bg-white px-5 py-4 relative z-20")}>
                <View style={tailwind("w-1/3")}>
                    <TouchableOpacity onPress={() => handlePressBack({setBackModalVisible})}>
                        <Image style={tailwind("w-5 h-5")} source={{uri: "https://image.flaticon.com/icons/png/512/2223/2223615.png"}}></Image>
                    </TouchableOpacity>
                </View>
                <View style={tailwind("w-1/3")}>
                    <Text style={tailwind("text-lg font-medium")}>Effect Page</Text>
                </View>
                <View style={tailwind("flex flex-row w-1/3 justify-end")}>
                    <TouchableOpacity
                    disabled={isDisableSave}
                    onPress={() => {handlePressSavePhoto({setAlbums, setSavePhotoModalVisible, dispatch})}}>
                        <Image style={tailwind("w-5 h-5")} source={{uri: "https://image.flaticon.com/icons/png/512/1828/1828784.png"}}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <ImageBox photoURL={generatedImage[selectedStyle.id]} prevPhotoURL = {generatedImage[prevSelectedStyle.id]}/>
            <ListEffectBoxContainer
                styles={styles}
                originImageAccessURL={originImage.accessURL}
            />
        </View >
    )
}
