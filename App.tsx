import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {StatusBar, StyleSheet} from 'react-native';
import Routes from './src/navigations/Routes';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <PaperProvider style={styles.container}>
      <NavigationContainer>
      <Toast />
        <StatusBar
          backgroundColor="transparent" // Change the background color of the status bar
          barStyle="dark-content" // Change text color of the status bar
          translucent={true}
        />
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
};



export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
});
