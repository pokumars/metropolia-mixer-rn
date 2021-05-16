import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Colors from '../constants/Colors';
import ProfileScreen from "../screens/ProfileScreen";


const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Profile'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryGreen,
        },
        headerTintColor: Colors.navyBlue,
        headerTitleStyle: {},
      }}
    >
        <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStackNavigator;

