import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import tailwind from 'tailwind-rn'
import Modal from 'react-native-modal';
import { styles } from '../../../../styles';
import { AlbumPicker } from './DropDown'
import { getAlbums } from './handler'
import { useDispatch } from 'react-redux'
import { ALBUM_DETAIL_PAGE } from '../../../../enums/page-name'


export const MoveMediaToAnotherAlbumModal = ({ isVisible, onCancel, onConfirm, media, navigation, setMediaDetailVisible }) => {
    const {albumId, id} = media
    const [isDisableMove, setDisableMove] = useState(true)
    const [albums, setAlbums] = useState([])
    const [selectedAlbum, setSelectedAlbum] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        getAlbums({dispatch}).then(response => {
            const filterAlbums = response.data.filter(album => album.id !== albumId)
            setAlbums(filterAlbums)
            setSelectedAlbum(filterAlbums[0])
        })
    }, [])

    return (
        <View>
            <Modal isVisible={isVisible}
                animationOut="bounceOut"
                animationIn="bounceInUp"
                animationInTiming={350}
                animationOutTiming={150}
                backdropColor="black"
                backdropOpacity={0.7}
            >
                <View style={tailwind("bg-white m-5 rounded-xl p-5 relative")}>
                    <TouchableOpacity onPress={() => onCancel()} style={tailwind("absolute z-10 mt-3 mr-3 top-0 right-0")}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/1/1193.png" }} style={tailwind("w-5 h-5")} />
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl font-bold tracking-tight text-center")}>Move Media</Text>
                    <View style={tailwind("flex flex-row justify-center")}>
                        <Text style={tailwind("text-center mt-1 text-base tracking-wide text-gray-500 mb-3")}>
                            Choose album you want to move your media to
                        </Text>
                    </View>
                    <AlbumPicker
                        albums={albums}
                        selectedAlbum={selectedAlbum}
                        setSelectedAlbum={setSelectedAlbum}
                        setDisableMove={setDisableMove}
                    />
                    <View style={tailwind("flex flex-row relative w-full justify-center items-center z-10")}>
                        <TouchableOpacity 
                        disabled={isDisableMove}
                        onPress={async () => {
                            await onConfirm({mediaId: id, selectedAlbumId: selectedAlbum})
                            onCancel()
                            setMediaDetailVisible(false)
                            navigation.navigate(ALBUM_DETAIL_PAGE, {
                                albumId
                            })
                        }}
                        style={isDisableMove === false ? { ...tailwind("p-3 bg-yellow-300 w-32 rounded-xl mt-4"), ...styles.shadow_2 } : { ...tailwind("p-3 bg-black w-32 rounded-xl mt-4"), ...styles.shadow_2, }}>
                            <Text style={isDisableMove === false ? tailwind("text-center text-sm text-black") : tailwind("text-center text-white")}>Move</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
