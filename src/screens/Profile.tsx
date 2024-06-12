import React, { useEffect, useState } from 'react';
import {
 View,
 StyleSheet,
 TouchableOpacity,
 Image,
 Platform,
} from 'react-native';
import { Button, Card, Dialog, Portal, RadioButton, Text, TextInput } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { putProfileObjectUrl, Upload } from '../services/UploadImageToS3';
import io from 'socket.io-client';
import { API_BASE_URL } from '../configurations/API';
import useAsyncStorage from '../hooks/localStorage';
import { useNavigation } from '@react-navigation/native';
import UserApiService from '../services/user';
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useIsFocused } from '@react-navigation/native';

const Profile = () => {
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [dob, setDob] = useState('');
 const [email, setEmail] = useState('');
 const [gender, setGender] = useState('');
 const [mobileNo, setMobileNo] = useState('');
 const [userId, setUserId] = useState('');
 const [visible,setVisible] = useState(false)
 const [isSaveDisabled, setIsSaveDisabled] = useState(true);
 const {setItem,getItem,removeItem,crearAllItems}= useAsyncStorage();

 const isFocused = useIsFocused();
 const navigation = useNavigation();


 useEffect(() => { 

  const getUser=async()=>{
    try { 
      console.log("call getUser")
    const newUserId:any = await getItem('userId');
    setUserId(newUserId);
    const userData:any = await getItem('userData');
    console.log("userData>>>",userData);
    console.log("newUserId>>>",newUserId)
    if(userData!== undefined){
      setFirstName(JSON.parse(userData).firstName);
      setLastName(JSON.parse(userData).lastName);
      setGender(JSON.parse(userData).gender);
const date = new Date(JSON.parse(userData).dob)

const formattedDate = date
? date.toLocaleDateString('en-IN', {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit',
    timeZone: 'UTC',
  })
: '';
setDob(String(formattedDate))
      setMobileNo(String(JSON.parse(userData).mobileNo));
      setEmail(JSON.parse(userData).email);
    }else{
      console.log("newUserId>>>>",newUserId)
      const {user} = await UserApiService.get(newUserId);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setGender(user.gender);
      const date = new Date(user.dob)

const formattedDate = date
? date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'UTC',
  })
: '';
setDob(String(formattedDate))
      setMobileNo(String(user.mobileNo));
      setEmail(user.email);
    }
    } catch (error) {
      console.log(error)
    }
  }

  getUser()

}, [isFocused]);


const selectImage=async(imageData:any)=>{
  try {
    console.log("imageData,userId",userId)
    const response = await putProfileObjectUrl(userId);
    const {url} = response.message.data;

    const uploadResponse = await Upload(url,imageData);
    console.log('Signed URL for getting object:', uploadResponse);
  } catch (error) {
    console.log("error>>>",error);
  }
}

const logout=async()=>{
  try {
    await removeItem('userId');
    await removeItem('instruction');
    await removeItem('userData');
    await crearAllItems();
    navigation.navigate('Login');
  } catch (error) {
    console.log(error)
  }
}

const showDialog=()=>{
  setVisible(true)
}

const hideDialog=()=>{
  setVisible(false)
}

 const onSaveChanges = async() => {
  //alert("hello this alert")
  try {
    //const userId = await getItem('userId');
    //const userData = await getItem('userData');
    const updatedData = {
        firstName,
        lastName,
        gender,
        dob,
        email,
        mobileNo

    }

    const {updatedUser} = await UserApiService.update(userId,updatedData);
    setItem("userData",JSON.stringify(updatedUser));
    setIsSaveDisabled(true)
  } catch (error) {
    console.log(error)
  }

 };

 const [image, setImage] = useState(null);

 const pickImage = () => {
  launchImageLibrary({ mediaType: 'photo' }, (response:any) => {
    if (!response.didCancel && !response.error) {
      selectImage(response)
    }
  });
};

const [showDatePicker, setShowDatePicker] = useState(false);

const handleDateChange = (event:any, date:any) => {
  console.log("date>>>",date)
  setShowDatePicker(Platform.OS === 'ios');
  if (date) {
    const formattedDate = date
    ? date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      })
    : '';
    setDob(String(formattedDate))
  }
};

const showDatepicker = () => {
  setShowDatePicker(true);
};

 return (
      <View style={styles.container}>
          <Card.Content>
          <TouchableOpacity style={styles.profilePic} activeOpacity={10} onPress={pickImage}>
          <FastImage
        source={{
        uri: 'data:image/png;base64,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',
        priority: FastImage.priority.normal,
      }}
      style={styles.profilePic}
      resizeMode={FastImage.resizeMode.contain}
    />
          </TouchableOpacity>
        
          <TextInput
        theme={{colors: {primary: '#C53F3F'}}}
        label="First Name"
        value={firstName}
        onChangeText={(text) => {
          setIsSaveDisabled(false);
          setFirstName(text)}}
        style={styles.input}
        mode="outlined"
      />
          
            <TextInput
              label="Last name"
              value={lastName}
              theme={{colors: {primary: '#C53F3F'}}}
              onChangeText={(text) => {
                setIsSaveDisabled(false);
                setLastName(text)}}
              style={styles.input}
              mode="outlined"
            />
                  <Text>Gender:</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          setIsSaveDisabled(false);
          setGender(value)}
        }
        value={gender}
      >
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButton}>
            <RadioButton  theme={{ colors: { primary: '#C53F3F' } }} value="Male" />
            <Text>Male</Text>
          </View>
          <View style={styles.radioButton}>
            <RadioButton  theme={{ colors: { primary: '#C53F3F' } }} value="Female" />
            <Text>Female</Text>
          </View>
        </View>
      </RadioButton.Group>


      <View>
      <TouchableOpacity onPress={showDatepicker}>
        <TextInput
          theme={{ colors: { primary: '#C53F3F' } }}
          label="Date of Birth"
          value={dob}
          editable={false} // Prevents direct editing of TextInput
          style={styles.input}
          mode="outlined"
        />
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob ? new Date(dob) : new Date()} // Set the initial value for the date picker
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
             <TextInput
              label="Phone No."
              value={mobileNo}
              theme={{colors: {primary: '#C53F3F'}}}
              onChangeText={(text) => {
                setIsSaveDisabled(false);
                setMobileNo(text)
              }}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Email"
              value={email}
              theme={{colors: {primary: '#C53F3F'}}}
              onChangeText={(text) => 
                {
                  setIsSaveDisabled(false);
                  setEmail(text)}
                }
              style={styles.input}
              mode="outlined"
            />
          </Card.Content>
          <View style={styles.buttonContainer}>
          <Button disabled={isSaveDisabled} mode="contained" onPress={onSaveChanges}>
            Save changes 
          </Button>
          
        </View>
        <Text onPress={logout} style={styles.logout}>
        Logout
      </Text>
      </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    height:'100%',
    backgroundColor:'white'
 },
 radioButtonContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
radioButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 16,
},
 logout:{
  position:'absolute',
  bottom:20,
  right:10,
    marginTop: 10,
    alignSelf: 'center',
    color: 'red',
 },
 card: {
    marginBottom: 20,
    height:'100%'
 },
 image: {
  width: 300,
  height: 300,
  marginTop: 20,
  resizeMode: 'contain',
},
 profilePic: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 75,
    backgroundColor:'lightgray'
 },
 button: {
    alignSelf: 'center',
    marginTop: 10,
 },
 input: {
    marginTop: 10,
 },
 buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop:30,
    marginRight:15
 },
});


export default Profile;