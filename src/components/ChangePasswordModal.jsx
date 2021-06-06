import React, {useState} from 'react'
import {Text, View, InputText} from 'react-native'
import Modal from 'react-native-modal'
import tailwind from 'tailwind-rn'

export const ChangePasswordModal = (props) => {
    return (
        <View>
            <Modal>
                <View style={tailwind("shadow rounded-lg w-96 py-7 px-7 mt-5 ml-5")}>
                    <Text style={tailwind("text-2xl font-bold text-center tracking-tight pb-5")}>Change Password</Text>
                      <View style={tailwind("w-full pb-5")}>
                        <Text style={tailwind("text-sm pb-2 text-gray-700")}>Old password</Text>
                        <InputText value="" style={tailwind("text-base px-3 py-2 border w-full shadow font-normal rounded-xl")} />
                      </View>
                      <View style={tailwind("w-full pb-5")}>
                        <Text style={tailwind("text-sm pb-2 text-gray-700")}>New password</Text>
                        <InputText value="" style={tailwind("text-base px-3 py-2 border w-full shadow font-normal rounded-xl")} />
                      </View>
                      <View style={tailwind("w-full pb-5")}>
                        <Text style={tailwind("text-sm pb-2 text-gray-700")}>Re enter password</Text>
                        <InputText value="" style={tailwind("text-base px-3 py-2 border w-full shadow font-normal rounded-xl")} />
                      </View>
                      <View style={tailwind("rounded-xl bg-yellow-300 tracking-wide p-3 text-base shadow-lg text-center")}>Change password</View>
                </View>
            </Modal>
        </View>
    )
}