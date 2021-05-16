import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect }  from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import Colors from "../constants/Colors";
import { Platform } from "react-native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useDispatch, useSelector } from "react-redux";
import { passInitialFavouritesToState } from "../state-mgmt/actions/drinksActions";
import { createStackNavigator } from '@react-navigation/stack';
import DrinkRecipeScreen from "../screens/DrinkRecipeScreen";
import AllDrinksScreen from "../screens/AllDrinksScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { getHeaderTitle } from "../helpers/helperFunctions";

const Stack = createStackNavigator();


const Tab = Platform.OS=="android"? createMaterialBottomTabNavigator(): createBottomTabNavigator();

const AdaptiveTabNavigator = (props) => {
  if (Platform.OS=="android") {
    return(
      <Tab.Navigator
           initialRouteName={props.initialRouteName}
            activeColor={ props.activeTintColor}
            inactiveColor={props.inactiveTintColor}
           barStyle={{ backgroundColor: props.inactiveBackgroundColor }}
      >
        {props.children}
      </Tab.Navigator>
    )
  }

  if (Platform.OS=="ios") {
    
    return(
      <Tab.Navigator
           initialRouteName={props.initialRouteName}
           tabBarOptions={{
             activeTintColor: props.activeTintColor,
             inactiveTintColor: props.inactiveTintColor,
             inactiveBackgroundColor: props.inactiveBackgroundColor,
             activeBackgroundColor: props.activeBackgroundColor
           }}
      >
        {props.children}
      </Tab.Navigator>
    )
  }
}

const MainNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user); 
  //console.log(user)
  
  useEffect(() => {
    const addUserFavoritesToState = () => {
      //console.log('user.favourites', user.favourites);
      dispatch(passInitialFavouritesToState(user.favourites))
    }
    addUserFavoritesToState();
  }, [])
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Drinks'
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primaryGreen,
          },
          headerTintColor: Colors.navyBlue,
          headerTitleStyle: {},
        }}
      >
        <Stack.Screen name='Drinks' component={TabNavigator} 
        options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })}
        />
        <Stack.Screen name='DrinkRecipe' component={DrinkRecipeScreen}
          options={({ route }) => ({ title: route.params.drinkName })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const TabNavigator = ({ navigation, route }) => {



  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user); 
  //console.log(user)
  
  useEffect(() => {
    const addUserFavoritesToState = () => {
      //console.log('user.favourites', user.favourites);
      dispatch(passInitialFavouritesToState(user.favourites))
    }
    addUserFavoritesToState();
  }, [])
  
  return (
      <AdaptiveTabNavigator
           initialRouteName="Drinks"
             activeTintColor= 'white'
             inactiveTintColor={Colors.navyBlue}
             inactiveBackgroundColor= {Colors.primaryGreen}
             activeBackgroundColor= {Colors.navyBlue}
             >
      <Tab.Screen
          name="Drinks"
          component={AllDrinksScreen} 
          options= {{
              tabBarLabel:'Drinks',
              tabBarIcon: ({focused}) => (<Fontisto  name="cocktail" size={20} color={ focused=== true ? 'white': Colors.navyBlue}/> )
            }}
        />
        <Tab.Screen name="Favorites" component={FavoritesScreen}
          options= {{
            tabBarLabel:'Favorites',
            tabBarIcon: ({focused}) => (<Fontisto  name="heart" size={20} color={ focused=== true ? 'white': Colors.navyBlue}/> )
          }} 
        />
        <Tab.Screen 
          name="Profile" component={ProfileScreen}
          options= {{
            tabBarLabel:'Profile',
            tabBarIcon: ({focused}) => (<Ionicons  name="person" size={25} color={ focused=== true ? 'white': Colors.navyBlue}/> )
          }}
        />
      </AdaptiveTabNavigator>
  )
}




export default MainNavigator

