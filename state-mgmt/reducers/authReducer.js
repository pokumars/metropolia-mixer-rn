import { GET_USER_FROM_SERVER_THRU_TOKEN, SAVE_USER_AND_TOKEN,
   WIPE_TOKEN, UNLIKE_DRINK, LIKE_DRINK } from "../actions/authActions";

const initialState =   {
  token: null,
  user: {
    favourites: [],
    myApprovedDrinkRecipes: [],
    myPendingDrinkRecipes: [],
    username: null,
    email: null,
    id: null
  },
  authErrorMessage: null
}


 const authReducer =(state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER_AND_TOKEN:
      console.log('inside authReducer()---- action.loginResponseObj ', action.loginResponseObj)

      if(action.loginResponseObj.message) {
        console.log('-----------in authReducer, logging in to get user and token failed ')
        return { ...state, authErrorMessage: action.loginResponseObj.message  };
      }

      if(action.loginResponseObj === undefined) {
        console.log('-----------in authReducer, logging in to get user and token failed ')
        return state
      }
      //on success remember to set authErrorMessage to null
      return { user: action.loginResponseObj.user, token:action.loginResponseObj.token, authErrorMessage: null  };
    
    case GET_USER_FROM_SERVER_THRU_TOKEN:
      if(action.payload !== undefined) {
        //console.log('-----action.payload', action.payload)
        //return { ...state }
        return { ...state, user: action.payload.user, token:action.payload.token  }
      } else {
        return state
      }
    case WIPE_TOKEN: 
      return initialState
    case LIKE_DRINK:
      if(action.payload !== undefined) {
        //console.log('-----action.payload', action.payload)
        //return { ...state }
        const TempUser = state.user
        
        return { ...state, user:{...TempUser, favourites: action.payload.updatedUser.favourites}  }
      } else {
        return state
      }
    case UNLIKE_DRINK:
      if(action.payload !== undefined) {
        //console.log('-----action.payload', action.payload)
        //return { ...state }
        return { ...state, user: action.payload.user  }
      } else {
        return state
      }
    default:
      return state;;
  }
}

export default authReducer