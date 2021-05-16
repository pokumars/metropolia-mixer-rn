import * as SecureStore from 'expo-secure-store';
import { FIND_BY_ALCOHOL, FIND_BY_NAME, FIND_BY_METHOD } from "../constants/constants";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

//this puts the correct title when navigatring the tabs. It is necessary after we changed the app to not show some tabs on specific screens
// more here https://reactnavigation.org/docs/screen-options-resolution our reason was reason number 2 (17May2021)
export function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Mixer Logic';

  switch (routeName) {
    case 'Drinks':
      return 'Drinks';
    case 'Favorites':
      return 'Favorites';
    case 'Profile':
      return 'Profile';
  }
}

export const saveToSecureStore = async (key, value)  =>{
  await SecureStore.setItemAsync(key, value);
}

export const getValueInSecureStorage = async (key) => {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log("🔐 Here's your value 🔐 " + result.slice(0, 15));
    
  } else {
    console.log('No values stored under that key.', result);
  }
  return result
}

export const deleteFromSecureStore = async (key) => {
  await SecureStore.deleteItemAsync(key);
}

export const capitaliseFirstLetter = (theString) => { // capitalises the first character of a string
  if (typeof theString !== 'string') return ''// if not a string, return empty string
  return theString.charAt(0).toUpperCase() + theString.slice(1)
}

export const joinWithAnd = (stringArr) => { // join array of strings with commas and add "and" between last 2
  if (stringArr.length < 1) return '-'
  else if (stringArr.length === 1) return stringArr[0]
  else if (stringArr.length > 1) {
    const lastStr = stringArr.pop()
    const result = stringArr.join(', ') + ' & ' + lastStr
    return result
  }
}


/*This is from the web version The only scenario where the no results text will fail to give the message of no results is
when the only results are the 2 with no dummyId property i.e the test drink objects.
If it doesnt show no results message, this should be the only reason why*/
export const noResults = 'There were no results. Try something different';
// if results are found do nothing else show results not found
export const emptyResultsText = (arr) => arr.length < 1 ? noResults : '';

const findDrinksByName = (drinksArr, searchText) => {
  return drinksArr.filter(currDrink => currDrink.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
}

/**
 * 
 * Search array of arrays containing text for partial or full match of the text
 * For example searching by method - parent is the drink object. meth is the drink-making method
 * traverse method array if the query appears in any of the  texts in the array
 * add it to the search results
 * @param {array} arr the array of drinks
 * @param {string} criteria The search criteria
 * @param {string} query what has been typed into the search bar
 * @returns {array} array of drinks
 */
export const deepSearch = (arr, criteria, query) => {
  // @param criteria is the array in which to find the match
  let results = []

  switch (criteria) {
    case FIND_BY_NAME: 
      
    return findDrinksByName(arr, query)
    case FIND_BY_METHOD:

      arr.forEach(parent => {
        if (parent.method.filter(meth => meth.toLowerCase().indexOf(query.toLowerCase()) !== -1).length > 0) {
          results.push(parent)
        }
      })
      return results
    case FIND_BY_ALCOHOL:
      //console.log('searching by alcohol')

      arr.forEach(parent => {
        if (parent.alcohols.filter(alc => alc.toLowerCase().indexOf(query.toLowerCase()) !== -1).length > 0) {
          results.push(parent)
        }
      })
      return results
      // TODO: add find by ingredient
    default:
      return results
  }  
}