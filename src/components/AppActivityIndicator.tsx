import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const AppActivityIndicator = ({size='',color=''}) => {
    const appSize:number = Number(size)
    return(
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size={appSize} color={color}/>
        </View>
      );
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    
  },
  horizontal: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
});

export default AppActivityIndicator;