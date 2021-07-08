import { View, Image, ScrollView, Text, TouchableOpacity } from 'react-native'
import tailwind from 'tailwind-rn'
import React, {useState, useEffect} from 'react'
import { AlbumListItem } from '../../components/AlbumListPage/AlbumListItem'
import { createNewAlbum, fetchAlbums } from '../../apis/albums'
import { MAIN_PAGE } from '../../enums/page-name'
import { CreateNewAlbumModal } from '../../commons/components/modals/CreateNewAlbumModal'
import { Loading } from '../../commons/components/Loading/Loading'
import { selectIsLoading, setIsLoading } from '../../redux/slicers/is-loading.slicer'
import { useSelector, useDispatch } from 'react-redux'
import { handleAddAlbumRedux, initAlbums, selectAlbums } from '../../redux/slicers/albumss.slicer'
import Toast from 'react-native-toast-message';


export const AlbumListPage = ({ navigation }) => {
    const dispatch = useDispatch()
    const albums = useSelector(selectAlbums)
    const [headerHeight, setHeaderHeight] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const isLoading = useSelector(selectIsLoading)


    useEffect(() => {
        dispatch(setIsLoading(true))
        fetchAlbums().then(({data}) => {
            dispatch(initAlbums(data))
            dispatch(setIsLoading(false))
        }).catch(error => {
            console.log(error)
            Toast.show({
                text1: "Error",
                text2: error,
                type: 'error',
                position: 'top'
            })
        })
        return () => {}
    }, [])
    
    const onCreateNewAlbum = async (newAlbumName) => {
        dispatch(setIsLoading(true))
        setShowModal(false)
        try {
            const data = await createNewAlbum(newAlbumName)
            dispatch(setIsLoading(false))
            dispatch(handleAddAlbumRedux({newAlbum: {...data, total: 0}}))
        } catch (error) {
            console.log(error)
            Toast.show({
                text1: "Error",
                text2: error,
                type: 'error',
                position: 'top'
            })
        }
        
    }

    return (
        <View style={tailwind("relative h-full")}>
            <Loading isLoading={isLoading}/>
            <View style={{ ...tailwind("flex absolute z-20 flex-col bg-white items-center w-full pt-9")}} onLayout={e => {
                setHeaderHeight(e.nativeEvent.layout.height)
            }}>
                <View style={tailwind("flex flex-row items-center")}>
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
            <ScrollView style={{...tailwind("z-10 relative bg-white")}} contentContainerStyle={{paddingTop: headerHeight}}>
                {Object.keys(albums).map((key, _) => {
                    const album = albums[key]
                    return <AlbumListItem album={album} key={key} navigation = {navigation}/>
                })}
                <View style={tailwind("h-10")}></View>
            </ScrollView>
            <CreateNewAlbumModal onCreateNewAlbum={onCreateNewAlbum} isVisible={showModal} onCancel={() => setShowModal(false)}/>
        </View>
    )
}
