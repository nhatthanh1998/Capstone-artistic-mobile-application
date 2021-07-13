import React, { useState } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity } from "react-native"
import tailwind from 'tailwind-rn'
import { useDispatch } from 'react-redux'
import { handleCloseChangePasswordModal, handleChangeNewPassword, handleChangeOldPassword, handleChangePassword, handleChangeRePassword } from './handler'
import { EditProfileSuccessModal } from '../../commons/components/modals/EditProfileSuccessModal'
import { styles } from '../../styles'

export const ResetPasswordPage = ({ navigation }) => {
    const dispatch = useDispatch()

    // State in component
    const [deviceHeight, setDeviceHeight] = useState(0)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')
    const [rePasswordError, setRePasswordError] = useState('')

    const [showChangePasswordSuccessModal, setShowChangePasswordSuccessModal] = useState(false)

    return (
        <View style={tailwind("w-full h-full")} onLayout={(event) => {
            setDeviceHeight(event.nativeEvent.layout.height)
        }}>
            <View style={{ height: deviceHeight }}>
                <View style={tailwind("px-11 py-14 h-full w-full relative")}>
                    <View style={tailwind("flex justify-center")}>
                        <Image
                            resizeMode="contain"
                            style={tailwind("h-48")}
                            source={{ uri: "https://ouch-cdn2.icons8.com/aEXyr6nDbNqFUNJdlQbI0pMqVPfcNtkTLbuW22W48ho/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg0/LzBlMzcyMzEwLTRm/MTctNGNjOC05ODM2/LTAxMTMzYmIzMjA4/My5zdmc.png" }} />
                    </View>
                    <TouchableOpacity style={tailwind("absolute right-0 mt-12 mr-5")} onPress={() => handleCloseProfilePage({ navigation })}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/1/1193.png" }}
                            style={tailwind("w-6 h-6")} alt="" />
                    </TouchableOpacity>

                    <Text style={tailwind("text-2xl font-bold tracking-tight pb-3")}>Reset Password</Text>
                    <View style={tailwind("w-full")}>
                        <Text style={tailwind("text-sm pb-2 text-gray-700")}>Email</Text>
                        <TextInput
                            value={oldPassword}
                            style={oldPasswordError ? tailwind("text-base px-3 py-2 border border-red-800 w-full rounded-xl font-normal") : tailwind("text-base px-3 py-2 border w-full rounded-xl font-normal")} 
                            placeholder="Enter email of your account"
                            onChangeText={text => {
                                handleChangeOldPassword({ text, setOldPassword, setOldPasswordError })
                            }}
                        />
                        <Text style={tailwind("text-xs mt-2 text-red-700")}>{oldPasswordError}</Text>
                    </View>
                    <TouchableOpacity style={{ ...tailwind("mt-3 bg-yellow-300 py-4 rounded-lg"), ...styles.shadow_2 }}
                        onPress={async () => {
                            await handleChangePassword({
                                newPassword, oldPassword, rePassword, setNewPasswordError, setOldPasswordError, setRePasswordError, setShowChangePasswordSuccessModal, dispatch
                            })
                        }}
                    >
                        <Text style={tailwind("text-base text-center font-normal")}>Update</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <EditProfileSuccessModal isVisible={showChangePasswordSuccessModal}
                onConfirm={() => setShowChangePasswordSuccessModal(false)}
                onHideCallback={() => handleCloseChangePasswordModal({ navigation })}
            />
        </View>
    )
}
