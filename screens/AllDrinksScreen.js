import React, { useState, useEffect } from 'react'
import { Dimensions, SafeAreaView, StyleSheet, View, FlatList, TextInput } from 'react-native'
import { useSelector } from 'react-redux'
import CustomStatusBar from '../components/CustomStatusBar'
import CustomText from '../components/CustomText'
import DrinkItem from '../components/DrinkItem'
import Colors from '../constants/Colors'
import { drinkItemMargin, drinkItemWidth, FIND_BY_NAME } from '../constants/constants'
import { deepSearch } from '../helpers/helperFunctions'

const window = Dimensions.get("window");

const AllDrinksScreen = (props) => {
  //TODO: check if state has alldrinks. If not fetch them. meanwhile, have a spinner
  const drinks = useSelector(state => state.drinks.allDrinks);
  const faves = useSelector(state => state.drinks.favourites);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([...drinks]);
  const [searchCriteria, setSearchCriteria] = useState(FIND_BY_NAME);

  useEffect(() => {
    setSearchResults([...drinks])
  }, [drinks])

  console.log('faves.length', faves.length);

  const renderDrinkItem = ({ item }) => (
    <DrinkItem drink={item} onSelectDrinkItem={() => {props.navigation.navigate('DrinkRecipe', {
      drinkName: item.name,
      drinkId: item.id
    })}}/>
  )

  console.log('searchResults.length', searchResults.length);

  const onChangeSearchQuery= (text) => {
    setSearchQuery(text);
    setSearchResults(deepSearch(drinks, searchCriteria, text));
  }

  return (
    <SafeAreaView style={styles.screen} >
      <CustomStatusBar />
      <View style={styles.listContainer} >
        <TextInput
          onChangeText={text => onChangeSearchQuery(text)}
          value={searchQuery}
          style={styles.searchTextInput}
          placeholder={'search drinks'}
        />
        <FlatList
          numColumns={Math.floor(window.width / (drinkItemWidth + drinkItemMargin))}
          data={searchResults}
          renderItem={renderDrinkItem}
          style={{ width: '100%' }}
          contentContainerStyle= {{ alignItems: 'center'}}
          ListHeaderComponent={searchQuery.trim().length <1 ? null: <CustomText>There were {searchResults.length} results</CustomText>}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.whiteScreenBg
  },
  listContainer:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextInput: {
    fontFamily: 'Poppins-Regular',
    backgroundColor:Colors.inputBgGrey,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    
    paddingLeft: 15,
    paddingVertical: 3,
    marginVertical: 10,
    width:'90%'
  },

});

export default AllDrinksScreen

