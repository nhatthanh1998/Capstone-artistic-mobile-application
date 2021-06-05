import React from 'react'
import { View, Image, Text, TextInput, Dimensions } from 'react-native'
import tailwind from 'tailwind-rn'
import AutoScaleImage from 'react-native-scalable-image';


export const LoginPage = () => {

    return (
        <View>
            <View style={tailwind("flex flex-row justify-center mt-5")}>
                <AutoScaleImage
                    width={Dimensions.get('window').width}
                    source={{ uri: "https://ouch-cdn2.icons8.com/_fNVKX7Z_MdTZq4gLEhPfwhjKGtIwbxrDw8p2AgeVVE/rs:fit:1368:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMzA3/L2U5M2Y3YmFlLTA0/NmUtNDBjYS04NjMw/LTFmYzliNjZlZjQz/OS5zdmc.png" }}
                />
            </View>
            <View style={tailwind("px-12 pb-7 mt-3")}>
                <Text style={tailwind("text-4xl font-bold tracking-wide pb-3")}>Login</Text>
                <View style={tailwind("mb-5 py-2 border-b relative flex flex-row items-center")}>
                    <Image source={{uri:"https://image.flaticon.com/icons/png/512/456/456283.png"}} style={tailwind("absolute w-4 h-4")} />
                    <TextInput placeholder="Username" style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}/>
                </View>
                <View style={tailwind("mb-5 py-2 border-b relative flex flex-row items-center")}>
                    <Image source={{uri:"https://image.flaticon.com/icons/png/512/3064/3064197.png"}} style={tailwind("absolute w-4 h-4")} />
                    <TextInput placeholder="Password" secureTextEntry={true} style={tailwind("text-gray-800 font-thin w-full pl-7 text-base tracking-wide")}/>
                </View>
                <View style={tailwind("rounded-xl bg-yellow-300 p-3 ")}>
                    <Text style={tailwind("text-lg text-center tracking-wide")}>Login</Text>
                </View>
                <Text style={tailwind("text-sm font-thin text-center my-5 text-gray-600")}>Or, login with ...</Text>
                <View style={tailwind("flex justify-center flex-row")}>
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/2702/2702602.png" }} style={tailwind("h-7 w-7 mx-5")} />
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/174/174848.png" }} style={tailwind("h-7 w-7 mx-5")} />
                    <Image source={{ uri: "https://image.flaticon.com/icons/png/512/25/25657.png" }} style={tailwind("h-7 w-7 mx-5")} />
                </View>
            </View>
            <View style={tailwind("flex flex-row justify-center items-end")}>
                <Text style={tailwind("text-center text-sm font-thin text-gray-600")}>
                    New commer?
                </Text>
                <Text style={tailwind("ml-1 text-blue-900 font-bold")}>
                    Register now
                </Text>
            </View>
        </View>

    )
}