import { ToastAndroid} from 'react-native';
 
const useToast = ()=>{
      const showToastWithGravity = (message:string='Something went wrong') => {
        ToastAndroid.showWithGravity(
            message,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      };
    

 
    return{
        showToastWithGravity,
    }
 
}
 
export default useToast;