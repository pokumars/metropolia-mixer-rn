import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
/**
 * 
 * @author: Oheneba Poku-Marboah
 * @param {string} size ('h1', ... 'h5') h1= 5*6; h5=1*6 
 * @returns {<Text>} Text Input that is boldened
 */
const TitleText = (props) => {
  return (
    <View>
      <Text style={{...styles[props.size],...styles.textStyle, ...props.style}}>
        {props.children}
      </Text>
    </View>
  )
}

export default TitleText
const fontMultiple = 6;

const styles = StyleSheet.create({
  h1:{fontSize: 5*fontMultiple},
  h2:{fontSize: 4*fontMultiple},
  h3:{fontSize: 3*fontMultiple},
  h4:{fontSize: 2*fontMultiple},
  h5:{fontSize: 1*fontMultiple},
  textStyle: {
    fontFamily: 'Poppins-Bold',
    paddingBottom: 5,
  }
})
