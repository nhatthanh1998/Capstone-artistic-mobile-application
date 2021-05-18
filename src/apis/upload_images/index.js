import axios from 'axios'
import { CONFIG } from '../config'
export async function uploadImageToServer(imageUri) {
    const ENDPOINT_URL = `${CONFIG.ENPOINT_URL}/upload-images/upload`
    let formData = new FormData();
    formData.append("image", {uri: imageUri, type: 'image/jpg', name: 'picture.jpg'});
    const response = await axios.post(ENDPOINT_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then((response) => {
        console.log("reactNativeDemo","response get details:"+response);
        return response
     })
     .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
    
      });
    return response.data
}