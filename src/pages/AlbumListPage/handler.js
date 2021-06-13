import { ALBUM_DETAIL_PAGE } from '../../enums/page-name'


export const handlePressAlbumDetail = async ({id, navigation}) => {
    navigation.navigate(ALBUM_DETAIL_PAGE)
}