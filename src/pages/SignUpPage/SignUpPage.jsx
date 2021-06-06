import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { View, Image, Text, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import AutoScaleImage from 'react-native-scalable-image';
import { handleChangeText, handleSignUp, handleChangeRePassword, handlePressLoginPage } from './handler'
import { RegisterSuccessModal } from '../../commons/components/Modals'


export const SignUpPage = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [rePasswordError, setRePasswordError] = useState('')
    const [registerError, setRegisterError] = useState('')
    const [success, setSuccess] = useState(false)

    return (

        <View style={tailwind("relative")}>
            <RegisterSuccessModal isVisible={success} onConfirm={() => handlePressLoginPage({navigation})}/>
            <Image source={{ uri: "https://image.flaticon.com/icons/png/512/860/860790.png" }} style={tailwind("w-5 h-5 mt-9 ml-5 absolute")}></Image>
            <View style={tailwind("flex flex-row justify-center mt-5")}>
                <AutoScaleImage
                    width={Dimensions.get('window').width - 50}
                    source={{ uri: "https://ouch-cdn2.icons8.com/5Hyr0PNJb0Dhxqs7p_oXcWktGBpdf5Vx61dNp4LoZE0/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNjc5/L2M0ZjFlNjM3LTZk/NWYtNGQ2MS1iNDc2/LTM3ZWY4YWNhNmRi/YS5zdmc.png" }}
                />
            </View>
            <View style={tailwind("px-12 pb-7 mt-3")}>
                <Text style={tailwind("text-4xl font-bold tracking-wide pb-3")}>Sign up</Text>
                <View style={tailwind("mb-5 py-2 border-b relative flex flex-row items-center")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/456/456283.png" }} style={tailwind("absolute w-4 h-4")} />
                    <KeyboardAwareScrollView>
                        <TextInput placeholder="Username" style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                            value={username}
                            onChangeText={text => { handleChangeText({ text, setState: setUsername }) }}
                        />
                    </KeyboardAwareScrollView>
                </View>
                <View style={tailwind("mb-5 py-2 border-b relative flex flex-row items-center")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/3064/3064197.png" }} style={tailwind("absolute w-4 h-4")} />
                    <KeyboardAwareScrollView>
                        <TextInput placeholder="Password" secureTextEntry={true} style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                            value={password}
                            onChangeText={text => { handleChangeText({ text, setState: setPassword }) }}
                        />
                    </KeyboardAwareScrollView>
                </View>
                <View style={tailwind("mb-5 py-2 border-b relative flex flex-row items-center")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/3064/3064197.png" }} style={tailwind("absolute w-4 h-4")} />
                    <KeyboardAwareScrollView>
                        <TextInput placeholder="Re enter password" secureTextEntry={true} style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}
                            value={rePassword}
                            onChangeText={text => { handleChangeRePassword({ text, password, setRePassword, setRePasswordError }) }}

                        />
                    </KeyboardAwareScrollView>
                </View>
                <TouchableOpacity style={tailwind("rounded-xl bg-yellow-300 p-3 ")}
                    onPress={() => { handleSignUp({ username, password, rePassword, setPasswordError, setRePasswordError, setRegisterError, setSuccess, setUsernameError }) }}
                >
                    <Text style={tailwind("text-lg text-center tracking-wide")}>Register</Text>
                </TouchableOpacity>
                <Text style={tailwind("text-sm font-thin text-center my-5 text-gray-600")}>Or, login with ...</Text>
                <View style={tailwind("flex justify-center flex-row")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/2702/2702602.png" }} style={tailwind("h-7 w-7 mx-5")} />
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/174/174848.png" }} style={tailwind("h-7 w-7 mx-5")} />
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/25/25657.png" }} style={tailwind("h-7 w-7 mx-5")} />
                </View>
                <View style={tailwind("flex flex-row justify-center items-end")}>
                    <Text style={tailwind("text-center text-sm font-thin text-gray-600")}>
                        Already have an account?
                </Text>
                    <Text style={tailwind("ml-1 text-blue-900 font-bold")}
                        onPress={() => handlePressLoginPage({ navigation })}
                    >
                        Sign in here
                </Text>
                </View>
            </View>
        </View>
    )
}
