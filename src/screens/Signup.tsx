import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Button, Title, Text, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isEmailValid, isMobileNumberValid } from '../hooks/validation ';
import UserApiService from '../services/user';
import useAsyncStorage from '../hooks/localStorage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native-gesture-handler';
import AppActivityIndicator from '../components/AppActivityIndicator';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [gender, setGender] = useState('Male');
  const {setItem,getItem}= useAsyncStorage();
  const [loading, setLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [dobError, setDobError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const [genderError, setGenderError] = useState('');

  const [visible, setVisible] = useState(false);


  const navigation = useNavigation();

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
          // hour: '2-digit',
          // minute: '2-digit',
          // second: '2-digit',
          timeZone: 'UTC',
        })
      : '';
      setDob(String(formattedDate))
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };


  const handleSignUp = async() => {
    try {
      if (validateInputs()) {
        setLoading(true);
        setVisible(true);
        const dateOfBirth = new Date(dob);

// Split the input date string into day, month, and year
const [day, month, year] = dob.split('/');

// Create a new Date object using the extracted values
const dateObject = new Date(`${year}-${month}-${day}T09:36:00.000Z`);

// Convert the Date object to a string in the desired format
const formattedDateString = dateObject.toISOString();
        const body = {
          firstName,
          lastName,
          email,
          mobileNo,
          dob:formattedDateString,
          gender,
          password
        }
        const {user,success} = await UserApiService.create(body);
        if(success){
          const {_id}= user;
          setItem("userId",_id);
          setItem("userData",JSON.stringify(user));
          setLoading(false);
          navigation.navigate('Login'); 
        }else{
          setLoading(false);
        }

      }
    } catch (error:any) {
      setLoading(false);
      console.error('Error fetching data:', error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const validateInputs = () => {
    let isValid = true;

    // First Name validation
    if (!firstName.trim()) {
      setFirstNameError('First Name is required');
      isValid = false;
    } else {
      setFirstNameError('');
    }

    // Last Name validation
    if (!lastName.trim()) {
      setLastNameError('Last Name is required');
      isValid = false;
    } else {
      setLastNameError('');
    }

    
    // Gender validation
    if (!gender.trim()) {
      setGenderError('Gender is required');
      isValid = false;
    } else {
      setGenderError('');
    }

    // Email validation
    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    }else if (!isEmailValid(email)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    }  else {
      setEmailError('');
    }

  // Mobile Number validation
    if (!mobileNo.trim()) {
      setMobileNumberError('Mobile Number is required');
      isValid = false;
    } else if (!isMobileNumberValid(mobileNo)) {
      setMobileNumberError('Valid only 10-digit Mobile Number');
      isValid = false;
    } else {
      setMobileNumberError('');
    }

    // Date of Birth validation
    if (!dob.trim()) {
      setDobError('Date of Birth is required');
      isValid = false;
    } else {
      setDobError('');
    }


    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    // Re-enter Password validation
    if (!rePassword.trim()) {
      setRePasswordError('Re-enter Password is required');
      isValid = false;
    } else if (rePassword !== password) {
      setRePasswordError('Passwords do not match');
      isValid = false;
    } else {
      setRePasswordError('');
    }

    return isValid;
  };


  const changeEmail=(email:string)=>{
    setEmail(email);
    if(!isEmailValid(email)) {
      setEmailError('Enter a valid email address');
    }else{
      setEmailError('');
    } 
  }

  const changeMobileNuber=(mobileNo:string)=>{
    setMobileNo(mobileNo);
    if(!isMobileNumberValid(mobileNo)) {
      setMobileNumberError('Valid only 10-digit Mobile Number');
    }else{
      setMobileNumberError('');
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView  showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <Title style={styles.title}>Sign Up</Title>
      <TextInput
        theme={{ colors: { primary: '#C53F3F' } }}
        label="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        style={styles.input}
        mode="outlined"
        error={Boolean(firstNameError)}
      />
      <Text style={styles.errorText}>{firstNameError}</Text>
      <TextInput
        theme={{ colors: { primary: '#C53F3F' } }}
        label="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
        style={styles.input}
        mode="outlined"
        error={Boolean(lastNameError)}
      />
      <Text style={styles.errorText}>{lastNameError}</Text>
      <Text>Gender:</Text>
      <RadioButton.Group
        onValueChange={(value) => setGender(value)}
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
      <Text style={styles.errorText}>{genderError}</Text>



      <View>
      <TouchableOpacity onPress={showDatepicker}>
        <TextInput
          theme={{ colors: { primary: '#C53F3F' } }}
          label="Date of Birth"
          value={dob}
          editable={false} // Prevents direct editing of TextInput
          style={styles.input}
          mode="outlined"
          error={Boolean(dobError)}
        />
          <Text style={styles.errorText}>{dobError}</Text>
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
        theme={{ colors: { primary: '#C53F3F' } }}
        label="Email"
        value={email}
        onChangeText={(text) => changeEmail(text)}
        style={styles.input}
        mode="outlined"
        error={Boolean(emailError)}
      />
      <Text style={styles.errorText}>{emailError}</Text>
      <TextInput
        theme={{ colors: { primary: '#C53F3F' } }}
        label="Mobile Number"
        value={mobileNo}
        onChangeText={(text) => changeMobileNuber(text)}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
        error={Boolean(mobileNumberError)}
      />
      <Text style={styles.errorText}>{mobileNumberError}</Text>
      <TextInput
        theme={{ colors: { primary: '#C53F3F' } }}
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={hidePassword}
        style={styles.input}
        mode="outlined"
        right={
          <Icon
            name={hidePassword ? 'eye-slash' : 'eye'}
            onPress={togglePasswordVisibility}
            color={'red'}
          />
        }
        error={Boolean(passwordError)}
      />
      <Text style={styles.errorText}>{passwordError}</Text>
      <TextInput
        theme={{ colors: { primary: '#C53F3F' } }}
        label="Re-enter Password"
        value={rePassword}
        onChangeText={(text) => setRePassword(text)}
        secureTextEntry={hidePassword}
        style={styles.input}
        mode="outlined"
        right={
          <Icon
            name={hidePassword ? 'eye-slash' : 'eye'}
            onPress={togglePasswordVisibility}
            color={'red'}
          />
        }
        error={Boolean(rePasswordError)}
      />
      <Text style={styles.errorText}>{rePasswordError}</Text>
      <Button mode="contained" onPress={handleSignUp} style={styles.signupButton}>
      {loading?(<AppActivityIndicator size='30' color='white'/>):("Sign Up")} 
      </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
  },
  input: {
    marginBottom: 10,
  },
  signupButton: {
    marginTop: 20,
    backgroundColor: '#C53F3F',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
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
});

export default SignUp;
