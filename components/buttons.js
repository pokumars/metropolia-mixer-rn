import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Colors from '../constants/Colors'

export const ButtonPrimarySm = ({title, onPress, disabled, }) => {
  return (
    <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({pressed})=> [
      { backgroundColor: pressed|| disabled? Colors.navyBlueTransparent: Colors.navyBlue },
      styles.primary,
      
    ]}
    >
      <Text style={{color: Colors.white}} >{title.toUpperCase()}</Text>
    </Pressable>
  )
}

/**
 * 
 * @param {string} title - string- title of the button
 * @param {function} onPress - function
 * @param {boolean} disabled - boolean
 * @param {string} size - enum('small', 'medium', 'large')
 * @param {object} styleObj - object - View (Pressable) style props
 * @returns Button
 */
 export const ButtonPrimary = ({title, onPress, disabled, size, styleObj }) => {
  return (
    <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({pressed})=> [
      { backgroundColor: pressed|| disabled? Colors.navyBlueTransparent: Colors.navyBlue },
      styles.primary,
      styles[size],
      styleObj
    ]}
    >
      <Text style={[{color: Colors.white}, styles.text]} >{title.toUpperCase()}</Text>
    </Pressable>
  )
}

/**
 * 
 * @param {string} title - string- title of the button
 * @param {function} onPress - function
 * @param {boolean} disabled - boolean
 * @param {string} size - enum('small', 'medium', 'large')
 * @param {object} styleObj - object - View (Pressable) style props
 * @returns Button
 */
export const ButtonSecondary = ({title, onPress, disabled, size, styleObj }) => {
  return (
    <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({pressed})=> [
      { backgroundColor: pressed|| disabled? Colors.primaryGreenTransparent: Colors.primaryGreen },
      { borderColor: pressed|| disabled? Colors.navyBlueTransparent: Colors.navyBlue },
      styles.secondary,
      styles[size],
      styleObj      
    ]}
    >
      <Text style={[{color: Colors.navyBlueText}, styles.text]} >{title.toUpperCase()}</Text>
    </Pressable>
  )
}

/**
 * 
 * @param {string} title - string- title of the button
 * @param {function} onPress - function
 * @param {boolean} disabled - boolean
 * @param {string} size - enum('small', 'medium', 'large')
 * @param {object} styleObj - object - View (Pressable) style props
 * @returns Button
 */
export const ButtonOutline = ({title, onPress, disabled, size, styleObj }) => {
  return (
    <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({pressed})=> [
      { borderColor: pressed|| disabled? Colors.navyBlueTransparent: Colors.navyBlue },
      styles.secondary,
      styles[size],
      styleObj      
    ]}
    >
      <Text style={[{color: Colors.navyBlueText}, styles.text]} >{title.toUpperCase()}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
  primary: {
    color: Colors.white,
    borderRadius: 8,
    padding: 10
  },
  secondary: {
    color: Colors.navyBlueText,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
  },
  small: {},
  medium: {
    minWidth: '60%',
  },
  large: {
    minWidth: '85%'
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold'
  }

})
