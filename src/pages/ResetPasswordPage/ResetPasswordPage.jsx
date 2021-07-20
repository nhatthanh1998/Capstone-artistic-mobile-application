import React, { useState } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity } from "react-native"
import {handleResetPassword} from './handler'
import tailwind from 'tailwind-rn'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileSuccessModal } from '../../commons/components/modals/EditProfileSuccessModal'
import { styles } from '../../styles'
import { Loading } from '../../commons/components/Loading/Loading'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'


export const ResetPasswordPage = ({ navigation }) => {
    const dispatch = useDispatch()

    // State in component
    const [deviceHeight, setDeviceHeight] = useState(0)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [showResetPasswordSuccessModal, setShowResetPasswordSuccessModal] = useState(false)
    const isLoading = useSelector(selectIsLoading)
    return (
        <View style={tailwind("w-full h-full")} onLayout={(event) => {
            setDeviceHeight(event.nativeEvent.layout.height)
        }}>
            <Loading isLoading ={isLoading}/>
            <View style={{ height: deviceHeight }}>
                <View style={tailwind("px-11 py-14 h-full w-full relative")}>
                    <View style={tailwind("flex justify-center")}>
                        <Image
                            resizeMode="contain"
                            style={tailwind("h-48")}
                            source={require('../../assets/illustrations/profile.webp')} />
                    </View>
                    <TouchableOpacity style={tailwind("absolute right-0 mt-12 mr-5")} onPress={() => handleCloseProfilePage({ navigation })}>
                        <Image source={require('../../assets/icons/x-square.png')}
                            style={tailwind("w-6 h-6")} alt="" />
                    </TouchableOpacity>

                    <Text style={tailwind("text-2xl font-bold tracking-tight pb-3")}>Reset Password</Text>
                    <View style={tailwind("w-full")}>
                        <Text style={tailwind("text-sm pb-2 text-gray-700")}>Email</Text>
                        <TextInput
                            style={emailError ? tailwind("text-base px-3 py-2 border border-red-800 w-full rounded-xl font-normal") : tailwind("text-base px-3 py-2 border w-full rounded-xl font-normal")} 
                            placeholder="Enter email of your account"
                            onChangeText={text => {
                                setEmail(text)
                            }}
                        />
                        <Text style={tailwind("text-xs mt-2 text-red-700")}>{emailError}</Text>
                    </View>
                    <TouchableOpacity style={{ ...tailwind("mt-3 bg-yellow-300 py-4 rounded-lg"), ...styles.shadow_2 }}
                        onPress={async () => {
                            await handleResetPassword({email, setEmailError, setShowResetPasswordSuccessModal, dispatch})
                        }}
                    >
                        <Text style={tailwind("text-base text-center font-normal")}>Reset Password</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <EditProfileSuccessModal isVisible={showResetPasswordSuccessModal}
                onConfirm={() => setShowChangePasswordSuccessModal(false)}
                onHideCallback={() => handleCloseChangePasswordModal({ navigation })}
            />
        </View>
    )
}
