import { API_BASE_URL } from "../configurations/API";
import useAsyncStorage from '../hooks/localStorage';

const {setItem,getItem}= useAsyncStorage();

const CasesApiService = {

    create: async (body:any) => {
        console.log("body>>>",body)
        try {
          const token:any = await getItem('sos_jwt_loging_token');
          console.log("token>>>",token)
          const response = await fetch(`${API_BASE_URL}/createCase`,{
            method: 'POST',
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

      update: async (caseId:string,body:any) => {
        try {
          const response = await fetch(`${API_BASE_URL}/updateCase/${caseId}`,{
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


      getActiveCasesByUser: async (userId:string) => {
        try {
          const token:any = await getItem('sos_jwt_loging_token');
          const response = await fetch(`${API_BASE_URL}/getActiveCasesByUser/${userId}`,{
            method: 'GET',
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
          console.error('ApiService Error:', error);
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

export default CasesApiService;
