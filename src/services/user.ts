import { API_BASE_URL } from "../configurations/API";
import useAsyncStorage from '../hooks/localStorage';
import useToast from "../hooks/useToast";

const {setItem,getItem}= useAsyncStorage();

const {showToastWithGravity} = useToast();

const UserApiService = {

  login: async (body:any) => {
    console.log("body>>>",body)
    console.log("API_BASE_URL>>>",API_BASE_URL)
    try {
      const response = await fetch(`${API_BASE_URL}/loginUser`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      showToastWithGravity(data.message || 'Something went wrong');
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      const token = response.headers.get('authorizationtoken');
      setItem('sos_jwt_loging_token',token); // Store the token in localStorage
      return data;
    } catch (error:any) {
      console.error('ApiService Error:', error);
      showToastWithGravity(error.message || 'Something went wrong, ApiService Error');
      throw error;
    }
  },

    create: async (body:any) => {
        console.log("body>>>",body)
        try {
          const response = await fetch(`${API_BASE_URL}/createUser`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          console.log("response>>>",response)
          const data = await response.json();
          showToastWithGravity(data.message || 'Something went wrong')
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
          }

          
     const token = response.headers.get('authorizationtoken');
      setItem('sos_jwt_loging_token',token); // Store the token in localStorage
          return data;
        } catch (error:any) {
          console.error('ApiService Error:', error);
          showToastWithGravity(error.message || 'Something went wrong, ApiService Error');
          throw error;
        }
      },

      update: async (userId:string,body:any) => {
        try {
          const token:any = await getItem('sos_jwt_loging_token');
          console.log("userId:string,body:any>>>",userId,body)
          console.log("token>>>",token)
          const response = await fetch(`${API_BASE_URL}/updateUser/${userId}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'authorizationtoken': token
            },
            body: JSON.stringify(body),
          });
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
          }
    
          return data;
        } catch (error:any) {
          console.error('ApiService Error:', error);
          throw error;
        }
      },


      get: async (userId:string) => {
        try {
          const token:any = await getItem('sos_jwt_loging_token');
          const response = await fetch(`${API_BASE_URL}/getUser/${userId}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorizationtoken': token
            },
          });
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
          }
    
          return data;
        } catch (error:any) {
          console.error('ApiService Error:', error);
          throw error;
        }
      },

      findUserByField: async (fieldName:string,fieldValue:string) => {
        try {
          const response = await fetch(`${API_BASE_URL}/getUserByField/${fieldName}/${fieldValue}`);
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
          }
    
          return data;
        } catch (error:any) {
          console.error('ApiService Error:', error);
          throw error;
        }
      },

      updateLiveLocation: async (userId:string,body:any) => {
        try {
          const response = await fetch(`${API_BASE_URL}/updateUserLiveLocation/${userId}`,{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
          }
    
          return data;
        } catch (error:any) {
          console.error('ApiService Error:', error);
          throw error;
        }
      },
};

export default UserApiService;
