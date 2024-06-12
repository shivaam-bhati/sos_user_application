import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getLocationPermissions } from '../hooks/permissions';
import GetLocation from 'react-native-get-location';
import InstructionApiService from '../services/instruction';
import { useNavigation } from '@react-navigation/native';
import useAsyncStorage from '../hooks/localStorage';
import CasesApiService from '../services/cases';
import { SOCKET_API_BASE_URL } from '../configurations/API';
import { useIsFocused } from '@react-navigation/native';
import UserApiService from '../services/user';
// import VoiceRecorder from '../components/VoiceRecorder';


// const Card = ({ icon, massage, }:any) => {
//   return (
//     <TouchableOpacity onPress={() => handleCircleClick(item._id)}>
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>{massage}</Text>
//       <View style={ {flexDirection: 'row',position:'absolute',
//       alignItems: 'center', bottom:0,marginBottom:10}}>
//       <Icon style={styles.icon} name='arrow-right' color='red' />
//       <Icon style={styles.icon} name={icon} color='red' />
//       </View>
//     </View>
//     </TouchableOpacity>
//   );
// };

const Home = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [clickCount, setClickCount] = useState(0);
  const [instruction, setInstruction] = useState([]);
  const [userId, setUserId] = useState('');
  const [userData,setUserData] = useState();
  const [isTouchableOpacityDisabled, setIsTouchableOpacityDisabled] = useState(false);
  const [startButtonText, setStartButtonText] = useState('Start');
  const {setItem}= useAsyncStorage();
  const [socket, setSocket] = useState(null);
  const [timeoutId,setTimeoutId] = useState('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {getItem}= useAsyncStorage();
  const [intervalId, setIntervalId] = useState(null);


  const [region, setRegion] = useState({
    latitude:26.85776654964965,
    longitude:75.77342916691464,
  });

  useEffect(() => {
    async function fetchData() {

      const permission = await getLocationPermissions();
      if (permission) {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        })
          .then(location => {
            setRegion({
              latitude: location.latitude,
              longitude: location.longitude
            });
          })
          .catch(error => {
            const { code, message } = error;
            console.warn(code, message);
          })
      } else {
        alert('Location permission denied');
      }

    }
    fetchData();
  }, [isFocused]);


  useEffect(() => {
    // Create a new WebSocket connection
    const newSocket = new WebSocket(SOCKET_API_BASE_URL);
    
    // Event handler for when the connection is open
    newSocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

     // Set the socket in the component state
     setSocket(newSocket);

     // Cleanup function to close the WebSocket connection when the component unmounts
     return () => {
       newSocket.close();
     };

  },
 [isFocused]);


  useEffect(()=>{
    const checkUser=async()=>{
      try {
    const value:any = await getItem('userId');
    console.log("getItem('userId')>>>",value);
    setUserId(value);
    console.log("hello");
      const data = await CasesApiService.getActiveCasesByUser(userId);
     console.log("user active cases>>>",data.findedCases)
     if(data.findedCases.length>0){
      setIsTouchableOpacityDisabled(true);
      setStartButtonText('Wait');   
      setIsLoading(false);
      setShowTimer(false); 
      setCountdown(5); 
      setClickCount(0);
     }else{
      setIsTouchableOpacityDisabled(false);
      setStartButtonText('Start'); 
     }
    if (value == undefined) { 
      navigation.navigate('Login');
    }
      } catch (error) {
        console.log(error)
      }
    } 
    checkUser()
  },[isFocused])





    useEffect( () => {

      const fetchInstruction = async () => {
        try {
          const inst:any = await getItem('instruction');
          //console.log("instruction>>>",inst)
          if(inst!== undefined){
            setInstruction(JSON.parse(inst));
          }else{
            const data = await InstructionApiService.getAll();
            setInstruction(data.instruction);
            setItem("instruction",JSON.stringify(data.instruction));
          }
          
        } catch (error:any) {
          console.error('Error fetching data:', error.message);
        }
      };
      fetchInstruction();
    }, [isFocused]);

  useEffect(() => {
    let interval:any;
    if (showTimer) {
      interval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
      if (countdown === 0) {
        setIsLoading(false);
        setShowTimer(false);
        setCountdown(5);
      }
    };
  }, [showTimer, countdown, isFocused]);


  const sendMessage = (createdCase:any) => {
    //console.log("inside the socket>>>",socket);
    if (socket && socket.readyState === WebSocket.OPEN) {
     // console.log("inside the socket 2>>>");
      const message = {
        action: 'caseCreated',
        message: 'new case created',
        createdCase
      };

      // Convert the message object to a JSON string before sending
      socket.send(JSON.stringify(message));
    }
  };


  async function getLocation() {
    const permission = await getLocationPermissions();

    if(permission){
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
    })
    .then(location => {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude
      });
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
    }else {
      alert('Location permission denied');
    }
 
  }

  const handleCircleClick = (message:string) => {
    getLocation()

    if (clickCount < 0 || isLoading) {
      setIsLoading(false);
      setShowTimer(false);
      setCountdown(5);
      setClickCount(0);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      return;
    }
    setIsLoading(true);
    setShowTimer(true);
    setClickCount(clickCount + 1);

    const newTimeoutId =  setTimeout(() => {
      if(clickCount < 2){
        setIsTouchableOpacityDisabled(true);
        setStartButtonText('Wait');
        setIsLoading(false);
        setShowTimer(false);
        setCountdown(5);
        setClickCount(0);
        createCase(message)
      }
     
    }, 10000); // 10 seconds in milliseconds (5 seconds each for loader and icon)

    setTimeoutId(newTimeoutId);

    const newIntervalId = setInterval(() => {
      updateLocation();
    }, 3000);

    setIntervalId(newIntervalId);
  };


  const updateLocation = async () => {
    try {
      const body = {
        latitude: region.latitude,
        longitude: region.longitude
      }
      let user = await UserApiService.get(userId);
      console.log("user-->",user);
      
      // await CasesApiService.update(caseId, body);
    } catch (error) {
      console.log('Error updating live location:', error);
    }
  }


  const handleStopClick = () => {
    setIsLoading(false);
    setShowTimer(false);
    setCountdown(5);
    setClickCount(0);
    setIsTouchableOpacityDisabled(false);
    setStartButtonText('Start');
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    clearInterval(intervalId);
  };  

  const createCase = async(message:string)=>{
    try {
      const body = {
          massage: message,
          user:userId,
          latitude:region.latitude,
          longitude:region.longitude
      }
      const createdCase = await CasesApiService.create(body);
      //console.log("createdCase>>>",createdCase)
      sendMessage(createdCase);
    } catch (error) {
      console.log(error)
    }
  }

  // const handleDataReceived = (data:any) => {
  //   alert("hello",data)
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.headingTop}>Emergency help needed?</Text>
      <Text style={styles.subHeading}>Just press the button to call</Text>
      <View style={styles.outerCircle}>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size={180} color="lightgray" />
          </View>
        )}
        <TouchableOpacity disabled={isTouchableOpacityDisabled} onPress={()=>handleCircleClick('please help me!')} style={styles.innerCircle}>
          {showTimer ? (
            <Text style={styles.timerText}>{countdown}</Text>
          ) : (
            <Text style={styles.timerText}>{startButtonText}</Text> // Replace 'icon-name' with your icon
          )}
        </TouchableOpacity>
      </View>
      {startButtonText === 'Wait' && (
        <TouchableOpacity onPress={handleStopClick} style={styles.stopButton}>
          <Text style={styles.stopButtonText}>STOP</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.heading}>What is your emergency?</Text>
      <Text style={styles.subHeadingBootom}>Pick the subject to chat</Text>
      {/* <VoiceRecorder onDataReceived={handleDataReceived}/> */}
      <FlatList horizontal style={styles.cardList}
        data={instruction}
        renderItem={({item}:any) =>  <TouchableOpacity onPress={() => handleCircleClick(item.massage)}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{item.massage}</Text>
          <View style={ {flexDirection: 'row',position:'absolute',
          alignItems: 'center', bottom:0,marginBottom:10}}>
          <Icon style={styles.icon} name='arrow-right' color='red' />
          <Icon style={styles.icon} name={item.icon} color='red' />
          </View>
        </View>
        </TouchableOpacity>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#fff'
  },
  outerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 6,
    borderColor: 'lightgray',
    backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    padding:30,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  headingTop: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginTop:'20%',
    marginBottom:'3%'
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginTop:'20%',
    marginBottom:'3%'
  },
  subHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom:'10%'
  },
  subHeadingBootom: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  countText: {
    fontSize: 24,
    color: 'white',
  },
  iconText: {
    fontSize: 18,
    color: 'white',
  },
  padding2: {
    padding: 2,
  },
  cardList: {
    marginTop: '10%',
    paddingHorizontal: 10,
  },
  card: {
    width: 150,
    height: 100,
    backgroundColor: 'lightgray',
    marginRight: 10,
    borderRadius: 8,
    padding: 10,
  },
  cardTitle: {
    fontSize: 15,
    // fontWeight: 'bold',
    width:'90%'
  },
  icon:{
    marginStart:'10%',
    fontSize:30,
    flex:1,
    marginBottom:0,
    marginLeft:30
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  stopButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  stopButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default Home;
