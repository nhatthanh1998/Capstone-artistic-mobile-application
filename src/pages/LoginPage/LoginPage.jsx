import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Image, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import { handleChangePassword, handleChangeEmail, handleClickRegister, handleLogin, handleClickResetPassword, checkIsLoggedIn } from './handler'
import Icon from 'react-native-vector-icons/Feather';
import { Loading } from '../../commons/components/Loading/Loading'
import { selectIsLoading, setIsLoading } from '../../redux/slicers/is-loading.slicer';
import * as Google from 'expo-google-app-auth';
import { styles } from '../../styles';
import { loginWithGoogle } from '../../apis/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'


const signInWithGoogle = async ({ dispatch }) => {
    try {
        dispatch(setIsLoading(true))
        const result = await Google.logInAsync({
            androidClientId: "554326087777-1ns17d7rmsrf77l8m3pg7a25pdpv1ksj.apps.googleusercontent.com",
            scopes: ["profile", "email"]
        })
        if (result.type === 'success') {
            const { idToken } = result
            const { token, statusCode, message } = await loginWithGoogle({ tokenId: idToken })
            if (token) {
                AsyncStorage.setItem('token', token)
                checkIsLoggedIn({dispatch})
                dispatch(setIsLoading(false))
            }
            if(statusCode && message) {
                
            }
            
        } else {
            dispatch(setIsLoading(false))
        }
    } catch (e) {
        console.log("error:", e)
    }
}

export const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)

    const renderPasswordIcon = () => {
        let iconName = "eye-off"
        isShowPassword == true ? iconName = "eye" : iconName = "eye-off"
        return (
            <TouchableOpacity
                style={tailwind("absolute right-0 flex flex-row items-center  w-4 h-4")}
                onPress={() => {
                    setIsShowPassword(!isShowPassword)
                }}
            >
                <Icon name={iconName} style={tailwind("w-full h-full absolute right-0")} size={16} />
            </TouchableOpacity>
        )
    }
    return (
        <View style={tailwind("h-full relative")}>
            <Loading isLoading={isLoading} />
            <View style={tailwind("flex flex-row justify-center mt-5")}>
                <Image
                    style={tailwind("h-64")}
                    resizeMode="contain"
                    source={require('../../assets/illustrations/login.webp')}
                />
            </View>
            <View style={tailwind("px-12 pb-7 mt-3")}>
                <Text style={tailwind("text-4xl font-bold tracking-wide pb-3")}>Login</Text>
                <View style={tailwind("border-b relative flex flex-row items-center")}>
                    <Image source={require('../../assets/icons/user.png')} style={tailwind("absolute w-4 h-4")} />
                    <TextInput placeholder="Email" style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                        onChangeText={text => { handleChangeEmail({ text, setEmail, setEmailError }) }}
                    />
                </View>
                <Text style={tailwind("text-xs text-red-700 mb-4 mt-1")}>
                    {emailError.length > 0 ? emailError : ''}
                </Text>
                <View style={tailwind("border-b relative flex flex-row items-center")}>
                    <Image source={require('../../assets/icons/lock.png')} style={tailwind("absolute w-4 h-4")} />
                    <TextInput placeholder="Password" style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                        secureTextEntry={!isShowPassword}
                        onChangeText={text => { handleChangePassword({ text, setPassword, setPasswordError }) }}
                    />
                    {renderPasswordIcon()}
                </View>
                <Text style={tailwind("text-xs mt-1 mb-5 text-red-700")}>{passwordError.length > 0 ? passwordError : ''}</Text>
                <View style={{ ...tailwind("rounded-xl bg-yellow-300 p-3"), ...styles.shadow_1 }}>
                    <Text style={tailwind("text-lg text-center tracking-wide")}
                        onPress={() => {
                            handleLogin({ email, password, setEmailError, setPasswordError, dispatch, setError })
                        }}
                    >Login</Text>
                </View>
                <Text style={tailwind(`text-xs mt-2 text-red-700 text-center ${error == false ? 'hidden' : ''}`)}>{error == true ? "Email or password is wrong" : null}</Text>
                <Text style={tailwind("text-sm font-thin text-center my-5 text-gray-600")}>Or</Text>
                <View style={tailwind("flex justify-center items-center")}>
                    <TouchableOpacity onPress={() => signInWithGoogle({dispatch})} style={{ ...tailwind("rounded bg-white justify-center flex items-center flex-row py-3 w-52"), ...styles.shadow_1 }}>
                        <Image style={tailwind("w-7 h-7 mr-3")} source={require("../../assets/icons/google.png")}></Image>
                        <Text>Sign in with Google</Text>
                    </TouchableOpacity>
                </View>

            </View>
            <View style={tailwind("flex flex-row justify-center items-end")}>
                <Text style={tailwind("text-center text-sm font-thin text-gray-600")}>
                    Don't have account?
                </Text>
                <Text style={tailwind("ml-1 text-blue-900 font-bold")}
                    onPress={() => handleClickRegister({navigation})}
                >
                    Register now
                </Text>
            </View>

            <View style={tailwind("flex flex-row justify-center items-end mt-2")}>
                <Text style={tailwind("ml-1 text-blue-900 font-bold")}
                    onPress={() => handleClickResetPassword({ navigation })}
                >
                    Reset Your Password
                </Text>
            </View>
        </View>

    )
}
