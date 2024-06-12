import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import Login from '../screens/Login';
import Signup from '../screens/Signup';
import AlertBox from '../components/AlertBox';
import Startup from '../screens/Startup';
import TopHeader from '../components/TopHeader';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import LocationTrack from '../screens/LocationTrack';
import Guardians from '../screens/Guardians';
import Instruction from '../screens/Instruction';

function Routes(): React.JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Startup">
      <Stack.Screen
        name="Startup"
        component={Startup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={AlertBox}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Main"
        options={{headerShown: false, cardStyle: {backgroundColor: 'red'}}}>
        {() => (
          <Tab.Navigator
            screenOptions={({route}) => ({
              header: () => {
                if (
                  route.name !== 'Profile' &&
                  route.name !== 'LocationTrack'
                ) {
                  return (
                    <TopHeader
                      containerHeight="27%"
                      containerBackgroundColor="red"
                    />
                  );
                }
                return null;
              },

              tabBarIcon: ({focused, color, size}) => {
                let iconName = ''; // Set a default value for iconName

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home';
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'user' : 'user';
                } else if (route.name === 'LocationTrack') {
                  iconName = focused ? 'map-marker' : 'map-marker';
                } else if (route.name === 'Guardians') {
                  iconName = focused ? 'shield' : 'shield';
                } else if (route.name === 'Instruction') {
                  iconName = focused ? 'info-circle' : 'info-circle';
                }

                // Return the icon component
                return <Icon name={iconName} size={size} color={color} />;
              },
              // Custtom style for tab bar
              tabBarStyle: {
                paddingBottom: 5,
                paddingTop: 5,
                backgroundColor: 'black',
              },
            })}>
            {/* Tab bra navigations */}
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="LocationTrack" component={LocationTrack} />
            <Tab.Screen name="Guardians" component={Guardians} />
            <Tab.Screen name="Instruction" component={Instruction} />
          </Tab.Navigator>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default Routes;
