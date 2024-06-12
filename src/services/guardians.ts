import axios from "axios";
import { API_BASE_URL } from "../configurations/API";

import useAsyncStorage from '../hooks/localStorage';

const {setItem,getItem}= useAsyncStorage();

const GuardiansApiService = {

  create: async (body: any, userId: any) => {
    try {
console.log("body: any, userId: any>>>",body, userId)

const token:any = await getItem('sos_jwt_loging_token');
      const response = await fetch(`${API_BASE_URL}/createGuardian/${userId}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorizationtoken': token
        },
        body: JSON.stringify(body),
      });

      console.log("response>>>",response)

        const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
      

    } catch (error: any) {
      console.error('ApiService Error:', error.message);
      throw error;
    }
  },
 
  getByUserId: async (userId:string) => {
    try {
      const token:any = await getItem('sos_jwt_loging_token');
      const response = await fetch(`${API_BASE_URL}/getGuardiansByUser/${userId}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorizationtoken': token
        }
      });
      console.log("response>>>",response)
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error:any) {
      console.error('ApiService Error:', error.message);
      throw error;
    }
  },

  
  delete: async (guardianId:string) => {
    try {
      const token:any = await getItem('sos_jwt_loging_token');
      const response = await fetch(`${API_BASE_URL}/deleteGuardian/${guardianId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authorizationtoken': token
        }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error:any) {
      console.error('ApiService Error:', error.message);
      throw error;
    }
  },
};

export default GuardiansApiService;
