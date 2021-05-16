import React from 'react'
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import Colors from '../constants/Colors'
import { drinkItemMargin, drinkItemWidth } from '../constants/constants'

const DrinkItem = (props) => {
  const {drink, onSelectDrinkItem} = props
  return (
    <Pressable
    style={styles.container}
    onPress={onSelectDrinkItem}
    >
      <Image source={{uri: drink.imageUrl}}  style={styles.image} />
      <View style={styles.textContainer} >
        <Text style={styles.text}
          numberOfLines={2}
          ellipsizeMode={Platform.OS === "android"? "tail": "middle"}
        >
          {drink.name.toUpperCase()}
        </Text>
      </View>
    </Pressable>
  )
}
//{'Long Island Iced Tea'.toUpperCase()} {drink.name.toUpperCase()}
const styles = StyleSheet.create({
  container: {
    margin: drinkItemMargin,
    elevation: 3,//Android - elevation style property does not work without backgroundColor
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 5
  },
  image: {
    width: drinkItemWidth,
    height: drinkItemWidth
  },
  text: {
    color: 'black',
    backgroundColor: Colors.inputBgGrey,
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    textAlign: 'center'
  },
  textContainer: {
    height:50,
    width: drinkItemWidth,
    backgroundColor: Colors.inputBgGrey,
    justifyContent: 'center'

  }
});
export default DrinkItem