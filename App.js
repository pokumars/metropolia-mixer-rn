import React, { useState }  from 'react';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import drinksReducer from './state-mgmt/reducers/drinksReducer';
import { Provider } from 'react-redux';
import authReducer from './state-mgmt/reducers/authReducer';
import RootNavigator from './navigation/RootNavigator';
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";



const rootReducer = combineReducers({ drinks: drinksReducer, user: authReducer })
const store = createStore(rootReducer, applyMiddleware(thunk));

//const DATA = drinks;


const fetchFonts = () => { 
  return Font.loadAsync({
    'Poppins-Light' : require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  })
}

//<MainNavigator />
const App = () => {

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return(
      <AppLoading 
      startAsync = {fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)} />
    );
  }
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

/**        <FlatList
          data={drinks}
          renderItem={({ item }) => (
            <DrinkItem drink={item} />
          )}
          keyExtractor={item => item.dummyId.toString()}
        /> */



export default App;