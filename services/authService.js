import {  baseUrl } from "../constants/constants";

/**
 * 
 * @param {object} credentials - object {username, password}
 * @returns 
 */
export const signIn =async (credentials) => {
  console.log('credentials',credentials);
 const response = await fetch(`${baseUrl}/api/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  })
  .catch(error => console.error('Error in authService/signIn()------------------- ',error));
  
  //console.log('from fetch signIn', await response.json() )
  if(response.status === 200){
    return response.json();
  }
  else if(response.status === 401) {//password mismatch or no such user
    console.log("-------------password mismatch or no such user since response status is 401--------");
    //console.log("------response.status === 401");
    return response.json();
  }
  else{
    return {message: "Something went wrong."}
  }
  
}

export const getUserObj = async (token) => {
  //console.log('from -----getUserObj-------',token)
  const response = await fetch(`${baseUrl}/api/users/`,{
    method: 'POST',
    headers: {
      Authorization: `bearer ${token}`
    },
  })
  .catch(error => console.log('------getUserObj() error--------', error))

  if(response.status=== 200) {
    return response.json();
  } else{
    console.log('------getUserObj() error-------- response.status was not 200')
    return 
  }
}
