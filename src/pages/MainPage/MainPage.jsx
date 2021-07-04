import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import { handlePressMenu, getGalleryAccessPermission, handlePressCamera, handlePressGallery, getStyles } from './handler'
import { selectUserProfile } from '../../redux/slicers/user.slicer'
import { GALLARY_ERROR_MESSAGE, GALLERY_NOT_GRANTED_MESSAGE } from '../../enums/error-message'
import * as _ from 'lodash'
import {SelectPhotoModal} from '../../commons/components/modals/SelectPhotoModal'
import { CarouselContainer } from '../../containers/MainPage/CarouselContainer'
import {styles} from '../../styles'
import { Loading } from '../../commons/components/Loading/Loading'
import { requestGetNotifications } from '../../apis/notifications'


export const MainPage = ({ navigation }) => {
    // Variable
    const dispatch = useDispatch();
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [showSelectPhotoModal, setShowSelectPhotoModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [numOfNotifications, setNumOfNotifications] = useState(0)
    const [showMenu, setShowMenu] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        Promise.all([
            getStyles({dispatch}),
            getGalleryAccessPermission({ currentOS: Platform.OS, setHasGalleryPermission: setHasGalleryPermission }),
            requestGetNotifications().then(rs => {
                setNumOfNotifications(rs.count)
                setNotifications(rs.data)
            })
        ]).then(_ => {
            setIsLoading(false)
        })
        return () => {}
    }, [])

    // Return ERROR
    if (hasGalleryPermission == null) {
        return (<Text>{GALLARY_ERROR_MESSAGE}</Text>)
    }

    if (hasGalleryPermission == false) {
        return (<Text>{GALLERY_NOT_GRANTED_MESSAGE}</Text>)
    }

    return (
        <View style={tailwind("h-full relative")}>
            <Loading isLoading={isLoading}/>
            <View style={tailwind("flex flex-row items-center mx-5 mt-10 relative z-10")}>
                <View style={tailwind("w-1/3")}>
                    <TouchableOpacity style={{ ...tailwind("flex flex-col w-9 h-9 rounded-xl overflow-hidden justify-center items-center bg-white"), ...styles.shadow_1 }}
                        onPress={() => { handlePressMenu({ navigation }) }}
                    >
                        <Image source={require("../../assets/icons/navigation_icon.png")} style={tailwind("w-5 h-5")} />
                    </TouchableOpacity>
                </View>
                <View style={tailwind("w-2/3 items-end")}>
                    <TouchableOpacity style={tailwind("flex flex-col justify-center items-center")}
                        onPress={() => setShowMenu(!showMenu)}
                    >
                        {
                            numOfNotifications > 0 && (
                                <View style={{...tailwind("absolute top-0 right-0 rounded-full z-20 bg-red-600 w-4 h-4 flex items-center justify-center"), 
                                    transform: [
                                        {translateX: 3}, {translateY: -2}
                                    ]}}
                                >
                                    <Text style={{...tailwind("text-white"), fontSize: 9, ...styles.shadow_1}}>{numOfNotifications}</Text>
                                </View>
                            )
                        }
                        <Image source={require("../../assets/icons/bell.png")} style={tailwind("w-6 h-6 z-10 relative")} />
                    </TouchableOpacity>
                    {
                        showMenu && (
                            <View style={{...tailwind("absolute z-50 mt-8 py-4 px-2 rounded-xl"), ...styles.lighten_2, ...styles.shadow_2}} hide>
                                {
                                    notifications.length === 0 ? <></> : notifications.map((notification) => {
                                        return (
                                            <View style={tailwind("flex flex-row w-full items-center")}>
                                                <Text style={tailwind("text-xs font-thin text-black")}>{notification.message}</Text>
                                            </View>
                                        )
                                    })
                                }
                                
                            </View>
                        )
                    }
                    
                </View>
            </View>
            <Text style={tailwind("ml-5 text-lg text-gray-500 font-thin tracking-wide mt-2")}>Discovery</Text>
            <Text style={tailwind("ml-5 mb-2 mt-1 text-3xl text-gray-900 font-medium uppercase tracking-tight")}>Showcase</Text>

            <CarouselContainer/>

            <View style={tailwind("flex relative z-10 flex-row justify-center mt-10")}>
                <TouchableOpacity onPress={() => setShowSelectPhotoModal(true)} style={{...tailwind("bg-yellow-400 border border-yellow-500 px-7 text-xs py-4 rounded-full"), ...styles.shadow_4}}>
                    <Text style={tailwind("font-medium text-base text-center text-gray-900 ")}>Start transfer</Text>
                </TouchableOpacity>
            </View>
            <SelectPhotoModal
                handlePressCamera={() => handlePressCamera({navigation})}
                handlePressGallery={() => handlePressGallery({navigation, dispatch})}
                onCancel={() => setShowSelectPhotoModal(false)}
                isVisible={showSelectPhotoModal}/>
        </View>
    )
}
