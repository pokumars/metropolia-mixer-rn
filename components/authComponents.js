import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import CustomText from './CustomText'

export const AuthFormBackground = (props) => {
  return (
    <View style={styles.formContainer}>
      {props.children}
    </View>
  )
}

export const AuthTextInput= ({
  onChangeText, value, errorMsg, inputTitle, secureTextEntry, errorNextToTitle, onEndEditing
}) => {
  return (
    <View style={styles.authTextInputContainer}>
      <CustomText style={styles.errorText} >{errorMsg? errorMsg.join('. '): ""}</CustomText>
      <View style={styles.inputTitleContainer}>
        <Text style={styles.authTextInputTitleStyle} >{inputTitle}</Text>
        {
          errorNextToTitle? (
            <Text style={{...styles.errorText,...styles.errorNextToTitle, ...{color: errorNextToTitle.textColor}}}>
            {errorNextToTitle.message}
          </Text>
          ) : null
        }
      </View>
      <TextInput style={styles.authTextInput}
        onChangeText={onChangeText}
        value={value} 
        placeholder={`${inputTitle} here`}
        secureTextEntry={secureTextEntry}
        onEndEditing={onEndEditing}
      />
    </View>
  )
}

const authInputLeftSpacing= 12

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: Colors.lemon,
    padding: 20,
    paddingVertical: 40,
    marginTop: '15%',
    borderRadius: 15,
    width: '90%',
    alignItems: 'center'
  },
  errorText: {
    fontSize: 11,
    color: Colors.warningRed
  },
  errorNextToTitle: {
    paddingLeft: 15,
  },
  authTextInputContainer: {
    width: '90%'
  },
  authTextInputTitleStyle: {
    fontSize: 14,
    color: Colors.navyBlueText,
    paddingBottom:0    
  },
  authTextInput: {
    backgroundColor:Colors.whiteScreenBg,
    borderWidth: 1,
    borderColor: Colors.navyBlue,
    paddingLeft: authInputLeftSpacing,
    borderRadius: 5,
    marginBottom: 10
  },
  inputTitleContainer: {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  }
})
