import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import tailwind from 'tailwind-rn'

export const LoginPage = () => {
    return (
        <View style={tailwind("flex-1")}>
            <View style={tailwind("bg-white lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-md")}>
                <View style={tailwind("py-8 px-8 rounded-xl")}>
                    <Text style={tailwind("font-medium text-2xl mt-3 text-center")}>Login</Text>
                    <View style={tailwind("mt-6")}>
                        <View style={tailwind("my-5 text-sm")}>
                            <Text style={tailwind("block text-black")}>Username</Text>
                            <TextInput style={tailwind("rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full")} placeholder="Username" />
                        </View>
                        <View style={tailwind("my-5 text-sm")}>
                            <Text style={tailwind("block text-black")}>Password</Text>
                            <TextInput style={tailwind("rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full")} placeholder="Password" secureTextEntry={true} />
                        </View>

                        <Button style={tailwind("block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full")} 
                        onPress = {() => {
                            console.log("login")
                        }} title = "LOGIN"/>
                    </View>
                </View>
            </View>
        </View>
    )
}