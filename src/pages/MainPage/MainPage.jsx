import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn'
import { handlePressMenu, getGalleryAccessPermission, handlePressCamera, handlePressGallery, getStyles } from './handler'
import { GALLARY_ERROR_MESSAGE, GALLERY_NOT_GRANTED_MESSAGE } from '../../enums/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'
import { MyCarousel } from '../../components/Carousel'
import { selectStyles } from '../../redux/slicers/style.slicer'
import * as _ from 'lodash'

export const MainPage = ({ navigation }) => {

    // Variable
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const styles = useSelector(selectStyles)
    const [showCaseStyles, setShowCaseStyles] = useState([])

    useEffect(() => {
        getGalleryAccessPermission({ currentOS: Platform.OS, setHasGalleryPermission: setHasGalleryPermission })
        getStyles({dispatch})
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
            <Text style={tailwind("ml-5 text-lg text-gray-500 font-thin tracking-wide mt-2")}>Discovery</Text>
            <Text style={tailwind("ml-5 mb-2 mt-1 text-3xl text-gray-900 font-medium uppercase tracking-tight")}>Showcase</Text>


            <MyCarousel data = {_.sampleSize(styles, 5)}/>



            <View style={tailwind("flex flex-row justify-center mt-5")}>
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
            <View style={tailwind("flex flex-row justify-center mt-10")}>
                <TouchableOpacity style={{...tailwind("bg-gray-900 w-32 mx-5 text-sm p-3 rounded-full px-5"), ...styles.shadow_1}}>
                    <Text style={tailwind("font-medium text-center text-white")}>Start transfer</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


// const styles = StyleSheet.create({
//     shadow_1: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.18,
//         shadowRadius: 1.00,

//         elevation: 1,
//     },
//     shadow_4: {
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 9,
//         },
//         shadowOpacity: 0.48,
//         shadowRadius: 11.95,
//         elevation: 18,
//     }
// })