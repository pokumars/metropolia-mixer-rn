import { getAllDrinksFromBackend } from "../../services/drinkService";
import { likeDrink, unlikeDrink } from "../../services/drinkService";


export const GET_ALL_DRINKS = 'GET_ALL_DRINKS';
export const GET_ONE_DRINK = 'GET_ONE_DRINK';
export const INITIALIZE_FAVOURITES = 'INITIALIZE_FAVOURITES';
export const UNLIKE_DRINK = 'UNLIKE_DRINK';
export const LIKE_DRINK = 'LIKE_DRINK';




export const getAllDrinksToStore = () => {

  return async (dispatch) => {
    try {
      const returnedDrinks = await getAllDrinksFromBackend();

      //console.log('----returnedDrinks----',returnedDrinks.length)

      return dispatch({ type: GET_ALL_DRINKS, drinks: returnedDrinks });

    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const passInitialFavouritesToState= (favArr) => {
  return { type: INITIALIZE_FAVOURITES, payload: {favourites: favArr}}
}

/**
 * 
 * @param {string} drinkId id of the drink
 * @param {string} token token
 * @returns {object}  {updatedUser: {}}
 */
 export const likeDrinkInBackend =(drinkId, token) => {
  return async (dispatch) => {
    const updatedUser = await likeDrink(drinkId, token);
    //console.log('getUserFromBackendBasedOnToken user----',user)
    return dispatch({ type: LIKE_DRINK, payload: updatedUser});
  }
}

/**
 * 
 * @param {string} drinkId id of the drink
 * @param {string} token token
 * @returns {object}  {updatedUser: {}}
 */
 export const unlikeDrinkInBackend =(drinkId, token) => {
  return async (dispatch) => {
    const updatedUser = await unlikeDrink(drinkId, token);
    //console.log('getUserFromBackendBasedOnToken user----',user)
    return dispatch({ type: UNLIKE_DRINK, payload: updatedUser });
  }
}



