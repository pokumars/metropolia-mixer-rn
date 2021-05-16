import { GET_ALL_DRINKS, INITIALIZE_FAVOURITES, LIKE_DRINK, UNLIKE_DRINK } from "../actions/drinksActions";
const initialState = {
  allDrinks: [],
  favourites: [],
}

const drinksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DRINKS:
      return { ...state, allDrinks: action.drinks }
    case INITIALIZE_FAVOURITES:
      return { ...state, favourites: action.payload.favourites }

    case LIKE_DRINK:
      return { ...state, favourites: action.payload.updatedUser.favourites }

    case UNLIKE_DRINK:
      //console.log('action.payload.', action.payload);
      return { ...state, favourites: action.payload.updatedUser.favourites }

    default:
      return state;
  }
};

export default drinksReducer;