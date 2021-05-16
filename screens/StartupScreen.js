import React, { useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native'
import TitleText from '../components/TitleText'
import Colors from '../constants/Colors'
import { SIGN_IN_SCREEN, tokenKeyInSecureStore, WEBVIEW_SCREEN } from '../constants/constants'
import { getValueInSecureStorage } from '../helpers/helperFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { getUserFromBackendBasedOnToken } from '../state-mgmt/actions/authActions'
import { getAllDrinksToStore } from '../state-mgmt/actions/drinksActions'
import { useState } from 'react'
import CustomStatusBar from '../components/CustomStatusBar'
import {  ButtonOutline, ButtonPrimary } from '../components/buttons'
import CustomText from '../components/CustomText'
import { ScrollView } from 'react-native-gesture-handler'


const LoadingMiniComponent = () => {
  return (
    <>
      <ActivityIndicator color={Colors.navyBlue} size="large" />
      <TitleText>Gathering Information...</TitleText>
      <Text>If this spinner lasts for more than 10 seconds check your internet connection.</Text>
    </>

  )
}


const StartupScreen = (props) => {
  const [loading, setLoading] = useState(true);
  
  const drinks = useSelector(state => state.drinks.allDrinks.length)
  console.log('drinks', drinks);
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const token = await getValueInSecureStorage(tokenKeyInSecureStore)
      if(!token){//go to sign in screen
        //console.log('no token found in SecureStore');
        setLoading(false);
        //props.navigation.replace(SIGN_IN_SCREEN);
        return;
      }//else go to AllDrinksScreen
      //also pass favourites from getUserFromBackendBasedOnToken() to drinks reducer 
      dispatch(getUserFromBackendBasedOnToken(token));
    }
    tryLogin();
  }, [])
  
  const loadAllDrinks = async ()=> {
    //As soon as app starts, load all the drinks into the store
    dispatch(getAllDrinksToStore())
  }

  useEffect(() => {
    
    loadAllDrinks();
  }, [])

  const renderEntranceButtons = () => {
    return <>
      <ButtonPrimary title='Sign In' size='large' styleObj={{ marginTop: 20 }}
        onPress={() => props.navigation.navigate(SIGN_IN_SCREEN)}
      />
      <ButtonOutline title='Continue as guest*' size='large' styleObj={{ marginTop: 20 }}
        onPress={() => props.navigation.navigate(WEBVIEW_SCREEN)}
      />
      <View ><CustomText >* Continues as a guest in browser</CustomText></View>
    </>
  }

  return (
    <View style={styles.screen}>
      <CustomStatusBar />
    <ScrollView style={styles.container} >
      <Image style={styles.splashImage} source={require('../assets/splash.png')} />      
      {
        loading? <LoadingMiniComponent />: renderEntranceButtons()
      }

    </ScrollView>
    </View>

  )
}
//console.log('continue as guest')
export default StartupScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: 'white',
    padding: '10%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  splashImage: {
    width: '100%',
    maxWidth: 300,
    maxHeight: 300,
    resizeMode: 'contain',
  }
  
})
