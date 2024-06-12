import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  withTheme,
  HelperText,
} from 'react-native-paper';

const AlertBox = ({ theme }) => {
  const otpInputRefs = useRef([null, null, null, null]);
  const [otp, setOTP] = useState('');
  const [otpMessage, setOTPMessage] = useState('');

  const [loaderVisible, setLoaderVisible] = useState(false);

  useEffect(() => {
   if (otp.length === 4) {
      setLoaderVisible(true);
   } else {
      setLoaderVisible(false);
   }
  }, [otp]);

  const navigation = useNavigation();

  const handleOTPInput = (text, index) => {
   console.log("text>>",text)
   let newOtp = otp + text
    setOTP(newOtp);
    console.log("text, index>>>",text,index)


    if (text.length === 1 && index < 3) {
      otpInputRefs.current[index + 1].focus();
    }
  };

  const handleOTPSubmit = () => {
    if (otp.length !== 4) {
      setOTPMessage('Please enter a valid OTP.');
      return;
    }

    // Handle OTP submission logic here

    setOTP('');
    setOTPMessage('');

    
    navigation.navigate('Main', {
       screen: 'Home',
     });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor:'white'}}>
      <Text variant="titleLarge" style={{ textAlign: 'center' , marginBottom:30 }}>
        OTP Verification
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:40 }}>
        {[0, 1, 2, 3].map((index) => (
          <TextInput
          theme={{colors: {primary: '#C53F3F'}}}
            key={index}
            ref={(ref) => (otpInputRefs.current[index] = ref)}
            style={{ width: 50, height: 50, borderWidth: 1, borderColor: 'gray' }}
            maxLength={1}
            keyboardType="number-pad"
            selectionColor={theme.colors.primary}
            underlineColor="transparent"
            value={otp[index] || ''}
            onChangeText={(text) => handleOTPInput(text, index)}
          />
        ))}
      </View>
      {otpMessage && (
        <HelperText type="error" style={{ marginTop: 8 }}>
          {otpMessage}
        </HelperText>
      )}
      <Button
        mode="contained"
        style={{ marginTop: 16, backgroundColor:'#C53F3F' }}
        onPress={handleOTPSubmit}
      >
        Submit OTP
      </Button>
    </View>
  );
};

export default withTheme(AlertBox);