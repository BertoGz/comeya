import React,{Component,useEffect,useState} from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'
import {connect,useSelector,useDispatch} from 'react-redux'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import CategoryResultPage from './CategoryResultPage'
import ListTabView from './ListTabView'
import MenuOptions from './MenuOptions'
import TestObj from'./TestObj'
import BrowseTabView from './BrowseTabView'
import { AntDesign,Feather } from '@expo/vector-icons'
import {white,cream,black,goodBlue} from '../utils/colors'
import {handleSetCurrentUserAction} from '../actions/user'
import {handleSetCurrentListAction} from '../actions/currentList'


const Tab = createBottomTabNavigator();
export default function Index(){

	const [dishesID,setDishesID] = useState([])
	const currentList = useSelector(state => state.currentList)
	const user = useSelector(state => state.user)

	const authedUser = 'bertogz'

	const dispatch = useDispatch();

	useEffect(()=>{
		dispatch(handleSetCurrentUserAction(authedUser))
		dispatch(handleSetCurrentListAction('list1'))

		fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/food-id.JSON')
		.then((response) => response.json()).then((data)=>setDishesID({dishesID:data}))

	},[])

		
		if(dishesID.length===0 || !user.id ){
			console.log('empty')
			return null
		}

		return(
			<NavigationContainer> 
				<Tab.Navigator
				  tabBarOptions={{activeTintColor:'white',inactiveBackgroundColor: 'white',
         			 activeBackgroundColor:goodBlue}}>

					<Tab.Screen name='home'
					options={{ title:'Browse',  
            		tabBarIcon: () => ( <AntDesign name="home" color={black} size={22} /> )}} 

					children={()=><BrowseTabView/>}
					/>

					<Tab.Screen name='List'
					options={{ title:'List',  
           			tabBarIcon: () => ( <Feather name="list" color={black} size={22} /> )}} 
					
					children={()=><ListTabView currentList={currentList} dishes={user.lists[currentList]}/>}
					/>
					

				</Tab.Navigator>
				<MenuOptions/>
			</NavigationContainer> 

		)
}




