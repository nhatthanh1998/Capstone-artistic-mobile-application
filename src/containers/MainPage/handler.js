import { getShowCaseAvailableStyles } from '../../apis/showcases'
import Toast from 'react-native-toast-message';



export const handleGetAvailableStyles = async ({setAvailableStyles}) => {
    const {data, message, statusCode} = await getShowCaseAvailableStyles()
    if(message, statusCode) {
        Toast.show({
            text1: "Error",
            text2: message,
            type: 'error',
            position: 'top'
        })
    } else {
        setAvailableStyles(data)
    }
}