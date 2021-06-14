import { getShowCaseAvailableStyles } from '../../apis/showcases'


export const handleGetAvailableStyles = async ({setAvailableStyles}) => {
    const response = await getShowCaseAvailableStyles()
    setAvailableStyles(response)
}