import React, {useState} from 'react'
import {ImageBackground, View, Image, Text, TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn'
import { styles } from '../../styles'
import {ConfirmDeleteAlbumModal} from '../../commons/components/modals/ConfirmDeleteAlbumModal'
import { EditAlbumModal } from '../../commons/components/modals/EditAlbumModal'
import * as ImagePicker from 'expo-image-picker';
import { uploadMedia } from '../../apis/photos'
import { setIsLoading } from '../../redux/slicers/is-loading.slicer'
import { addMedia } from '../../redux/slicers/albumss.slicer'

export const AlbumHeader = ({setHeaderHeight, album, pressBack, navigation, dispatch, handleDeleteAlbum}) => {

    const [showMenu, setShowMenu] = useState(false)
    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false)
    const [showEditAlbumModal, setShowEditAlbumModal] = useState(false)

    const handlePressAddItem = async ({albumId}) => {
        let media = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
    
        if (!media.cancelled) {
            dispatch(setIsLoading(true))
            const mediaURI = media.uri
            const {data} = await uploadMedia({uri: mediaURI, albumId })
            dispatch(addMedia({media: data, albumId}))
            dispatch(setIsLoading(false))
        }
    }

    
    if(album) {
        const {total, name, thumbnailURL, isDefault, id} = album
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
                        <TouchableOpacity style={tailwind("w-1/6 pl-5")} onPress={() => pressBack()}>
                            <Image style={tailwind("w-5 h-5")} source={{uri: "https://img.icons8.com/material-outlined/48/ffffff/left.png"}} />
                        </TouchableOpacity>
                        <Text style={tailwind("text-2xl w-2/3 text-white font-medium tracking-wide text-center")}>{name}</Text>
                        <View style={tailwind("w-1/6 relative flex flex-row justify-end pr-5")}>
                            <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
                                <Image source={{uri: "https://img.icons8.com/android/24/ffffff/more.png"}} style={tailwind("w-4 h-4")} />
                            </TouchableOpacity>
                            {
                                showMenu && (
                                    <View style={{...tailwind("absolute right-5 mt-5 p-4 rounded-xl"), ...styles.darken_2}} hide>
                                        <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => {
                                            setShowMenu(false)
                                            handlePressAddItem({dispatch, albumId: id})
                                        }}>
                                            <Image style={tailwind("w-3 h-3 mr-4")} source={require('../../assets/icons/add.png')}></Image>
                                            <Text style={tailwind("text-xs font-thin text-white")}>Add item</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => {
                                            setShowMenu(false)
                                            setShowEditAlbumModal(true)
                                        }}>
                                            <Image style={tailwind("w-3 h-3 mr-4")} source={require('../../assets/icons/edit.png')}></Image>
                                            <Text style={tailwind("text-xs font-thin text-white")}>Edit</Text>
                                        </TouchableOpacity>
                                        {isDefault === false ? <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                                            onPress={() => {
                                                setShowConfirmDeleteModal(true)
                                                setShowMenu(false)
                                            }}
                                            >
                                                <Image style={tailwind("w-3 h-3 mr-4")} source={require('../../assets/icons/delete.png')}></Image>
                                                <Text style={tailwind("text-xs font-thin text-white")}>Delete</Text>
                                        </TouchableOpacity> : null}
                                    </View>
                                )
                            }
                        </View>
                    </View>
                    <View style={{...tailwind("w-20 rounded-full py-3 text-gray-200 mb-20"), ...styles.lighten}}>
                        <Text style={tailwind("text-xs font-thin text-black text-center")}>{total} items</Text>
                    </View>
                    <View style={{...styles.bodyRadius, ...tailwind("w-full h-10 rounded-b-none bg-white")}}></View>
                </View>
                <ConfirmDeleteAlbumModal isVisible={showConfirmDeleteModal} onCancel={() => setShowConfirmDeleteModal(false)}
                    onConfirm={() => {handleDeleteAlbum({albumId: album.id, dispatch, navigation, setShowConfirmDeleteModal})}}
                />
                <EditAlbumModal album={album} isVisible={showEditAlbumModal} onCancel={() => setShowEditAlbumModal(false)}/>
            </ImageBackground>
        )
    }
    return <></>
}
