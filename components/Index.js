import React,{Component,useEffect,useState} from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {connect} from 'react-redux'

import Search from './Search'
import GroceryList from './GroceryList'
import MenuOptions from './MenuOptions'
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
			<NavigationContainer > 
			<MenuOptions/>
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

					children={()=><Search dishes={this.state.dishesID}/>}
					/>

					<Tab.Screen name='List'
					options={{ title:'Grocery List',  
           			tabBarIcon: () => ( <Feather name="list" color={black} size={22} /> )}} 
					
					children={()=><GroceryList dishes={this.props.user.lists[this.props.currentList]}/>}
					/>
					

				</Tab.Navigator>
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