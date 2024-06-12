import React from 'react';
import { View,Text,Button, ScrollView } from 'react-native';
import {font30, mainBgColor,bgBlack,bgRed,mb5} from '../utils/CommonStyles';

const Screen = (props:any) => {
console.log("Screen>>>",props.name)
  return (
    <ScrollView style={bgBlack}>
 <View style={bgBlack}>
      <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
       <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
        <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
         <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
          <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
           <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
            <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
             <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
              <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
               <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                 <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                  <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                   <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                    <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                     <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                      <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                       <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                        <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                         <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                          <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                           <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                            <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                             <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                              <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>
                               <Text style={{...bgRed,...mb5}}>This is Screen component.{props.name}</Text>



       <Text style={bgRed}>This is Screen component.{props.name}</Text>
  </View>
    </ScrollView>
  );
};

export default Screen;