import { ALBUM_DETAIL_PAGE, MAIN_PAGE} from '../../enums/page-name'
export const handlePressBack = async ({navigation}) => {
    navigation.navigate(MAIN_PAGE)
}