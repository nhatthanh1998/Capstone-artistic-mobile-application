import { View, Image, ImageBackground, Text, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import React, {useState, useEffect} from 'react'
import { AlbumListItem } from '../../components/AlbumListPage/AlbumListItem'
import { fetchAlbums } from '../../apis/albums'
import { MAIN_PAGE } from '../../enums/page-name'
import { styles } from '../../styles'

export const AlbumListPage = ({ navigation }) => {

    const [albums, setAlbums] = useState([])
    const [showMenu, setShowMenu] = useState(true)

    useEffect(() => {
        fetchAlbums().then(({data}) => {
            setAlbums(data)
        })
        return () => {}
    }, [])

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
                    <TouchableOpacity style={tailwind("w-1/3 flex flex-row justify-end pr-5")}>
                        <Image source={{ uri: "https://image.flaticon.com/icons/png/512/219/219424.png" }} style={tailwind("w-4 h-4")} />
                    </TouchableOpacity>
                    <View style={{...tailwind("py-4 z-20 absolute right-0 px-6 mt-14 mr-5 rounded-xl"), ...styles.darken_2}} hide>
                        <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => console.log("Press")}>
                            <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/paint.png')}></Image>
                            <Text style={tailwind("text-xs font-thin text-white")}>Transfer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tailwind("flex flex-row w-full items-center py-2")} onPress={() => console.log("Press")}>
                            <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/share.png')}></Image>
                            <Text style={tailwind("text-xs font-thin text-white")}>Share</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                        onPress = {() => {
                            handlePressDownloadButton({accessURL: photo.accessURL, setDownloadSucessModalVisible})
                        }}
                        >
                            <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/download.png')}></Image>
                            <Text style={tailwind("text-xs font-thin text-white")}>Download</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tailwind("flex w-full flex-row items-center py-2")}
                        onPress = {() => {handlePressDeleteButton({setConfirmDeleteModalVisible})}}
                        >
                            <Image style={tailwind("w-3 h-3 mr-6")} source={require('../../assets/icons/delete.png')}></Image>
                            <Text style={tailwind("text-xs font-thin text-white")}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View>
                {albums.map(album => {
                    return <AlbumListItem album={album} key={album.id} navigation = {navigation}/>
                })}
            </View>
        </View>
    )
}
