import React, {useEffect} from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import tailwind from 'tailwind-rn'


export const MainPage = () => {
    return (
        <View>
            <View style={tailwind("flex flex-row items-center mx-5 mt-10")}>
                <View style={tailwind("w-1/3")}>
                    <View style={{ ...tailwind("flex flex-col w-9 h-9 rounded-xl overflow-hidden justify-center items-center bg-white"), ...styles.shadow_1 }}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/130/130918.png" }} style={tailwind("w-5 h-5")} />
                    </View>
                </View>

                <View style={tailwind("flex flex-row items-center justify-end w-2/3")}>
                    <Image style={tailwind("w-5 h-5 mr-3")} source={{ uri: "https://image.flaticon.com/icons/png/512/481/481770.png" }} />
                    <View style={tailwind("w-12 h-12 relative flex justify-center")}>
                        <View style={{ ...tailwind("w-full h-full rounded-full overflow-hidden"), ...styles.shadow_4 }}>
                            <Image source={{ uri: "https://i.pinimg.com/originals/c1/13/df/c113df816b94afc3224d925890e290e2.jpg" }}
                                style={tailwind("w-full h-full")} />
                        </View>
                    </View>
                </View>
            </View>                
            <Text style={tailwind("ml-5 text-xl font-thin tracking-wide mt-8")}>Discovery</Text>
            <Text style={tailwind("ml-5 mt-1 text-4xl font-bold uppercase")}>Latest Style</Text>
            <View style={tailwind("mt-5 flex flex-row justify-center")}>
                <View style={tailwind("mr-3")}>
                    <View style={{ ...tailwind("flex flex-col w-10 h-10 mb-4 rounded-xl overflow-hidden justify-center items-center bg-white"), ...styles.shadow_1 }}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/2072/2072974.png" }} style={tailwind("w-5 h-5")} />
                    </View>
                    <View style={{ ...tailwind("flex flex-col w-10 h-10 mb-4 rounded-xl overflow-hidden justify-center items-center bg-white"), ...styles.shadow_1 }}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/833/833281.png" }} style={tailwind("w-5 h-5")} />
                    </View>
                    <View style={{ ...tailwind("flex flex-col w-10 h-10 mb-4 rounded-xl overflow-hidden justify-center items-center bg-white"), ...styles.shadow_1 }}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/2991/2991195.png" }} style={tailwind("w-5 h-5")} />
                    </View>
                </View>
                <View style={{ ...tailwind("w-60 h-60 relative mb-4 rounded-xl overflow-hidden"), ...styles.shadow_4 }}>
                    <Image source={{ uri: "https://media.sanctuarymentalhealth.org/wp-content/uploads/2021/03/04151535/The-Starry-Night.jpg" }} alt="lovely avatar" style={tailwind("w-full h-full")} />
                </View>
            </View>
            <View style={tailwind("mx-5 mt-10 flex justify-center flex-row")}>
                <View style={tailwind("w-28 h-28 rounded-2xl overflow-hidden justify-center items-center")} style="background-color: #fff   ">
                    <Image source={require("../../commons/images/camera_ico.png")} alt="lovely avatar" style={tailwind("w-28 h-28")} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    shadow_1: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    shadow_4: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
    }
})