import React from "react";
import { Dimensions } from 'react-native';
import { ImageBackground, View, Text } from "react-native";
import tailwind from 'tailwind-rn'
import { StatusBar } from 'react-native';
import { MediaButton } from "../../components/HomePage/MediaButton";
import { NavigationButton } from "../../components/HomePage/NavigationButton";
import { Loading } from "../../components/HomePage/Loading"

import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading, setIsLoading } from "../../redux/slicers/is-loading.slicer"

import {CAMERA_PAGE, HOME_PAGE} from "../../enums/page-name"


const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;


export const HomePage = ({ navigation }) => {
    // Variable
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading)


    // Get permission section
    // status of the permission
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    // function to get Gallary Image Access Permision
    async function getGalleryAccessPermission() {
        if (Platform.OS !== 'web') {
            const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (galleryPermission.status !== 'granted') {
                setHasGalleryPermission(false)
            } else {
                setHasGalleryPermission(true)
            }
        }
    }


    useEffect(() => {
        getGalleryAccessPermission()

    }, [])

    if (hasGalleryPermission == null) {
        return <Text>Something when wrong with Gallery Permission</Text>
    }

    if (hasGalleryPermission == false) {
        return <Text>Must have gallery permission to use our Application</Text>
    }





    // action handler section
    const handlePressCamera = () => {
        navigation.navigate(CAMERA_PAGE)
    }

    const handlePressMenu = () => {

    }

    const handlePressGallery = async () => {
        let photo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!photo.cancelled) {
            dispatch(setIsLoading(true))
            dispatch(setOriginImage({accessURL: photo.uri}))
            const socketID = await AsyncStorage.getItem("socketID")
            uploadImageToServer({imageURI: photo.uri, socketID: socketID})
            navigation.navigate("EffectPage")
        }
        else {
            navigation.navigate(HOME_PAGE)
        }
    }
    return (
        <ImageBackground source={require('../../commons/images/home-page-background/background.jpg')}
         style={{ width: windowWidth, height: windowHeight, marginTop: StatusBar.currentHeight }}>
            <Loading isLoading = {isLoading} loadingText = {"Handling your image....."}/>
            <View style={tailwind("w-full h-full")}>

                {/* navigation button */}
                <NavigationButton iconURL={require("../../commons/images/menu_icon.png")} handlePress={handlePressMenu} />

                {/* media button section */}
                <View style={tailwind("flex justify-center bg-black w-full flex-row bottom-0 absolute py-3")}>
                    <MediaButton iconUrl={require("../../commons/images/camera_icon.png")} mediaName={"CAMERA"} handlePress={handlePressCamera} />
                    <MediaButton iconUrl={require("../../commons/images/gallery_icon.png")} mediaName={"GALLERY"} handlePress={handlePressGallery} />
                </View>
            </View >
        </ImageBackground>
    )
}
