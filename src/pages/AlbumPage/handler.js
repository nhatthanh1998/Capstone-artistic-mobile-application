import { getAlbumDetail } from '../../apis/albums'
import {setIsLoading} from '../../redux/slicers/is-loading.slicer'
import {ALBUM_LIST_PAGE} from '../../enums/page-name'
import { deleteAlbum } from '../../apis/albums'
import { handleDeleteAlbumRedux, setAlbumMedias } from '../../redux/slicers/albumss.slicer'
import Toast from 'react-native-toast-message';


export const handleGetAlbumDetail = ({albumId, dispatch}) => {
    dispatch(setIsLoading(true))
    getAlbumDetail({albumId}).then(response => {
        dispatch(setIsLoading(false))
        dispatch(setAlbumMedias(response))
    }).catch(error => {
        console.log(error)
        Toast.show({
            text1: "Error",
            text2: error,
            type: 'error',
            position: 'top'
        })
    })
}

export const handleDeleteAlbum = ({albumId, dispatch, navigation, setShowConfirmDeleteModal}) => {
    dispatch(setIsLoading(true))
    setShowConfirmDeleteModal(false)
    deleteAlbum({albumId}).then(rs => {
        dispatch(setIsLoading(false))
        dispatch(handleDeleteAlbumRedux({ albumId }))
        navigation.navigate(ALBUM_LIST_PAGE)
    }).catch(error => {
        console.log(error)
        Toast.show({
            text1: "Error",
            text2: error,
            type: 'error',
            position: 'top'
        })
    })
    
}
