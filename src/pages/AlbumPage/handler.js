import { fetchAlbumPhotos } from '../../apis/photos'
import { setAlbumPhotos } from '../../redux/slicers/albums.slicer'

export const getAlbumPhotos = async ({dispatch}) => {
    const response = await fetchAlbumPhotos({limit: 10, page:0 })
    dispatch(setAlbumPhotos(response))
    return null
}