import { uploadProfile } from '../../apis/users'
import { setUserProfile } from '../../redux/slicers/user.slicer'
import moment from 'moment'
export const handleUploadProfile = async ({firstName, lastName, dateOfBirth, gender, dispatch, setSuccess}) => {
    let isValidated = true

    // if(firstName.length == 0) {
    //     setFirstNameError("firstName is required!")
    //     isValidated = false
    // } 
    // if(lastName.length == 0) {
    //     setLastNameError("lastName is required!")
    //     isValidated = false
    // }

    if(isValidated == true) {
        const response = await uploadProfile({firstName, lastName, dateOfBirth, gender})
        dispatch(setUserProfile(response))
        setSuccess(true)
    }
}

export const showDatePicker = ({setDatePickerShow}) => {
    setDatePickerShow(true);
  };

export const hideDatePicker = ({setDatePickerShow}) => {
    setDatePickerShow(false);
  };

export const handleSelectDate = ({date, setDatePickerShow, setUpdatedDateOfBirth, setUpdatedDateOfBirthText}) => {
    setUpdatedDateOfBirth(date)
    const dateText = moment(date).format('Do MMMM YYYY')
    setUpdatedDateOfBirthText(dateText)
    setDatePickerShow(false)
};