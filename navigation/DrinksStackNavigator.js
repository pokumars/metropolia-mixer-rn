import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import Colors from '../constants/Colors';
import AllDrinksScreen from "../screens/AllDrinksScreen";
import DrinkRecipeScreen from "../screens/DrinkRecipeScreen";


const Stack = createStackNavigator();

const DrinksStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Drinks'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primaryGreen,
        },
        headerTintColor: Colors.navyBlue,
        headerTitleStyle: {},
      }}
    >
        <Stack.Screen name='Drinks' component={AllDrinksScreen} />
        <Stack.Screen name='DrinkRecipe' component={DrinkRecipeScreen} 
        options={({route}) => ({title: route.params.drinkName})} />
    </Stack.Navigator>
  )
}
/*
options={({route}) => ({title: route.params.drinkName})}
*/
export default DrinksStackNavigator;

