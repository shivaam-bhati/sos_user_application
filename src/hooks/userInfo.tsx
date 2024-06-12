import AsyncStorage from "@react-native-async-storage/async-storage";
 
const useUserInfo = ()=>{
 
    const setInfo =  async (value:any) => {
        try {
          await AsyncStorage.setItem(
            'userInfo',
            value
          );
        } catch (error) {
          console.log(error);
        }
      };
    const getInfo =  async () => {
        try {
          const value = await AsyncStorage.getItem('userInfo');
          
          if (value !== null) {
            // We have data!!
            return value;
          }
        } catch (error) {
            console.log(error);
        }
    };
 
    return{
        setInfo,
        getInfo
    }
 
}
 
export default useUserInfo;