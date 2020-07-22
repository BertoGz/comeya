import React,{Component, useState} from 'react'
import {View,Text, FlatList,StyleSheet,TouchableWithoutFeedback} from 'react-native'
import GroceryListItem from './GroceryListItem'
import {connect} from 'react-redux'
import {white,cream,goodBlue} from '../utils/colors' 

export default function GroceryList(props){

	const [optionsToggled,setOptionsToggled] = useState(false)

	const handleSetOptionsToggled=()=>{
		setOptionsToggled(true)
	}

	if (props.dishes.length===0){
		return(
			<View style={{height:'100%',width:'100%', justifyContent:'center',alignItems:'center'}}>
				<Text  style={{fontSize:18,textAlign:'center',fontWeight:'bold'}}> No Foods added yet ): </Text>
			</View>
		)
	}

	return(
		<View style={{height:'100%',width:'100%', alignItems:'center'}}>
			{ optionsToggled &&
				<OptionsMenu setOptionsToggled={setOptionsToggled}/>
			}
			<ViewHeading/>

			<View style={{height:'100%',backgroundColor:cream}}  >
				<View style={{justifyContent:'center',alignItems:'center'}}>
					<Text style={{fontSize:28}}>{props.currentList}</Text>
				</View>
				<View style={{justifyContent:'center',maxHeight:'100%'}}>
	      				<FlatList data={props.dishes} 
	      				contentContainerStyle={{paddingBottom:200}}
	      				renderItem={({item:dishID})=>{return <GroceryListItem dishID={dishID} setOptionsToggled={handleSetOptionsToggled}/>}}
	      				keyExtractor={(item,index)=>index.toString()}
	      				showsVerticalScrollIndicator={false}/>
				</View>
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
	},
	optionsMenuContainer:{

		width:'100%',
		height:'100%',
		backgroundColor:'black',
		position:'absolute',
		zIndex: 1,
		opacity:.5,
	}
})

