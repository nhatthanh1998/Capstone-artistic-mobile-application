import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native'
import tailwind from 'tailwind-rn'
import { handlePressMenu, getGalleryAccessPermission, handlePressCamera, handlePressGallery, getStyles } from './handler'
import { GALLARY_ERROR_MESSAGE, GALLERY_NOT_GRANTED_MESSAGE } from '../../enums/error-message'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'
import * as _ from 'lodash'
import {SelectPhotoModal} from '../../commons/components/modals/SelectPhotoModal'
import { CarouselContainer } from '../../containers/MainPage/CarouselContainer'
import {styles} from '../../styles'
export const MainPage = ({ navigation }) => {

    // Variable
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [showSelectPhotoModal, setShowSelectPhotoModal] = useState(false)
    useEffect(() => {
        getStyles({dispatch})
        getGalleryAccessPermission({ currentOS: Platform.OS, setHasGalleryPermission: setHasGalleryPermission })
        return () => { }
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

            <CarouselContainer/>

            <View style={tailwind("flex flex-row justify-center mt-10")}>
                <TouchableOpacity onPress={() => setShowSelectPhotoModal(true)} style={{...tailwind("bg-yellow-400 border border-yellow-500 px-7 text-xs py-4 rounded-full"), ...styles.shadow_4}}>
                    <Text style={tailwind("font-medium text-base text-center text-gray-900 ")}>Start transfer</Text>
                </TouchableOpacity>
            </View>
            <SelectPhotoModal
                handlePressCamera={() => handlePressCamera({navigation})}
                handlePressGallery={() => handlePressGallery({navigation})}
                onCancel={() => setShowSelectPhotoModal(false)}
                isVisible={showSelectPhotoModal}/>
        </View>
    )
}
