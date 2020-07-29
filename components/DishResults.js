import React,{Component,useEffect,useState} from 'react'
import {View,Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import CardItem from './CardItem'

export default function DishResults(props){

	///console.log(props.dishes)
	return(
		<View style={{width:'100%'}}>
			<FlatList 
				data={props.dishes}
				contentContainerStyle={{flexGrow: 1,width:'100%',alignItems:'center'}}
        		renderItem={({item:dishID})=>{return <CardItem dishID={dishID}/>} }
        		keyExtractor={(item,index)=>index.toString()}
        		showsVerticalScrollIndicator={false}
        	/>
		</View>
	)

}


