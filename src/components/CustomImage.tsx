import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';


const CustomImage = ({
  imageUrl='https://via.placeholder.com/150',
  imageWidth=40,
  imageHeight=40,
  imageBorderRadius=20,
  imagePosition='flex-end',
  imageFlex=1,
  containerHeight=50,
  containerWidth=50,
  containerBackgroundColor='transparent',
  containerPadding=10,
  containerMargin=0,
}:any) => {



  return (
    <View style={{ height: Number(containerHeight), backgroundColor: containerBackgroundColor, justifyContent: 'center', alignItems: 'center',margin: Number(containerMargin) }}>
         <View style={{flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: Number(containerPadding),
      backgroundColor: containerBackgroundColor,
      height: Number(containerHeight),
      width: Number(containerWidth),}}>
<View style={{ flex: Number(imageFlex),
  alignItems: imagePosition,
  justifyContent: imagePosition === 'center' ? 'center' : imagePosition}}>
  <Image source={{ uri: imageUrl }} style={{width: Number(imageWidth),
  height: Number(imageHeight),
  borderRadius: Number(imageBorderRadius)}} />
</View>
</View>
    </View>
  );
};




export default CustomImage;