import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, TextInput, Button } from 'react-native'
import tailwind from 'tailwind-rn'
import { handleChangeText, handleClickRegister, handleLogin } from './handler'


export const LoginPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const dispatch = useDispatch()


    const renderError = () => {
        if(error == true) {
            return <Text>Not valid username or password</Text>
        } else {
            return null
        }
    }


    return (
        <View style={tailwind("flex-1")}>
            <View style={tailwind("bg-white w-10/12 my-10")}>
                <View style={tailwind("py-8 px-8 rounded-xl")}>
                    <Text style={tailwind("font-medium text-2xl mt-3 text-center")}>Login</Text>
                    <View style={tailwind("mt-6")}>
                        <View style={tailwind("my-5 text-sm")}>
                            <Text style={tailwind(" text-black")}>Username</Text>
                            <TextInput style={tailwind("rounded-sm px-4 py-3 mt-3 bg-gray-100 w-full")} placeholder="Username"
                            onChangeText = {text => {
                                handleChangeText({setState: setUsername, text})
                            }}
                            value={username}
                            />
                        </View>
                        <View style={tailwind("my-5 text-sm")}>
                            <Text style={tailwind(" text-black")}>Password</Text>
                            <TextInput style={tailwind("rounded-sm px-4 py-3 mt-3 bg-gray-100 w-full")} placeholder="Password" secureTextEntry={true} 
                            onChangeText = {text => {
                                handleChangeText({setState: setPassword, text})
                            }}
                            />
                        </View>

                        <Button style={tailwind("text-center text-white bg-gray-800 p-3 rounded-sm w-full")} 
                        onPress = {async () => {
                            await handleLogin({username, password, dispatch, setError})
                        }} title = "LOGIN"/>
                        {renderError()}
                        <Text onPress = {() => {
                            handleClickRegister()
                        }}>Register account</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
