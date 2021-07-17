import React, { useState } from 'react'
import { View, Image, TextInput, Text, Keyboard, TouchableOpacity } from "react-native"
import tailwind from 'tailwind-rn'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserProfile } from '../../redux/slicers/user.slicer'
import { handleUploadProfile, showDatePicker, hideDatePicker, handleSelectDate, handleCloseProfilePage, handleChangeFirstName, handleChangeLastName } from './handler'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import { EditProfileSuccessModal } from '../../commons/components/modals/EditProfileSuccessModal'
import { styles } from '../../styles'


export const ProfilePage = ({ navigation }) => {
    const dispatch = useDispatch()
    const userProfile = useSelector(selectUserProfile)
    // Parse data from state
    const { firstName, lastName, email, dateOfBirth } = userProfile

    // State in component
    const [deviceHeight, setDeviceHeight] = useState(0)
    const [updatedFirstName, setUpdatedFirstName] = useState(firstName)
    const [updatedLastName, setUpdatedLastName] = useState(lastName)
    const [updatedDateOfBirth, setUpdatedDateOfBirth] = useState(dateOfBirth)
    const [updatedDateOfBirthText, setUpdatedDateOfBirthText] = useState(moment(updatedDateOfBirth).format('Do MMMM YYYY'))

    const [firstNameError, setFirstNameError] = useState('')
    const [lastNameError, setLastNameError] = useState('')


    const [isDatePickerShow, setDatePickerShow] = useState(false)
    const [showEditProfileSuccessModal, setShowEditProfileSuccessModal] = useState(false)

    return (
        <View style={tailwind("w-full h-full")} onLayout={(event) => {
            setDeviceHeight(event.nativeEvent.layout.height)
        }}>

            <DateTimePickerModal
                minimumDate={new Date(1950, 0, 1)}
                maximumDate={new Date(2009, 11, 31)}
                isVisible={isDatePickerShow}
                mode="date"
                display="spinner"
                onConfirm={date => {
                    handleSelectDate({ date, setDatePickerShow, setUpdatedDateOfBirth, setUpdatedDateOfBirthText })
                }}
                onCancel={() => hideDatePicker({ setDatePickerShow })}
            />

            <View style={{ height: deviceHeight }}>
                <View style={tailwind("px-11 py-14 h-full w-full relative")}>
                    <View style={tailwind("flex justify-center")}>
                        <Image
                            resizeMode="contain"
                            style={tailwind("h-48")} 
                            source={{uri:"https://ouch-cdn2.icons8.com/aEXyr6nDbNqFUNJdlQbI0pMqVPfcNtkTLbuW22W48ho/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTg0/LzBlMzcyMzEwLTRm/MTctNGNjOC05ODM2/LTAxMTMzYmIzMjA4/My5zdmc.png"}} />
                    </View>
                    <TouchableOpacity style={tailwind("absolute right-0 mt-12 mr-5")} onPress={() => handleCloseProfilePage({ navigation })}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/1/1193.png" }}
                            style={tailwind("w-6 h-6")} alt="" />
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl font-bold tracking-tight pb-3")}>Personal Information</Text>
                    <View style={tailwind("flex flex-row")}>
                        <View style={tailwind("w-1/2 pr-3")}>
                            <Text style={tailwind("text-sm pb-2 text-gray-700")}>First Name</Text>
                            <TextInput style={firstNameError ? tailwind("text-base px-3 py-2 border border-red-800 w-full rounded-xl font-normal") :  tailwind("text-base px-3 py-2 border w-full rounded-xl font-normal")}
                                value={updatedFirstName}
                                onChangeText={text => {
                                    handleChangeFirstName({text, setFirstName: setUpdatedFirstName, setFirstNameError})
                                }}
                            />
                            <Text style={tailwind("text-xs mt-2 text-red-700")}>{firstNameError}</Text>
                        </View>
                        <View style={tailwind("w-1/2 pl-3")}>
                            <Text style={tailwind("text-sm pb-2 text-gray-700")}>Last Name</Text>
                            <TextInput style={lastNameError.length > 0 ? tailwind("text-base px-3 py-2 border border-red-800 w-full rounded-xl font-normal") : tailwind("text-base px-3 py-2 border w-full rounded-xl font-normal")}
                                value={updatedLastName}
                                onChangeText={text => {
                                    handleChangeLastName({text, setLastName: setUpdatedLastName, setLastNameError
                                    })
                                }}
                            />
                            <Text style={tailwind("text-xs text-red-700")}>{lastNameError}</Text>
                        </View>
                    </View>
                    <View style={tailwind("w-full pb-3")}>
                        <Text style={tailwind("text-sm pb-2 text-gray-700")}>Email</Text>
                        <TextInput value={email} style={tailwind("text-base px-3 py-2 border border-gray-200 w-full font-normal rounded-xl bg-gray-200 text-black")}
                            value={email}
                            editable={false}
                        />
                    </View>
                    <View style={tailwind("w-full")}>
                        <Text style={tailwind("text-sm pb-2 text-gray-700")}>Date Of Birth</Text>
                        <TextInput style={tailwind("text-base px-3 py-2 border w-full rounded-xl font-normal")}
                            pointerEvents="none"
                            onTouchStart={() => { showDatePicker({ setDatePickerShow }) }}
                            onTouchEnd={() => { Keyboard.dismiss() }}
                            value={updatedDateOfBirthText}
                        />
                    </View>

                    <TouchableOpacity style={{...tailwind("mt-6 bg-yellow-300 py-4 rounded-lg"), ...styles.shadow_2}}
                        onPress={() => {
                            handleUploadProfile({ firstName: updatedFirstName, lastName: updatedLastName, dateOfBirth: updatedDateOfBirth, dispatch, setShowEditProfileSuccessModal, setFirstNameError, setLastNameError })
                        }}
                    >
                        <Text style={tailwind("text-base text-center font-normal")}>Update your profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <EditProfileSuccessModal isVisible={showEditProfileSuccessModal}
                onConfirm={() => setShowEditProfileSuccessModal(false)}
                onHideCallback={() => handleCloseProfilePage({navigation})}
            />
        </View>
    )
}
