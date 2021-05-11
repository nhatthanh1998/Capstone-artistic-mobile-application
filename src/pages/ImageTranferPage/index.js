import React from "react";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { ImageBackground, Text, View, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'
import { CameraIcon } from "./images/CameraIcon";
import { GallaryIcon } from "./images/GallaryIcon";
import tailwind from 'tailwind-rn'
import { MenuIcon } from "./images/MenuIcon";
export const ImageTranferPage = () => {

    const handlePressCamera = () => {

    }


    const handlePressGallery = () => {

    }

    const handlePressMenu = () => {

    }

    return (

        <ImageBackground source = {require('./images/background.jpg')}>
            <Container>
                <View style={tailwind("px-10 py-10")}>
                    <TouchableOpacity>
                        <MenuIcon />
                    </TouchableOpacity>
                </View>


                <View style={tailwind("flex justify-center bg-black absolute bottom-0 w-full flex-row pt-10")}>
                    <View style={tailwind("w-1/2 justify-center flex flex-row")}>

                        <TouchableOpacity onPress={() => { }}>
                            <View style={tailwind("text-center")}>
                                <CameraIcon />
                                <Text style={tailwind("text-white")}>CAMERA</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={tailwind("w-1/2 justify-center flex flex-row")}>
                        <TouchableOpacity onPress={() => { }}>
                            <View style={tailwind("text-center")}>
                                <GallaryIcon />
                                <Text style={tailwind("text-white")}>GALLERY</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container >
        </ImageBackground>
    )
}



const Container = styled.View`
width: ${windowWidth}px;
height: ${windowHeight}px;
background-image: url('./images/background.jpg')
`