import React, { useEffect } from 'react';
import {View, Image, Text} from 'react-native';
import {MD3LightTheme as PaperTheme, Button, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import useAsyncStorage from '../hooks/localStorage';

const Startup = () => {
  const navigation = useNavigation();
  const {getItem}= useAsyncStorage();

  useEffect(()=>{
    const checkUser=async()=>{
      try {
    const value = await getItem('userId');
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <Image
        source={require('../assets/images/Online-connection-amico.png')}
        style={{
          width: '100%',
          height: '50%',
          resizeMode: 'contain',
          marginTop: '30%',
        }}
      />
      <Title style={{textAlign: 'center', marginBottom: 20, fontSize: 24}}>
        Welcome to Our App!
      </Title>

      <Text
        style={{textAlign: 'center', paddingHorizontal: 30, marginBottom: 30}}>
        Instant Rescue Network!!!
      </Text>
      {/* <Button
        onPress={}
        title=''
      >
        <Icon name="arrowright" size={50} color="red" style={{ marginLeft: 10 }} />
      </Button> */}

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
        style={{marginTop: 10, backgroundColor: '#C53F3F'}}>
        Get Started
      </Button>
    </View>
  );
};

export default Startup;
