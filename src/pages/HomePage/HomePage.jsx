import React from "react";
import { Dimensions } from 'react-native';
import { ImageBackground, Text, View, TouchableOpacity, Image } from "react-native";
import tailwind from 'tailwind-rn'
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;
import {StatusBar} from 'react-native';

export const HomePage = ({navigation }) => {

    const handlePressCamera = () => {
        navigation.navigate('CameraPage')
    }


    const handlePressGallery = () => {
        navigation.navigate('GalleryPage')
    }

    const handlePressMenu = () => {

    }

    return (

        <ImageBackground source = {require('./images/background.jpg')} style = {{width: windowWidth, height: windowHeight, marginTop: StatusBar.currentHeight}}>
            <View style ={tailwind("w-full h-full")}>
                <View style={tailwind("px-5 py-10")}>
                    <TouchableOpacity>
                        <Image source = {require("../../commons/images/menu_icon.png")} style = {tailwind("w-7 h-7")} />
                    </TouchableOpacity>
                </View>


                <View style={tailwind("flex justify-center bg-black w-full flex-row bottom-0 absolute py-3")}>
                    <View style={tailwind("w-1/2 justify-center flex flex-row ")}>

                        <TouchableOpacity onPress={() => {handlePressCamera()}}>
                            <View>
                            <Image source ={require("../../commons/images/camera_icon.png")} style ={tailwind("w-20 h-20")}/>
                            <Text style={tailwind("text-white w-full text-center")}>CAMERA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={tailwind("w-1/2 justify-center flex flex-row ")}>

                        <TouchableOpacity onPress={() => { console.log("Click") }}>
                            <View>
                            <Image source ={require("../../commons/images/gallery_icon.png")} style ={tailwind("w-20 h-20")}/>
                            <Text style={tailwind("text-white w-full text-center")}>GALLERY</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </ImageBackground>
    )
}


