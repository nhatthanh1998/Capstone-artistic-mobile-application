import React, { useState } from 'react'
import { View, Image, TextInput, Text, TouchableOpacity } from "react-native"
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal'
import { useSelector } from 'react-redux'
import { selectUserProfile } from '../../redux/slicers/user.slicer'
import { handleUploadProfile, showDatePicker, hideDatePicker, handleConfirmDatePicker } from './handler'
import DateTimePickerModal from "react-native-modal-datetime-picker";


export const ProfilePage = () => {
    const userProfile = useSelector(selectUserProfile)
    const {firstName, lastName, email, id, username} = userProfile

    const [deviceHeight, setDeviceHeight] = useState(0)
    const [updatedFirstName, setUpdatedFirstName] = useState(firstName)
    const [updatedLastName, setUpdatedLastName] = useState(lastName)
    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')
    const [success, setSuccess] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    return (
        <View style={tailwind("w-full h-full")} onLayout={(event) => {
            setDeviceHeight(event.nativeEvent.layout.height)
        }}>
            <Modal isVisible={true} hasBackdrop={false} style={tailwind("m-0")}>
                <View style={{height: deviceHeight}}>
                    <Image source={{uri: "https://image.flaticon.com/icons/png/512/1665/1665586.png"}} style={tailwind("w-5 h-5 absolute mr-3 mt-3 right-0 z-10")} alt="" />
                    <View style={tailwind("px-11 py-10")}>
                        <Text style={tailwind("text-2xl font-bold text-center tracking-tight pb-5")}>Personal Information</Text>
                        <View style={tailwind("flex flex-row justify-center")}>
                            <View style={tailwind("w-28 h-28 relative")}>
                                <Image source={{uri: "https://image.flaticon.com/icons/png/512/1782/1782709.png"}} style={tailwind("w-5 h-5 absolute bottom-0 right-0")} />
                                <Image style={tailwind("w-full h-full rounded-full")} source={{uri: "https://i.pinimg.com/564x/c1/13/df/c113df816b94afc3224d925890e290e2.jpg"}} />
                            </View>
                        </View>
                        <Text style={tailwind("pl-2 mt-1 font-thin text-lg text-center pb-5")}>@{username}</Text>
                        <View style={tailwind("flex flex-row pb-5")}>
                            <View style={tailwind("w-1/2 pr-3")}>
                                <Text style={tailwind("text-sm pb-2 text-gray-700")}>First Name</Text>
                                <TextInput style={tailwind("text-base px-3 py-2 border w-full  rounded-xl font-normal")} 
                                value={updatedFirstName}
                                />
                            </View>
                            <View style={tailwind("w-1/2 pl-3")}>
                                <Text style={tailwind("text-sm pb-2 text-gray-700")}>Last Name</Text>
                                <TextInput style={tailwind("text-base px-3 py-2 border w-full rounded-xl font-normal")} 
                                value={updatedLastName}
                                />
                            </View>
                        </View>
                        <View style={tailwind("w-full pb-5")}>
                            <Text style={tailwind("text-sm pb-2 text-gray-700")}>Email</Text>
                            <TextInput value={email} style={tailwind("text-base px-3 py-2 border w-full font-normal rounded-xl")} 
                            value={email}
                            />
                        </View>
                        <View style={tailwind("w-full")}>
                            <Text style={tailwind("text-sm pb-2 text-gray-700")}>Date Of Birth</Text>
                            <TextInput value="20th Nov 1999" style={tailwind("text-base px-3 py-2 border w-full rounded-xl font-normal")} />
                        </View>
                        <TouchableOpacity style={tailwind("mt-9 bg-yellow-300 py-3 rounded-lg")}
                        onPress={() => {
                            handleUploadProfile({firstName, lastName})
                        }}
                        >
                            <Text style={tailwind("text-base text-center font-normal")}>Update your profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
