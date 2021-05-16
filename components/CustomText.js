import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CustomText = (props) => {
  return (
      <Text style={[styles.style, props.style]} >{props.children}</Text>
  )
}

export default CustomText

const styles = StyleSheet.create({
  style:{
    fontFamily: 'Poppins-Regular'
  }
})
