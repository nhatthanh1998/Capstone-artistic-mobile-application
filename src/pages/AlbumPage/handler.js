import { getAlbumDetail } from '../../apis/albums'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import {ALBUM_LIST_PAGE} from '../../enums/page-name'
import { deleteAlbum } from '../../apis/albums'
import { handleDeleteAlbumRedux, setAlbumMedias } from '../../redux/slicers/albumss.slicer'



export const handleGetAlbumDetail = async ({albumId, dispatch}) => {
    dispatch(setIsLoading(true))
    const response = await getAlbumDetail({albumId})
    dispatch(setIsLoading(false))
    dispatch(setAlbumMedias(response))
}

export const handleDeleteAlbum = async ({albumId, dispatch, navigation, setShowConfirmDeleteModal}) => {
    dispatch(setIsLoading(true))
    setShowConfirmDeleteModal(false)
    await deleteAlbum({albumId})
    dispatch(setIsLoading(false))
    dispatch(handleDeleteAlbumRedux({ albumId }))
    navigation.navigate(ALBUM_LIST_PAGE)
}
