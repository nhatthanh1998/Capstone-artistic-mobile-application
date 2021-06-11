import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn'
import { handlePressMenu, getGalleryAccessPermission, handlePressCamera, handlePressGallery } from './handler'
import { GALLARY_ERROR_MESSAGE, GALLERY_NOT_GRANTED_MESSAGE } from '../../enums/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'

export const MainPage = ({ navigation }) => {

    // Variable
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)

    useEffect(() => {
        getGalleryAccessPermission({ currentOS: Platform.OS, setHasGalleryPermission: setHasGalleryPermission })
    }, [])

    // Return ERROR
    if (hasGalleryPermission == null) {
        return (<Text>{GALLARY_ERROR_MESSAGE}</Text>)
    }

    if (hasGalleryPermission == false) {
        return (<Text>{GALLERY_NOT_GRANTED_MESSAGE}</Text>)
    }


    return (
        <View>
            <View style={tailwind("flex flex-row items-center mx-5 mt-10")}>
                <View style={tailwind("w-1/3")}>
                    <TouchableOpacity style={{ ...tailwind("flex flex-col w-9 h-9 rounded-xl overflow-hidden justify-center items-center bg-white"), ...styles.shadow_1 }}
                        onPress={() => { handlePressMenu({ navigation }) }}
                    >
                        <Image source={require("../../assets/icons/navigation_icon.png")} style={tailwind("w-5 h-5")} />
                    </TouchableOpacity>
                </View>

                <View style={tailwind("flex flex-row items-center justify-end w-2/3")}>
                    <Image style={tailwind("w-5 h-5 mr-3")} source={{ uri: "https://image.flaticon.com/icons/png/512/481/481770.png" }} />
                    <View style={tailwind("w-12 h-12 relative flex justify-center")}>
                        <View style={{ ...tailwind("w-full h-full rounded-full overflow-hidden"), ...styles.shadow_4 }}>
                            <Image source={{ uri: "https://i.pinimg.com/originals/c1/13/df/c113df816b94afc3224d925890e290e2.jpg" }}
                                style={tailwind("w-full h-full")} />
                        </View>
                    </View>
                </View>
            </View>
            <Text style={tailwind("ml-5 text-xl font-thin tracking-wide mt-4")}>Discovery</Text>
            <Text style={tailwind("ml-5 mt-1 mb-4 text-4xl font-medium uppercase")}>Showcase</Text>


            <View style={tailwind("mb-9 pt-8 flex relative ")}>
                <View style={tailwind("absolute flex flex-row items-center top-0 right-0 mr-5")}>
                    <View style={tailwind("w-1.5 h-1.5 mr-1.5 bg-gray-300 rounded-full")}></View>
                    <View style={tailwind("w-7 h-1.5 mr-1.5 bg-black rounded-full")}></View>
                    <View style={tailwind("w-1.5 h-1.5 mr-1.5 bg-gray-300 rounded-full")}></View>
                    <View style={tailwind("w-1.5 h-1.5 mr-1.5 bg-gray-300 rounded-full")}></View>
                    <View style={tailwind("w-1.5 h-1.5 bg-gray-300 rounded-full")}></View>
                </View>
                <View style={{...tailwind("flex flex-row items-center"), transform:[{translateX: -60}]}}>
                    <ImageBackground style={{...tailwind("w-32 h-52 mr-7 rounded-xl overflow-hidden"), ...styles.shadow_1}} 
                        source={{uri:"https://i.pinimg.com/564x/ac/1c/c0/ac1cc079aae5b2ef34bab68f9cd2e001.jpg"}}
                        />
                    <ImageBackground style={{...tailwind("w-40 h-64 mr-8 rounded-xl overflow-hidden"), ...styles.shadow_1}} source={{uri:"https://i.pinimg.com/564x/fd/58/25/fd58257bfb9c26c879ea86de8951a83c.jpg"}}/>
                    <ImageBackground style={tailwind("w-32 h-52 mr-7 rounded-xl overflow-hidden")} source={{uri:"https://i.pinimg.com/564x/ac/1c/c0/ac1cc079aae5b2ef34bab68f9cd2e001.jpg"}}/>
                </View>
            </View>
            <View style={tailwind("flex flex-row justify-center")}>
                <View style={{...tailwind("w-20 h-20 rounded-md mx-2 overflow-hidden"), ...styles.shadow_1}}>
                    <ImageBackground style={tailwind("w-full h-full")} source={{uri:"https://i.pinimg.com/564x/7f/a0/03/7fa003f3428b434da3a03e32a2c3366a.jpg"}}/>
                </View>
                <View style={{...tailwind("w-20 h-20 rounded-md mx-2 overflow-hidden"), ...styles.shadow_1}}>
                    <ImageBackground style={tailwind("w-full h-full")} source={{uri:"https://i.pinimg.com/564x/17/1c/a9/171ca9d177cb716ea6470fda2dba47ff.jpg"}} />
                </View>
                <View style={{...tailwind("w-20 h-20 rounded-md mx-2 overflow-hidden"), ...styles.shadow_1}}>
                    <ImageBackground style={tailwind("w-full h-full")} source={{uri:"https://i.pinimg.com/564x/54/51/20/54512045ad472b854a35a8cac5d1cd23.jpg"}}/>
                </View>
                <View style={{...tailwind("w-20 h-20 rounded-md mx-2 overflow-hidden"), ...styles.shadow_1}}>
                    <ImageBackground style={tailwind("w-full h-full")} source={{uri:"https://i.pinimg.com/564x/41/1a/df/411adfcc645b789551c08a672ad9fec9.jpg"}} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    shadow_1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    shadow_4: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    }
})