import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import React from 'react'
import { handlePressAlbumDetail } from './handler'

export const AlbumListPage = ({ navigation }) => {

    return (
        <View style={tailwind("relative")}>
            <View style={{ ...tailwind("flex relative z-10 flex-col items-center w-full pt-9") }}>
                <View style={tailwind("flex flex-row items-center mb-5")}>
                    <TouchableOpacity style={tailwind("w-1/3 pl-5")}>
                        <Image style={tailwind("w-5 h-5")} source={{ uri: "https://image.flaticon.com/icons/png/512/3106/3106676.png" }} />
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl w-1/3 text-gray-800 font-medium tracking-wide text-center")}>Album</Text>
                    <TouchableOpacity style={tailwind("w-1/3 flex flex-row justify-end pr-5")}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/219/219424.png" }} style={tailwind("w-4 h-4")} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={tailwind("pt-5 mx-5 relative z-10")}>
                <View style={tailwind("relative z-10")}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Press")
                        }}
                        style={tailwind("absolute right-0 z-10 bottom-0")}
                    >
                        <Text style={tailwind("text-xs mr-1 text-red-600")}>
                            View more
                        </Text>
                    </TouchableOpacity>
                    <Text style={tailwind("font-medium text-xl")}>Picnic night</Text>
                    <Text style={tailwind("text-xs mb-3 mt-1 font-thin")}>25 photos</Text>
                </View>
                <View style={tailwind("flex flex-row h-52")}>
                    <View style={tailwind("h-full w-1/2 pr-2 py-1")}>
                        <ImageBackground style={tailwind("h-full w-full rounded-xl")}
                            source={{ uri: "https://i.pinimg.com/564x/43/fe/49/43fe496d6cb4ed20bc0c562363938627.jpg" }}>
                        </ImageBackground>
                    </View>
                    <View style={tailwind("w-1/2")}>
                        <View style={tailwind("h-full flex flex-wrap")}>
                            <View style={tailwind("h-1/2 w-1/2 pr-1 py-1")}>
                                <ImageBackground style={tailwind("h-full w-full rounded-xl overflow-hidden")}
                                    source={{ uri: "https://i.pinimg.com/564x/f9/3b/10/f93b1023d308ecf07cd053c37c91e6f9.jpg" }}>
                                </ImageBackground>
                            </View>
                            <View style={tailwind("h-1/2 w-1/2 pl-1 py-1")}>
                                <ImageBackground style={tailwind("h-full w-full rounded-xl")}
                                    source={{ uri: "https://i.pinimg.com/564x/f9/3b/10/f93b1023d308ecf07cd053c37c91e6f9.jpg" }}>
                                </ImageBackground>
                            </View>
                            <View style={tailwind("h-1/2 w-1/2 pl-1 py-1")}>
                                <ImageBackground style={tailwind("h-full w-full rounded-xl")}
                                    source={{ uri: "https://i.pinimg.com/564x/f9/3b/10/f93b1023d308ecf07cd053c37c91e6f9.jpg" }}>
                                </ImageBackground>
                            </View>
                            <View style={tailwind("h-1/2 w-1/2 pl-1 py-1")}>
                                <ImageBackground style={tailwind("h-full w-full rounded-xl")}
                                    source={{ uri: "https://i.pinimg.com/564x/f9/3b/10/f93b1023d308ecf07cd053c37c91e6f9.jpg" }}>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
