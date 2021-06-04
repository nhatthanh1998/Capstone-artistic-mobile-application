import { logOut } from '../../../redux/slicers/user.slicer'


export const handleSignOut = async ({dispatch}) => {
    dispatch(logOut())
}


export const handleNavigation = ({navigation, pageName}) => {
    navigation.navigate(pageName)
}