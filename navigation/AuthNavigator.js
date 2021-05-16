import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import SignInScreen from "../screens/SignInScreen";
import StartupScreen from "../screens/StartupScreen";
import Colors from "../constants/Colors";
import { START_UP_SCREEN, SIGN_IN_SCREEN, WEBVIEW_SCREEN } from '../constants/constants';
import WebViewScreen from '../screens/WebViewScreen';

const Stack = createStackNavigator();

const AuthNavigator = (props) => {
  /* It goes to the StartupScreen and thee if it finds a saved user token, it takes them into the app.
  Else it takes them tothe sign in screen //TODO: change the startup screen to be like the landing page in figma
  
  */ 
  
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{ 
          headerStyle: {
          backgroundColor: Colors.primaryGreen,
        },
        headerTintColor: Colors.navyBlue,
       }}
       initialRouteName={START_UP_SCREEN}
      >
        <Stack.Screen name={START_UP_SCREEN} component={StartupScreen} />
        <Stack.Screen name={WEBVIEW_SCREEN} component={WebViewScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={SIGN_IN_SCREEN} component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default AuthNavigator

