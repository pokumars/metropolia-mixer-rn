import { tokenKeyInSecureStore } from "../../constants/constants";
import { saveToSecureStore } from "../../helpers/helperFunctions";
import { getUserObj, signIn, } from "../../services/authService";

export const WIPE_TOKEN = 'WIPE_TOKEN';
export const SAVE_USER_AND_TOKEN = 'SAVE_USER_AND_TOKEN';
export const GET_USER_FROM_SERVER_THRU_TOKEN = 'GET_USER_FROM_SERVER_THRU_TOKEN' 

export const saveUserAndToken =(credentials)=> {
  return async (dispatch) => {
    const user = await signIn(credentials)
    user.token && await saveToSecureStore(tokenKeyInSecureStore, user.token)
    console.log('loginResponseObj', user)
    return dispatch({ type: SAVE_USER_AND_TOKEN, loginResponseObj: user });
  }
}

//if we have the token in secureStore, use that to get the user obj from server
export const getUserFromBackendBasedOnToken = (token) => {
  return async (dispatch) => {
    const user = await getUserObj(token);
    //console.log('getUserFromBackendBasedOnToken user----',user)
    return dispatch({ type: GET_USER_FROM_SERVER_THRU_TOKEN, payload: {user: user, token: token}});
  }
}

export const wipeToken =()=> {
  return { type: WIPE_TOKEN }
}

