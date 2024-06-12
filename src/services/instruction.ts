import { API_BASE_URL } from "../configurations/API";
import useAsyncStorage from '../hooks/localStorage';

const {setItem,getItem}= useAsyncStorage();

const InstructionApiService = {

  getAll: async () => {
    try {
      const token:any = await getItem('sos_jwt_loging_token');
      console.log("token 12345678>>>",token)
      const response = await fetch(`${API_BASE_URL}/getAllInstruction`, {
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

//   post: async (endpoint:String, body:any) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Something went wrong');
//       }

//       return data;
//     } catch (error:any) {
//       console.error('ApiService Error:', error.message);
//       throw error;
//     }
//   },
};

export default InstructionApiService;
