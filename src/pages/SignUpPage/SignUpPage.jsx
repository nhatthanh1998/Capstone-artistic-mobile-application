import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Image, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import { handleChangeText, handleSignUp, handleChangeRePassword } from './handler'
import { RegisterSuccessModal } from '../../commons/components/modals/RegisterSuccessModal'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer'
import { Loading } from '../../commons/components/Loading/Loading'
import { LOGIN_PAGE } from '../../enums/page-name'


export const SignUpPage = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading)

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [rePasswordError, setRePasswordError] = useState('')
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    return (
        <KeyboardAwareScrollView>
        <View style={tailwind("relative flex")}>
            <Loading isLoading={isLoading}/>
            <RegisterSuccessModal isVisible={showSuccessModal} onConfirm={() => {
                setShowSuccessModal(false)
                navigation.navigate(LOGIN_PAGE)
            }}/>
            <TouchableOpacity style={tailwind("w-7 h-7 mt-9 ml-5 absolute z-50")} onPress={() => {
                setShowSuccessModal(false)
                navigation.navigate(LOGIN_PAGE)
            }}>
                <Image source={require('../../assets/icons/left_arrow_black.png')} style={tailwind("w-5 h-5")}></Image>
            </TouchableOpacity>
            
            <View style={tailwind("flex flex-row justify-center mt-5")}>
                <Image
                    style={tailwind("h-64")}
                    resizeMode="contain"
                    source={require('../../assets/illustrations/register.webp')}
                />
            </View>
            <View style={tailwind("px-12 pb-7 mt-3")}>
                <Text style={tailwind("text-4xl font-bold tracking-wide pb-3")}>Sign up</Text>
                <View style={tailwind("mb-5")}>
                    <View style={emailError.length > 0 ? tailwind("py-2 border-b relative flex flex-row items-center border-red-800"): tailwind("py-2 border-b relative flex flex-row items-center")}>
                        <Image source={require('../../assets/icons/user.png')} style={tailwind("absolute w-4 h-4")} />
                            <TextInput placeholder="Email" style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                                value={email}
                                onChangeText={text => { handleChangeText({ text, setState: setEmail }) }}
                            />
                    </View>
                    <Text style={tailwind("text-xs mt-2 text-red-700")}>{emailError}</Text>
                </View>
                <View style={tailwind("mb-5")}>
                    <View style={passwordError.length > 0 ? tailwind("py-2 border-b relative flex flex-row items-center border-red-800") :  tailwind("py-2 border-b relative flex flex-row items-center")}>
                        <Image source={require('../../assets/icons/lock.png')} style={tailwind("absolute w-4 h-4")} />
                            <TextInput placeholder="Password" secureTextEntry={true} style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                                value={password}
                                onChangeText={text => { handleChangeText({ text, setState: setPassword }) }}
                            />
                    </View>
                    <Text style={tailwind("text-xs mt-2 text-red-700")}>{passwordError}</Text>
                </View>
                <View style={tailwind("mb-5")}>
                    <View style={rePasswordError.length > 0 ? tailwind("py-2 border-b relative flex flex-row items-center border-red-800") : tailwind("py-2 border-b relative flex flex-row items-center")}>
                        <Image source={require('../../assets/icons/lock.png')} style={tailwind("absolute w-4 h-4")} />
                            <TextInput placeholder="Re enter password" secureTextEntry={true} style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                                value={rePassword}
                                onChangeText={text => { handleChangeRePassword({ text, password, setRePassword, setRePasswordError }) }}

                            />
                    </View>
                    <Text style={tailwind("text-xs mt-2 text-red-700")}>{rePasswordError}</Text>
                </View>

                <TouchableOpacity style={tailwind("rounded-xl bg-yellow-300 p-3 ")}
                    onPress={() => { 
                        handleSignUp({ email, password, rePassword, setPasswordError, setRePasswordError, setShowSuccessModal, setEmailError, dispatch }) 
                    }}
                >
                    <Text style={tailwind("text-lg text-center tracking-wide")}>Register</Text>
                </TouchableOpacity>
                <View style={tailwind("flex flex-row justify-center mt-5 items-end")}>
                    <Text style={tailwind("text-center text-sm font-thin text-gray-600")}>
                        Already have an account?
                </Text>
                    <Text style={tailwind("ml-1 text-blue-900 font-bold")}
                        onPress={() => navigation.navigate(LOGIN_PAGE)}
                    >
                        Sign in here
                </Text>
                </View>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}
