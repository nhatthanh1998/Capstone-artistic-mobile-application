import React from 'react'
import { View, Image } from "react-native"

export const ProfilePage = () => {
    return (
        <View>
            <img src="https://image.flaticon.com/icons/png/512/1665/1665586.png" class="w-5 h-5 absolute mr-3 mt-3 right-0" alt="" />
            <div class="flex justify-center">
                <img class="h-56" src="https://ouch-cdn2.icons8.com/aEXyr6nDbNqFUNJdlQbI0pMqVPfcNtkTLbuW22W48ho/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg0/LzBlMzcyMzEwLTRm/MTctNGNjOC05ODM2/LTAxMTMzYmIzMjA4/My5zdmc.png" />
            </div>
            <div class="py-5 px-11">
                <p class="text-2xl font-bold tracking-tight pb-5">Personal Information</p>
                <div class="flex pb-5">
                    <div class="w-1/2 mr-3">
                        <p class="text-sm pb-2 text-gray-700">First Name</p>
                        <input value="Thanh" class="text-base px-3 py-2 border w-full shadow rounded-xl font-normal" />
                    </div>
                    <div class="w-1/2 ml-3">
                        <p class="text-sm pb-2 text-gray-700">Last Name</p>
                        <input value="Trần" class="text-base px-3 py-2 border w-full shadow rounded-xl font-normal" />
                    </div>
                </div>
                <div class="w-full pb-5">
                    <p class="text-sm pb-2 text-gray-700">Email</p>
                    <input value="nhatthanhlolo1@gmail.com" class="text-base px-3 py-2 border w-full shadow font-normal rounded-xl" />
                </div>
                <div class="w-full">
                    <p class="text-sm pb-2 text-gray-700">Date Of Birth</p>
                    <input value="20th Nov 1999" class="text-base px-3 py-2 border w-full shadow rounded-xl font-normal;" />
                </div>
                <div class="mt-9 text-center bg-yellow-300 py-3 shadow-lg rounded-lg">
                    <p class="text-base font-normal">Update your profile</p>
                </div>
            </div>
        </View>
    )
}