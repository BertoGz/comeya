import React,{useState,useEffect} from 'react'
import {View,Text,Image,StyleSheet, FlatList,Animated,Easing} from 'react-native'
import {useSelector} from 'react-redux'
import CardItem from './CardItem'

import {white,cream,black,goodBlue} from '../utils/colors'


export default function CategoryResultPage(props){
	var _isMounted = false
	const [init,setInit] = useState(true)
	const [dishes,setDishes] = useState([])

	useEffect(()=>{
		
		_isMounted=true

		if (init){		
			getDishesId()
		}
			return ()=>{
				_isMounted=false
			}
	},[init])

	function getDishesId(){
					fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/food-id.JSON')
					.then(response=>response.json())
					.then(data=>{
						if(_isMounted){					
							setDishes(data)
							
						}})
					.catch((error)=>{console.log('error')})
		
	}

	return(
		dishes.length!==0 &&
		<View style={{width:'100%'}}>
			<DishResults dishes={dishes}/>
		</View>

	)
}

//renders dish items from id's
function DishResults(props){

	///console.log(props.dishes)
	return(
		<View style={{width:'100%'}}>
			{<FlatList 
				data={props.dishes}
				contentContainerStyle={{flexGrow: 1,width:'100%',alignItems:'center'}}
        		renderItem={({item:dishID})=>{return <CardItem dishID={dishID}/>} }
        		keyExtractor={(item,index)=>index.toString()}
        		showsVerticalScrollIndicator={false}
        	/>}
		</View>
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
	listAmount:{
		textAlign:'right',
		fontWeight:'bold',
		color: cream,

	}
})