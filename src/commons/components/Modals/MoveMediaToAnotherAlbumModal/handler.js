import { fetchAlbums } from '../../../../apis/albums'
import {setIsLoading} from '../../../../redux/slicers/is-loading.slicer'


export const getAlbums = async ({dispatch}) => {
    dispatch(setIsLoading(true))
    const response = await fetchAlbums()
    dispatch(setIsLoading(false))
    return response
}