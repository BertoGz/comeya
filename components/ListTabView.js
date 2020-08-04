import React,{Component, useState,useEffect} from 'react'
import {View,Text, FlatList,StyleSheet} from 'react-native'
import GroceryListItem from './GroceryListItem'
import {connect} from 'react-redux'
import {white,cream,goodBlue} from '../utils/colors' 

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();
export default function ListTabView(props){

	useEffect(()=>{
		console.log(props.dishes)
	})
	if (props.dishes.length===0){
		return(
			<View style={{height:'100%',width:'100%', justifyContent:'center',alignItems:'center'}}>
				<Text  style={{fontSize:18,textAlign:'center',fontWeight:'bold'}}> No Foods added yet ): </Text>
			</View>
		)
	}

	return(
		<View style={{height:'100%', width:'100%'}}>
			<Stack.Navigator
				screenOptions={{
			    headerStyle:{backgroundColor:goodBlue,height:100,borderBottomColor: 'rgba(0,0,0,.25)',
				borderBottomWidth: 2}
	  		}}>

	  		<Stack.Screen name="Main" children={()=><Home dishes={props.dishes}/>} 
			options={{  headerTitle: 'List',headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerTintColor:'black' }}/>

			</Stack.Navigator>

		</View>
	)
	
}

function Home({dishes}){
	return(
		<View style={{width:'100%',backgroundColor:cream}}  >
						
			<FlatList data={dishes} 
			contentContainerStyle={{paddingBottom:220,flexGrow:1}}
			renderItem={({item:dishID})=> <GroceryListItem dishID={dishID} />}
			keyExtractor={(item) => item}
			showsVerticalScrollIndicator={false}/>
						
		</View>
	)
}


function OptionsMenu({setOptionsToggled}){
	console.log('pees')
	return(
		<TouchableWithoutFeedback onPress={() => setOptionsToggled(false)}>
		<View style={styles.optionsMenuContainer}>
		</View>
		</TouchableWithoutFeedback>
	)
}




const styles=StyleSheet.create({
	container:{
		justifyContent:'center',
		alignItems:'center',
	},
	headingContainer:{
		width:'100%',
		height:100,
		borderColor: 'rgba(0,0,0,.25)',
		borderBottomWidth: 2,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:goodBlue,
	}
})

