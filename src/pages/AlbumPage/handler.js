import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchAlbumPhotos } from '../../apis/photos'
import { setAlbumPhotos } from '../../redux/slicers/albums.slicer'


export const getAlbumPhotos = async ({dispatch}) => {
    const token = await AsyncStorage.getItem('token')
    const response = await fetchAlbumPhotos({limit: 10, page:0, token })
    dispatch(setAlbumPhotos(response))
    return null
}