import {MAIN_PAGE} from '../../enums/page-name'
import { deleteAlbum } from '../../apis/albums'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'



export const handlePressBack = async ({navigation}) => {
    navigation.navigate(MAIN_PAGE)
}

export const handleDeleteAlbum = async ({albumId, albums, setAlbums }) => {
    setIsLoading(true)
    const response = await deleteAlbum({albumId})
    const newAlbums = albums.filter(album => {
        album.id !== response
    })
    setAlbums(newAlbums)
    setIsLoading(false)
}