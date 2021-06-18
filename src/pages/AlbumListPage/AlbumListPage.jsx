import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import React, {useState, useEffect} from 'react'
import { AlbumListItem } from '../../components/AlbumListPage/AlbumListItem'
import { createNewAlbum, fetchAlbums } from '../../apis/albums'
import { MAIN_PAGE } from '../../enums/page-name'
import { styles } from '../../styles'
import { CreateNewAlbumModal } from '../../commons/components/modals/CreateNewAlbumModal'

export const AlbumListPage = ({ navigation }) => {

    const [albums, setAlbums] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        fetchAlbums().then(({data}) => {
            setAlbums(data)
        })
        return () => {}
    }, [])

    const onCreateNewAlbum = (newAlbumName) => {
        createNewAlbum(newAlbumName)
    }

    return (
        <View style={tailwind("relative")}>
            <View style={{ ...tailwind("flex relative z-10 flex-col items-center w-full pt-9") }}>
                <View style={tailwind("flex flex-row items-center mb-5")}>
                    <TouchableOpacity style={tailwind("w-1/3 pl-5")} onPress={() => {
                        navigation.navigate(MAIN_PAGE)
                    }}>
                        <Image style={tailwind("w-5 h-5")} source={{ uri: "https://image.flaticon.com/icons/png/512/3106/3106676.png" }} />
                    </TouchableOpacity>
                    <Text style={tailwind("text-2xl w-1/3 text-gray-800 font-medium tracking-wide text-center")}>Album</Text>
                    <TouchableOpacity onPress={() => setShowModal(true)} style={tailwind("w-1/3 flex flex-row justify-end pr-5")}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/748/748113.png" }} style={tailwind("w-4 h-4")} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {albums.map(album => {
                    return <AlbumListItem album={album} key={album.id} navigation = {navigation}/>
                })}
            </View>
            <CreateNewAlbumModal onCreateNewAlbum={onCreateNewAlbum} isVisible={showModal} onCancel={() => setShowModal(false)}/>
        </View>
    )
}
