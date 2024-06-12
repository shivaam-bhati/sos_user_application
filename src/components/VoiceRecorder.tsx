// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Voice from '@react-native-voice/voice';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const VoiceRecorder = ( onDataReceived:any) => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     Voice.onSpeechResults = onSpeechResults;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechResults = (event:any) => {
//     console.log("voice>>>",event)
//     setResults(event.value);
//     onDataReceived("voice");
//   };

//   const startRecording = async () => {
//     try {
//       await Voice.start('en-US');
//       setIsRecording(true);
//       setResults([]);
//     } catch (error) {
//       console.error('Error starting recording:', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       await Voice.stop();
//       setIsRecording(false);
//     } catch (error) {
//       console.error('Error stopping recording:', error);
//     }
//   };

//   return (
//     <View>
//       <Text>{isRecording ? 'Recording...' : ''}</Text>

//       {isRecording ? (
//         <TouchableOpacity onPress={stopRecording}>
//            <Icon style={styles.icon} name='microphone' color='red' />
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity onPress={startRecording}>
//           <Icon style={styles.icon} name='microphone' />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default VoiceRecorder;

// const styles = StyleSheet.create({
//     icon:{
//         fontSize:30
//       },
// });
