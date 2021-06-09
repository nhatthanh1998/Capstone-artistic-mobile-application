import { fetchAlbumPhotos } from '../../apis/photos'
import { setAlbumPhotos } from '../../redux/slicers/albums.slicer'


export const handleGetAlbumPhotos = async ({dispatch}) => {
    const response = await fetchAlbumPhotos()
    dispatch(setAlbumPhotos(response))
}