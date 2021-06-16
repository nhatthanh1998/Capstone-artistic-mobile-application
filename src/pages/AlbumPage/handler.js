import { setAlbumPhotos, setSelectedAlbum } from '../../redux/slicers/albums.slicer'
import { getAlbumDetail } from '../../apis/albums'


export const handleGetAlbumDetail = async ({albumId, dispatch}) => {
    const response = await getAlbumDetail({albumId})
    console.log("response:", response)
    console.log("photos:", response.photos)

    dispatch(setSelectedAlbum(response))
    dispatch(setAlbumPhotos(response.photos))
}
