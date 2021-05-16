import React from 'react'
import { StatusBar, } from 'react-native'
import Colors from '../constants/Colors'

const CustomStatusBar = () => {
  return (
    <StatusBar backgroundColor={Colors.primaryGreenDark} />
  )
}

export default CustomStatusBar;