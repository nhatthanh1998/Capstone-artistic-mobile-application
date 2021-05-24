import React from "react";
import { Dimensions } from 'react-native';
import { ImageBackground, View, Text } from "react-native";
import tailwind from 'tailwind-rn'
import { StatusBar } from 'react-native';
import { MediaButton } from "../../components/HomePage/MediaButton";
import { NavigationButton } from "../../components/HomePage/NavigationButton";
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { setSocket, selectSocketID } from '../../redux/slicers/socket.slicer'
import { socket } from '../../services/socket.service'
import { useDispatch, useSelector } from 'react-redux'

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;


export const HomePage = ({ navigation }) => {
    const dispatch = useDispatch();
    const socketID = useSelector(selectSocketID)

    // Get permission section
    // status of the permission
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [hasCameraPermission, setHasCameraPermission] = useState(false)
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
    // function to get Camera Acess Permission

    async function getCameraAccessPermission() {
    }


    // init socketID when socket connected to the server
    async function initSocket() {
        socket.on('connection', data => {
            const {socketID} = data
            dispatch(setSocket({socketID}))
        })
    }

    useEffect(() => {
        getGalleryAccessPermission()
        initSocket()
    }, [])

    if (hasGalleryPermission == null) {
        return <Text>Something when wrong with Gallery Permission</Text>
    }

    if (hasGalleryPermission == false) {
        return <Text>Must have gallery and camera permission to use our Application</Text>
    }

    



    // action handler section
    const handlePressCamera = () => {
        navigation.navigate('CameraPage')
    }

    const handlePressMenu = () => {

    }

    const handlePressGallery = async () => {
        let pictureData = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!pictureData.cancelled) {
            navigation.navigate("EffectPage", {
                pictureUri: pictureData.uri
            })
        }
        else {
            navigation.navigate("HomePage")
        }
    }

    console.log(socketID)
    return (
        <ImageBackground source={require('./images/background.jpg')} style={{ width: windowWidth, height: windowHeight, marginTop: StatusBar.currentHeight }}>
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
