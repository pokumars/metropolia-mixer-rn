import React, { useState } from 'react'
import {  StyleSheet, View, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomStatusBar from '../components/CustomStatusBar'
import { saveUserAndToken } from '../state-mgmt/actions/authActions'
import Colors from '../constants/Colors'
import TitleText from '../components/TitleText'
import { AuthFormBackground, AuthTextInput } from '../components/authComponents'
import { ButtonPrimarySm } from '../components/buttons'
import CustomText from '../components/CustomText'



const SignInScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  //const user = useSelector(state => state.user.user.username);
  const authErrorMessageFromBackend = useSelector(state => state.user.authErrorMessage);
 

  /*useSelector(state => {
    console.log('state.user.user', state.user.user)
    console.log('state.drinks.allDrinks.length', state.drinks.allDrinks.length)
  })*/


  const login = (enteredUsername, enteredPassword) => {
    console.log('login from SignInScreen', { username: enteredUsername, password: enteredPassword });
    dispatch(saveUserAndToken({ username: enteredUsername, password: enteredPassword }));

  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container} >
      <CustomStatusBar />
      <AuthFormBackground >
        
        <TitleText size='h2' >Sign In</TitleText>
        <CustomText style={styles.errorText} >{authErrorMessageFromBackend}</CustomText>
        <AuthTextInput
          onChangeText={(text) =>{
            setUsername(text);
          }}
          value={username}
          inputTitle='Username'
        />

        <AuthTextInput
          onChangeText={(text) =>{
            setPassword(text);
          }}
          value={password}
          inputTitle='Password'
          secureTextEntry={true}
        />
        <ButtonPrimarySm
          title='Sign In'
          color={Colors.navyBlue} onPress={()=> login(username, password)}
          disabled={username.length < 1 || password.length < 1}
        
        /> 
      </AuthFormBackground>
    </View>
    </ScrollView>
  )
}
//<Button title='Register' onPress={() => {props.navigation.navigate('Register')}} />
//<Button title='Forgot Password' onPress={() => {props.navigation.navigate('Forgot Password')}} />


const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom:100
  },
  errorText: {
    fontSize: 11,
    color: Colors.warningRed
  },
  formContainer: {
    backgroundColor: Colors.primaryGreen,
    padding: 20,
    marginTop: '15%'
  },


});

export default SignInScreen

