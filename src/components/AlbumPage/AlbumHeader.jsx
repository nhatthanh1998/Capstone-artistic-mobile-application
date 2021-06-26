import React, {useState} from 'react'
import {ImageBackground, View, Image, Text, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import {ConfirmDeleteAlbumModal} from '../../commons/components/modals/ConfirmDeleteAlbumModal'
import { EditAlbumModal } from '../../commons/components/modals/EditAlbumModal'

export const AlbumHeader = ({setHeaderHeight, album, pressBack, handleDeleteAlbum}) => {

    const [showMenu, setShowMenu] = useState(false)
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
    const [showEditAlbumModal, setShowEditAlbumModal] = useState(false)

    if(album) {
        const {count, name, thumbnailURL, isDefault} = album
        return (
            <ImageBackground 
                onLayout={(event) => {
                    setHeaderHeight(event.nativeEvent.layout.height)
                }}
                source={{uri: thumbnailURL}} 
                style={{...tailwind("w-full")}}
            >
                <View style={{...tailwind("flex flex-col items-center w-full pt-9"), ...styles.darken}}>
                    <View style={tailwind("flex flex-row items-center mb-5")}>
                        <TouchableOpacity style={tailwind("w-1/3 pl-5")} onPress={() => pressBack()}>
                            <Image style={tailwind("w-5 h-5")} source={{uri: "https://img.icons8.com/material-outlined/48/ffffff/left.png"}} />
                        </TouchableOpacity>
                        <Text style={tailwind("text-2xl w-1/3 text-white font-medium tracking-wide text-center")}>{name}</Text>
                        <View style={tailwind("w-1/3 relative flex flex-row justify-end pr-5")}>
                            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                                <Image source={{uri: "https://img.icons8.com/android/24/ffffff/more.png"}} style={tailwind("w-4 h-4")} />
                            </TouchableOpacity>
                            {
                                showMenu && (
                                    <View style={{...tailwind("absolute right-5 mt-5 p-4 rounded-xl"), ...styles.darken_2}} hide>
                                        <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => {
                                            setShowMenu(false)
                                            setShowEditAlbumModal(true)
                                        }}>
                                            <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/edit.png')}></Image>
                                            <Text style={tailwind("text-xs font-thin text-white")}>Edit</Text>
                                        </TouchableOpacity>
                                        {isDefault === false ? <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                            onPress={() => {
                                                setShowConfirmDeleteModal(true)
                                                setShowMenu(false)
                                            }}
                                            >
                                                <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/delete.png')}></Image>
                                                <Text style={tailwind("text-xs font-thin text-white")}>Delete</Text>
                                        </TouchableOpacity> : null}
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <View style={{...tailwind("w-20 rounded-full py-3 text-gray-200 mb-20"), ...styles.lighten}}>
                        <Text style={tailwind("text-xs font-thin text-black text-center")}>{count} pictures</Text>
                    </View>
                    <View style={{...styles.bodyRadius, ...tailwind("w-full h-10 rounded-b-none bg-white")}}></View>
                </View>
                <ConfirmDeleteAlbumModal isVisible={showConfirmDeleteModal} onCancel={() => setShowConfirmDeleteModal(false)}
                onConfirm={() => {handleDeleteAlbum()}}
                />
                <EditAlbumModal album={album} isVisible={showEditAlbumModal} onCancel={() => setShowEditAlbumModal(false)}/>
            </ImageBackground>
        )
    }
    return <></>
}
