import React from 'react'
import { View, Image } from 'react-native'
import tailwind from 'tailwind-rn'

export const NewMainPage = () => {
    return (
        <View>
            <View style={tailwind("flex items-center mx-5 mt-5")}>
                <View style={tailwind("w-9 h-9 relative mb-4")}>
                    <View style={tailwind("flex w-full h-full rounded-xl overflow-hidden justify-center items-center shadow-lg cursor-pointer")}>
                        <Image source={{uri: "https://image.flaticon.com/icons/png/512/130/130918.png"}} style={tailwind("w-5 h-5")}/>
                    </View>
                </View>
                <View style={tailwind("ml-auto flex items-center")}>
                    <img style={tailwind("w-5 h-5 mr-3")} source={{uri:"https://image.flaticon.com/icons/png/512/481/481770.png"}} />
                    <View style={tailwind("w-12 h-12 relative right ml-auto flex justify-center")}>
                        <View style={tailwind("w-full h-full rounded-full overflow-hidden shadow-lg cursor-pointer")}>
                            <Image source={{uri:"https://i.pinimg.com/originals/c1/13/df/c113df816b94afc3224d925890e290e2.jpg"}}
                            style={tailwind("w-full h-full")} />
                        </View>
                    </View>
                </View>
            </View>
            <p style={tailwind("ml-5 text-xl font-thin tracking-wide mt-8")}>Discovery</p>
            <p style={tailwind("ml-5 mt-1 text-4xl font-medium uppercase")}>Latest Style</p>
            <View style={tailwind("mt-5 flex justify-center")}>
                <View style={tailwind("mr-4")}>
                    <View class="w-12 h-12 relative mb-4">
                        <View style={tailwind("flex w-full h-full rounded-md overflow-hidden justify-center items-center shadow-lg cursor-pointer")}>
                            <Image source={{uri:"https://image.flaticon.com/icons/png/512/2072/2072974.png"}} style={tailwind("w-7 h-7")} />
                        </View>
                    </View>
                    <View class="w-12 h-12 relative mb-4">
                        <View style={tailwind("flex w-full h-full rounded-md overflow-hidden justify-center items-center shadow-lg cursor-pointer")}>
                            <Image source={{uri:"https://image.flaticon.com/icons/png/512/833/833281.png"}}  style={tailwind("w-7 h-7")} />
                        </View>
                    </View>
                    <View class="w-12 h-12 relative mb-4">
                        <View style={tailwind("flex w-full h-full rounded-md overflow-hidden justify-center items-center shadow-lg cursor-pointer")}>
                            <Image source={{uri:"https://image.flaticon.com/icons/png/512/2991/2991195.png"}}  style={tailwind("w-7 h-7")} />
                        </View>
                    </View>
                </View>
                <View class="w-60 h-60 relative mb-4 shadow-xl">
                    <Image source={{uri:"https://media.sanctuarymentalhealth.org/wp-content/uploads/2021/03/04151535/The-Starry-Night.jpg"}} style={tailwind("w-full h-full overflow-hidden rounded-xl")} />
                </View>
            </View>

            <View class="mx-5 mt-10 flex justify-center">
                <View class="w-28 h-28 mx-7 relative mb-4">
                    <View class="flex w-full h-full rounded-2xl overflow-hidden justify-center items-center shadow-lg cursor-pointer">
                        <Image source={{uri:"https://image.flaticon.com/icons/png/512/685/685655.png"}} style={tailwind("w-14 h-14")} />
                    </View>
                </View>
                <View class="w-28 h-28 mx-7 relative mb-4">
                    <View class="flex w-full h-full rounded-2xl overflow-hidden justify-center items-center shadow-lg cursor-pointer">
                        <Image source={{uri:"https://image.flaticon.com/icons/png/512/833/833453.png"}} style={tailwind("w-14 h-14")} />
                    </View>
                </View>
            </View>
        </View>
    )
}