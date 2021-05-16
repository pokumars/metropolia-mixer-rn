import { baseUrl } from "../constants/constants";

export const getAllDrinksFromBackend = async ()=> {
  //console.log('running getAllDrinksFromBackend')
  const response = await fetch(`${baseUrl}/api/drinks`)
    .catch(error => console.log('error', error));

    return response.json()
};


//like drink
/**
 * 
 * @param {string} drinkId id of the drink
 * @param {string} token token
 * @returns {object} updatedUser
 */
export const likeDrink = async (drinkId, token) => {
  console.log('likeDrink, id and token', drinkId, token );
  
  try {
    const response = await fetch(`${baseUrl}/api/users/like-drink/${drinkId}`, {
      method: 'PUT',
      headers: {
        Authorization: `bearer ${token}`
      }
    });
    
    return await response.json();
  } catch (error) {
    return console.log('error', error);
  }
}


//unlike drink
/**
 * 
 * @param {string} drinkId id of the drink
 * @param {string} token token
 * @returns {object} updatedUser
 */
 export const unlikeDrink = async (drinkId, token) => {
  console.log('unlikeDrink, id and token', drinkId, token );
  
  try {
    const response = await fetch(`${baseUrl}/api/users/unlike-drink/${drinkId}`, {
      method: 'PUT',
      headers: {
        Authorization: `bearer ${token}`
      }
    });
    
    return await response.json();
  } catch (error) {
    return console.log('error', error);
  }
}
