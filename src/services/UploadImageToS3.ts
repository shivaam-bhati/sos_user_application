import axios from "axios";
import { API_BASE_URL } from "../configurations/API";

export const getProfileObjectUrl = async (key:any) => {
    try {
      const body = { key:key }
      const response = await axios.post(`${API_BASE_URL}/profile/getObjectUrl`,body);
      return response.data.url;
    } catch (error) {
      console.error('Error fetching object URL:', error);
      throw error;
    }
  };

  export const putProfileObjectUrl = async (fileName:string) => {
    try {
      const body = { fileName }
      const response = await axios.post(`${API_BASE_URL}/profile/putObjectUrl`,body);
      return {success:true,message: response};
    } catch (error) {
      console.error('Error fetching object URL:', error);
      throw error;
    }
  };


  export const Upload = async (url:string,imageData:any) => {
    try {

      if(imageData){
        console.log("response>>>",url);
        const formData = new FormData();
        formData.append('image', {
          uri: imageData.uri,
          type: imageData.type,
          name: 'image.jpg',
        });
  
        const upload = await axios.put(url, imageData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if(upload)
        return {success:true,message: upload};
      }
    } catch (error) {
      console.error('Error fetching object URL:', error);
      throw error;
    }
  };