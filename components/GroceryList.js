import React,{Component, useState,useEffect} from 'react'
import {View,Text, FlatList,StyleSheet} from 'react-native'
import GroceryListItem from './GroceryListItem'
import {connect} from 'react-redux'
import {white,cream,goodBlue} from '../utils/colors' 

export default function GroceryList(props){

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
		<View style={{width:'100%'}}>
			
			<ViewHeading/>

			<View style={{width:'100%',backgroundColor:cream}}  >
				
				<FlatList data={props.dishes} 
				contentContainerStyle={{paddingBottom:220,flexGrow:1}}
				renderItem={({item:dishID})=> <GroceryListItem dishID={dishID} />}
				keyExtractor={(item) => item}
				showsVerticalScrollIndicator={false}/>
				
			</View>

		</View>
	)
	
}



function ViewHeading(){


	return(
		<View style={styles.headingContainer}>
			<View style={{flexDirection:'row',paddingTop:20,paddingLeft:0}}>
	        	<Text style={{fontSize:24, paddingTop:5,color:white}}>list</Text>
			</View>
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

