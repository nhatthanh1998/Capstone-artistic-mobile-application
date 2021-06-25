import { setAlbumMedias, setSelectedAlbum } from '../../redux/slicers/albums.slicer'
import { getAlbumDetail } from '../../apis/albums'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import {ALBUM_LIST_PAGE} from '../../enums/page-name'
import { deleteAlbum } from '../../apis/albums'



export const handleGetAlbumDetail = async ({albumId, dispatch}) => {
    const response = await getAlbumDetail({albumId})
    dispatch(setSelectedAlbum(response))
    dispatch(setAlbumMedias(response.medias))
}

export const handleDeleteAlbum = async ({albumId, dispatch, navigation }) => {
    dispatch(setIsLoading(true))
    const response = await deleteAlbum({albumId})
    dispatch(setIsLoading(false))
    navigation.navigate(ALBUM_LIST_PAGE)
}
