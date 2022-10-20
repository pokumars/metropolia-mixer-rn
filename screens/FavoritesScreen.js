import React from 'react'
import { SafeAreaView, StyleSheet, View, FlatList, Dimensions } from 'react-native'
import CustomStatusBar from '../components/CustomStatusBar'
import { useSelector } from 'react-redux'
import DrinkItem from '../components/DrinkItem'
import Colors from '../constants/Colors'
import { drinkItemMargin, drinkItemWidth } from '../constants/constants'
import TitleText from '../components/TitleText'


const window = Dimensions.get("window");
const FavoritesScreen = (props) => {
    //TODO: check if state has alldrinks. If not fetch them. meanwhile, have a spinner
    const drinks = useSelector(state => state.drinks.allDrinks);
    const favouriteDrinkIds = useSelector(state => state.drinks.favourites);
    const favouriteDrinks = drinks.filter((drink) => {
      return favouriteDrinkIds.indexOf(drink.id) != -1
    })
    console.log('favouriteDrinkIds', favouriteDrinkIds);
  
    const renderDrinkItem = ({ item }) => (
      <DrinkItem drink={item} onSelectDrinkItem={() => {props.navigation.navigate('DrinkRecipe', {
        drinkName: item.name,
        drinkId: item.id
      })}}/>
    )

  return (
    <SafeAreaView style={styles.screen} >
      <CustomStatusBar />
      <View style={styles.listContainer} >

        {
          favouriteDrinkIds.length < 1
            ? (
              <TitleText style={styles.zeroLikedText} >
                You have 0 liked drinks. Open a drink recipe and click the like button and it will appear here
              </TitleText>)
            : (
              <FlatList
                numColumns={Math.floor(window.width / (drinkItemWidth + drinkItemMargin))}
                data={favouriteDrinks}
                renderItem={renderDrinkItem}
                style={{ width: '100%' }}
                contentContainerStyle={{ alignItems: 'center' }}
              />
            )
        }
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
  zeroLikedText: {
    paddingHorizontal:'10%'
  }
})

export default FavoritesScreen

