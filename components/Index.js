import React,{Component,useEffect,useState} from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {connect} from 'react-redux'

import CategoryResultPage from './CategoryResultPage'
import GroceryList from './GroceryList'
import MenuOptions from './MenuOptions'
import TestObj from'./TestObj'
import BrowseCategoryPage from './BrowseCategoryPage'
import { AntDesign,Feather } from '@expo/vector-icons'
import {white,cream,black,goodBlue} from '../utils/colors'
import {handleSetCurrentUserAction} from '../actions/user'
import {handleSetCurrentListAction} from '../actions/currentList'

class Index extends Component{
	state={
		dishesID: [],
	}

	componentDidMount(){

		this.props.dispatch(handleSetCurrentUserAction(this.props.authedUser))
		this.props.dispatch(handleSetCurrentListAction('list1'))

		return new Promise((resolve,reject)=>{
			fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/food-id.JSON')
			.then((response) => resolve(response.json()))
		}).then((data)=>this.setState({dishesID:data}))

		
	}



	render(){
		
		if(this.props.loading){
			return null
		}

		const Tab = createBottomTabNavigator();
		return(
			<NavigationContainer> 
				<Tab.Navigator
				  tabBarOptions={{
				  	activeTintColor:'white',
          inactiveBackgroundColor: 'white',
          activeBackgroundColor:goodBlue,

        }}

				>

					<Tab.Screen name='home'
					options={{ title:'Browse',  
            		tabBarIcon: () => ( <AntDesign name="home" color={black} size={22} /> )}} 

					//children={()=><CategoryResultPage dishes={this.state.dishesID}/>}
					children={()=><BrowseCategoryPage/>}
					/>

					<Tab.Screen name='List'
					options={{ title:'Grocery List',  
           			tabBarIcon: () => ( <Feather name="list" color={black} size={22} /> )}} 
					
					children={()=><GroceryList currentList={this.props.currentList}dishes={this.props.user.lists[this.props.currentList]}/>}
					/>
					

				</Tab.Navigator>
				<MenuOptions/>
			</NavigationContainer> 

		)
	}
}





function mapStateToProps({user,currentList}){

	return{
		user,
		currentList,
		loading: Object.values(user).length===0 || !user.lists[currentList],
		authedUser: 'bertogz'
	}
}


export default connect(mapStateToProps)(Index)