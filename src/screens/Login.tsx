import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { isEmailValid } from '../hooks/validation ';
import useAsyncStorage from '../hooks/localStorage';
import UserApiService from '../services/user';
import Toast from 'react-native-toast-message';
import AppActivityIndicator from '../components/AppActivityIndicator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {getItem, setItem}= useAsyncStorage();

  const navigation = useNavigation();


  useEffect(()=>{
    const checkUser=async()=>{
      try {
    const value = await getItem('userId');
    const userData = await getItem('userData');
    console.log("userData>>>>",userData)
    if (value !== undefined) {
      navigation.navigate('Main', {
        screen: 'Home',
      });
    }
      } catch (error) {
        console.log(error)
      }
    }
    checkUser()
   
  },[])



  const handleLogin = async() => {
    try {
    if (validateInputs()) {
        setLoading(true);
        const {user,success,message} = await UserApiService.login({email,password});
       if(success){
        setLoading(false);
        const {_id}= user;
        console.log("user>>>",user)
       await setItem("userId",_id);
      await setItem("userData",JSON.stringify(user));
         navigation.navigate('Main', {
           screen: 'Home',
         });
        }
     }
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the forgot password screen or perform related action
    console.log('Forgot Password');
  };

  const handleCreateAccount = () => {
    // Navigate to the create account screen or perform related action
    console.log('Create a new account');
    navigation.navigate('Signup');
  };

  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  const validateInputs = () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError('Email or Username is required');
      isValid = false;
    }else if (!isEmailValid(email)) {
      setEmailError('Enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
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

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/images/Login-amico.png')}
        style={{
          width: '100%',
          height: '30%',
          resizeMode: 'contain',
          marginTop: '30%',
        }}
      />
      <Title style={styles.title}>Login</Title>
      <TextInput
        theme={{ colors: { primary: '#C53F3F' } }}
        label="Email or Username"
        value={email}
        onChangeText={(text) => changeEmail(text)}
        style={styles.input}
        mode="outlined"
        error={Boolean(emailError)}
      />
      <Text style={styles.errorText}>{emailError}</Text>
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
            name="eye"
            onPress={() => {
              togglePasswordVisibility();
            }}
            color={'red'}
          />
        }
        error={Boolean(passwordError)}
      />
      <Text style={styles.errorText}>{passwordError}</Text>
      <Button mode="contained" onPress={handleLogin} style={styles.loginButton}>
        {loading?(<AppActivityIndicator size='30' color='white'/>):("Login")}
      </Button>
      <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
        Forgot Password?
      </Text>
      <Text onPress={handleCreateAccount} style={styles.createAccountButton}>
        Create a new account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: '5%',
    fontSize: 24,
  },
  input: {
    marginBottom: 10,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: '#C53F3F',
  },
  createAccountButton: {
    marginTop: 10,
    alignSelf: 'center',
    color: '#3080EA',
  },
  forgotPassword: {
    textAlign: 'center',
    marginTop: 10,
    color: '#3080EA',
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
  },
});

export default Login;
