import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Colors from '../constants/Colors';
import FavoritesScreen from "../screens/FavoritesScreen";
import DrinkRecipeScreen from "../screens/DrinkRecipeScreen";


const Stack = createStackNavigator();

const FavoritesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Favorites'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryGreen,
        },
        headerTintColor: Colors.navyBlue,
        headerTitleStyle: {},
      }}
    >
        <Stack.Screen name='Favorites' component={FavoritesScreen} />
        <Stack.Screen name='DrinkRecipe' component={DrinkRecipeScreen} 
          options={({route}) => ({title: route.params.drinkName})} 
        />
    </Stack.Navigator>
  )
}

export default FavoritesStackNavigator;

