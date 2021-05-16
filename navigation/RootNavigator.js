import React from 'react'
import { useSelector } from 'react-redux'
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";


const RootNavigator = () => {

  let user = useSelector(state => state.user.user.username);
  /*if user is logged in and can be found in the redux store, then switch to the
   MainNavigator else go to AuthNavigator*/
   
   return (
    user ? (<MainNavigator /> ): (<AuthNavigator /> )
    )
  

}

export default RootNavigator

