import { setAlbumMedias, setSelectedAlbum } from '../../redux/slicers/albums.slicer'
import { getAlbumDetail } from '../../apis/albums'


export const handleGetAlbumDetail = async ({albumId, dispatch}) => {
    const response = await getAlbumDetail({albumId})
    dispatch(setSelectedAlbum(response))
    dispatch(setAlbumMedias(response.medias))
}
