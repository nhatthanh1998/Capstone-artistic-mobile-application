import { setToken } from '../../redux/slicers/user.slicer'
import { login } from '../../apis/auth'
import { REGISTER_PAGE } from '../../enums/page-name'
export const handleChangeText = ({text, setState}) => {
    setState(text)
}

export const handleLogin = async ({username, password, dispatch, setError}) => {
    const response = await login({username, password})
    const { token, error } = response
    if(error == true) {
        setError(true)
    } else {
        setError(false)
        dispatch(setToken({token}))
    }
}


export const handleClickRegister = ({navigation}) => {
    navigation.navigate(REGISTER_PAGE)
}