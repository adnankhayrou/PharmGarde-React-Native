import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../Screens/Login&Register/Login';
import RegisterPage from '../Screens/Login&Register/Register';
import WelcomeScreen from '../Screens/welcomeScreen';
import HomeScreen from '../Screens/HomeScreen';

const Stack = createStackNavigator(); 

const AppNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Register" component={RegisterPage} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
