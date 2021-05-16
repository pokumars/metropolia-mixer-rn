import React from 'react'
import { SafeAreaView, StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CustomStatusBar from '../components/CustomStatusBar'
import TitleText from '../components/TitleText'
import Colors from '../constants/Colors'
import { capitaliseFirstLetter, joinWithAnd } from '../helpers/helperFunctions'
import { Ionicons } from '@expo/vector-icons';
import { likeDrinkInBackend, unlikeDrinkInBackend } from '../state-mgmt/actions/drinksActions'

const IngredientItem = ({ingredient}) => {
  return (
    <View style={[styles.ingredientItem, styles.inRow]} >
      <View style={styles.ingredientAmount} >
        <Text style={{ paddingRight: 10, fontFamily: 'Poppins-Regular' }}>{ingredient[1]} {ingredient[2]}</Text>
      </View>
      <View style={styles.ingredientName} >
        <Text style={{ fontFamily: 'Poppins-Regular' }}>{ingredient[0]}</Text>
      </View>
    </View>
  )
}
const StepItem = ({step, index}) => {
  return (
    <View style={[styles.stepItem, styles.inRow]} >
      <Text style={{ fontFamily: 'Poppins-Regular' }} >{index + 1}. </Text>
      <Text style={{ fontFamily: 'Poppins-Regular' }} >{step}</Text>
    </View>
  );
}
const ExtraDetails = ({ drink }) => {
  return (
    <View style={styles.extraDetails} >
      <View style={[styles.inRow]} >
        <TitleText size='h4' style={styles.extraDetailsTitle} >Glass: </TitleText>
        <Text style={styles.extraDetailsValue} >{capitaliseFirstLetter(drink.glass)}</Text>
      </View>
      <View style={[styles.inRow]} >
        <TitleText size='h4' style={styles.extraDetailsTitle} >Method: </TitleText>
        <Text style={styles.extraDetailsValue} >{joinWithAnd(drink.method.map(m => capitaliseFirstLetter(m)))}</Text>
      </View>
      <View style={[styles.inRow]} >
        <TitleText size='h4' style={styles.extraDetailsTitle} >Garnish: </TitleText>
        <Text style={styles.extraDetailsValue} >{joinWithAnd(drink.garnish.map(g => capitaliseFirstLetter(g)))}</Text>
      </View>
    </View>
  )
}

const DrinkRecipeScreen = (props) => {
  const drinks = useSelector(state => state.drinks)
  const user = useSelector(state => state.user)
  const favourites = drinks.favourites
  const { drinkId } = props.route.params
  const drinkObj = drinks.allDrinks.find((d) => d.id === drinkId);
  console.log('favourites in DrinkRecipeScreen',favourites);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.screen} >
      <CustomStatusBar />
      <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollViewContentContainer} >
        <View style={styles.recipeContainer}>
          <View style={[styles.imageContainer, styles.inRow]} >
            {
              favourites.indexOf(drinkObj.id) === -1
              ? <Ionicons name="heart-outline" size={32} color={Colors.navyBlue}
               onPress={()=> dispatch(likeDrinkInBackend(drinkObj.id, user.token))}
               />
              : <Ionicons name="heart" size={32} color={Colors.warningRed}
               onPress={()=> dispatch(unlikeDrinkInBackend(drinkObj.id, user.token))}
               />
            }
            <Image style={styles.image} source={{ uri: drinkObj.imageUrl }} />
          </View>
          <TitleText size='h3' >{drinkObj.name.toUpperCase()}</TitleText>
          
          <View style={styles.ingredientsContainer} >
            <TitleText size='h4' style={{ textAlign: 'center' }} >Ingredients</TitleText>
            {
              drinkObj.ingredients.map(ing => (<IngredientItem ingredient={ing}  key={ing[0]} />))
            }
          </View>
          <View style={styles.stepsContainer} >
            <TitleText style={{ textAlign: 'center' }} size='h4' >HOW TO MIX</TitleText>
            {
              drinkObj.steps.map((step,index) => <StepItem step={step} index={index} key={index} /> )
            }
          </View>


          <ExtraDetails drink={drinkObj} />
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const imageDimensions = 175;
const styles = StyleSheet.create({
  screen:{
    flex:1,
    backgroundColor: Colors.whiteScreenBg
  },
  stepsContainer:{
    marginVertical: 15,
    marginHorizontal: 20,
    marginLeft:25,
  },
  stepItem: {
    width: '100%',
    paddingBottom: 10
  },
  ingredientsContainer:{
    width: '100%',
    marginHorizontal: 20,
    marginLeft:25,
    marginVertical: 15,
    alignItems: 'center',
  },
  scrollViewContentContainer:{
    alignItems: 'center',
    paddingVertical: 30
  },
  recipeContainer: {
    backgroundColor: Colors.lemon,
    paddingVertical: 20,
    paddingBottom:50,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom:16
  },
  image: {
    height: imageDimensions,
    width:imageDimensions,
    maxWidth:imageDimensions,
    maxHeight:imageDimensions,
    marginLeft: 15
  },
  ingredientItem: {
    marginVertical:5,
    width: '90%',
    minWidth: 200
  },
  ingredientAmount: {
    flex: 1,
    //borderWidth: 1,
    //borderColor: Colors.warningRed
  },
  ingredientName: {
    flex: 4,
    //borderWidth: 1,
    //borderColor: Colors.warningRed
  },
  extraDetails: {
    backgroundColor: Colors.navyBlue,
    width: '100%',
    paddingLeft: 25,
    paddingVertical: 5,
  },
  extraDetailsTitle: {
    color: Colors.white,
    paddingBottom: 0,
  },
  extraDetailsValue: {
    color: Colors.white,
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  inRow: {
    display: 'flex',
    flexDirection: 'row'
  },
});

export default DrinkRecipeScreen

