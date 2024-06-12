import AsyncStorage from "@react-native-async-storage/async-storage";
 
const useAsyncStorage = ()=>{
 
    const setItem =  async (key:string,value:any) => {
        try {
          await AsyncStorage.setItem(
            key,
            value
          );
        } catch (error) {
          console.log(error);
        }
      };
    const getItem =  async (key:string) => {
        try {
          const value = await AsyncStorage.getItem(key);
          
          if (value !== null) {
            // We have data!!
            return value;
          }
        } catch (error) {
            console.log(error);
        }
    };
    const removeItem =  async (key:string) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
      };

      const crearAllItems =  async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.log(error);
        }
      };
 
    return{
        setItem,
        getItem,
        removeItem,
        crearAllItems
    }
 
}
 
export default useAsyncStorage;