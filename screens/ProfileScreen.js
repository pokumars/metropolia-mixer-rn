import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import CustomStatusBar from '../components/CustomStatusBar'
import { tokenKeyInSecureStore } from '../constants/constants'
import { deleteFromSecureStore } from '../helpers/helperFunctions'
import { wipeToken } from '../state-mgmt/actions/authActions'

const BorderlessActionItem = ({title, onPress}) => {
  return (
    <Pressable  onPress={onPress} 
      style={({pressed}) => [
        styles.borderlessActionItem,
        {
          backgroundColor: pressed? '#ccc': null
        }
      ]}
    >
      <Text style={styles.actionText}>{title}</Text>
    </Pressable>
  )
}


const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen} >
      <CustomStatusBar />
      <BorderlessActionItem title='Log Out' onPress={() => {
        //removes user object in redux store which triggers the logging out in RootNavigator
        dispatch(wipeToken());
        /*remove the token from securestore so that the startup screen will direct you
        to SignInScreen*/
        deleteFromSecureStore(tokenKeyInSecureStore);
      }} />
    </View>
  )
}

const styles = StyleSheet.create({
  borderlessActionItem: {
    paddingVertical:10,
    paddingLeft: 30,
    width: '100%'
  },
  actionText:{
    fontWeight: '700',
    fontSize: 20
  },
  screen:{
    flex:1,
  }
});

export default ProfileScreen