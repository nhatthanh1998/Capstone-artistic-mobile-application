import { getAlbumDetail } from '../../apis/albums'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import {ALBUM_LIST_PAGE} from '../../enums/page-name'
import { deleteAlbum } from '../../apis/albums'
import { handleDeleteAlbumRedux, setAlbumMedias } from '../../redux/slicers/albumss.slicer'



export const handleGetAlbumDetail = async ({albumId, dispatch}) => {
    const response = await getAlbumDetail({albumId})
    dispatch(setAlbumMedias(response))
}

export const handleDeleteAlbum = async ({albumId, dispatch, navigation }) => {
    dispatch(setIsLoading(true))
    await deleteAlbum({albumId})
    dispatch(setIsLoading(false))
    dispatch(handleDeleteAlbumRedux({ albumId }))
    navigation.navigate(ALBUM_LIST_PAGE)
}
