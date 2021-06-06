import React,  { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import tailwind from 'tailwind-rn';
import { ImageBackground, View, Text } from "react-native";
import { StatusBar } from 'react-native';
import { MediaButton } from '../../components/HomePage/MediaButton';
import { NavigationButton } from '../../components/HomePage/NavigationButton';
import { Loading } from '../../components/HomePage/Loading';

import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading } from "../../redux/slicers/is-loading.slicer"

import { UPLOAD_PHOTO_LOADING_MESSAGE } from '../../enums/loading-message'
import {GALLARY_ERROR_MESSAGE, GALLERY_NOT_GRANTED_MESSAGE} from '../../enums/error-message'

import { getGalleryAccessPermission, handlePressCamera, handlePressGallery, handlePressMenu } from './handler'



const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;


export const HomePage = ({ navigation }) => {
    // Variable
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    useEffect(() => {
        getGalleryAccessPermission({currentOS: Platform.OS, setHasGalleryPermission: setHasGalleryPermission})
    }, [])

    if (hasGalleryPermission == null) {
        return (<Text>{GALLARY_ERROR_MESSAGE}</Text>)
    }

    if (hasGalleryPermission == false) {
        return (<Text>{GALLERY_NOT_GRANTED_MESSAGE}</Text>)
    }

    return (
        <ImageBackground source={require('../../commons/images/home-page-background/background.jpg')}
         style={{ width: windowWidth, height: windowHeight, marginTop: StatusBar.currentHeight }}>
             <StatusBar
            hidden={true} />
            <Loading isLoading = {isLoading} loadingText = {UPLOAD_PHOTO_LOADING_MESSAGE}/>

            <View style={tailwind("w-full h-full")}>
                {/* navigation button */}
                <NavigationButton iconURL={require("../../commons/images/menu_icon.png")} handlePress={() => handlePressMenu()} />

                {/* media button section */}
                <View style={tailwind("flex justify-center bg-black w-full flex-row bottom-0 absolute py-3")}>
                    <MediaButton iconUrl={require("../../commons/images/camera_icon.png")} mediaName={"CAMERA"} handlePress={() => handlePressCamera({navigation})} />
                    <MediaButton iconUrl={require("../../commons/images/gallery_icon.png")} mediaName={"GALLERY"} handlePress={() => handlePressGallery({navigation, dispatch})} />
                </View>
                
            </View >
        </ImageBackground>
    )
}
