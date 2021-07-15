import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Image, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import AutoScaleImage from 'react-native-scalable-image';
import { handleChangePassword, handleChangeEmail, handleClickRegister, handleLogin, handleClickResetPassword } from './handler'
import Icon from 'react-native-vector-icons/Feather';
import { Loading } from '../../commons/components/Loading/Loading'
import { selectIsLoading } from '../../redux/slicers/is-loading.slicer';

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
        <View style={tailwind("h-full")}>
            <Loading isLoading={isLoading} />
            <View style={tailwind("flex flex-row justify-center mt-5")}>
                <AutoScaleImage
                    width={Dimensions.get('window').width}
                    source={{ uri: "https://ouch-cdn2.icons8.com/_fNVKX7Z_MdTZq4gLEhPfwhjKGtIwbxrDw8p2AgeVVE/rs:fit:1368:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzA3/L2U5M2Y3YmFlLTA0/NmUtNDBjYS04NjMw/LTFmYzliNjZlZjQz/OS5zdmc.png" }}
                />
            </View>
            <View style={tailwind("px-12 pb-7 mt-3")}>
                <Text style={tailwind("text-4xl font-bold tracking-wide pb-3")}>Login</Text>
                <View style={tailwind("border-b relative flex flex-row items-center")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/456/456283.png" }} style={tailwind("absolute w-4 h-4")} />
                    <TextInput placeholder="Email" style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                        onChangeText={text => { handleChangeEmail({ text, setEmail, setEmailError }) }}
                    />
                </View>
                <Text style={tailwind("text-xs text-red-700 mb-4 mt-1")}>
                        {emailError.length > 0 ? emailError : ''}
                </Text>
                <View style={tailwind("border-b relative flex flex-row items-center")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/3064/3064197.png" }} style={tailwind("absolute w-4 h-4")} />
                    <TextInput placeholder="Password" style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                        secureTextEntry={!isShowPassword}
                        onChangeText={text => { handleChangePassword({ text, setPassword, setPasswordError }) }}
                    />
                    {renderPasswordIcon()}
                </View>
                <Text style={tailwind("text-xs mt-1 mb-5 text-red-700")}>{passwordError.length > 0 ? passwordError : ''}</Text>
                <View style={tailwind("rounded-xl bg-yellow-300 p-3 ")}>
                    <Text style={tailwind("text-lg text-center tracking-wide")}
                        onPress={() => {
                            handleLogin({ email, password, setEmailError, setPasswordError, dispatch, setError })
                        }}
                    >Login</Text>
                </View>
                <Text style={tailwind("text-xs mt-2 text-red-700 text-center")}>{error == true ? "Email or password is wrong" : null}</Text>
                <Text style={tailwind("text-sm font-thin text-center my-5 text-gray-600")}>Or, login with ...</Text>
                <View style={tailwind("flex justify-center flex-row")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/2702/2702602.png" }} style={tailwind("h-7 w-7 mx-5")} />
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/174/174848.png" }} style={tailwind("h-7 w-7 mx-5")} />
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/25/25657.png" }} style={tailwind("h-7 w-7 mx-5")} />
                </View>
            </View>
            <View style={tailwind("flex flex-row justify-center items-end")}>
                <Text style={tailwind("text-center text-sm font-thin text-gray-600")}>
                    Don't have account?
                </Text>
                <Text style={tailwind("ml-1 text-blue-900 font-bold")}
                    onPress={() => handleClickRegister({ navigation })}
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
