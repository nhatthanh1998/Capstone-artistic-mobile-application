import { uploadProfile } from '../../apis/users'

export const handleUploadProfile = ({firstName, lastName, dateOfBirth, setFirstNameError, setLastNameError, setSuccess}) => {
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

export const showDatePicker = ({setDatePickerVisibility}) => {
    setDatePickerVisibility(true);
  };

export const hideDatePicker = ({setDatePickerVisibility}) => {
    setDatePickerVisibility(false);
  };

export const handleConfirmDatePicker = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };