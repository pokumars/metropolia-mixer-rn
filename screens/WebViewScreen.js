import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
  return (
    <WebView source={{ uri: 'https://mixerlogic.herokuapp.com' }} style={{}} />
  )
}

export default WebViewScreen

const styles = StyleSheet.create({})
