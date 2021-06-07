import { uploadProfile } from '../../apis/users'
import moment from 'moment'
export const handleUploadProfile = async ({firstName, lastName, dateOfBirth, setFirstNameError, setLastNameError, setSuccess}) => {
    let isValidated = true

    if(firstName.length == 0) {
        setFirstNameError("firstName is required!")
        isValidated = false
    } 
    if(lastName.length == 0) {
        setLastNameError("lastName is required!")
        isValidated = false
    }

    if(validated == true) {
        const response = await uploadProfile({firstName, lastName, dateOfBirth})
        if(response.status === 200) {
            setSuccess(true)
        }
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