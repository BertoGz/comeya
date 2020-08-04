import React,{useState,useEffect,useLayoutEffect,} from 'react'
import {useSelector,useDispatch,} from 'react-redux'

import {View,Text,TouchableWithoutFeedback,TouchableOpacity,StyleSheet,LayoutAnimation,UIManager} from 'react-native'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {handleOpenSettingsGroceryItemAction,handleCloseSettingsGroceryItemAction} from '../actions/menuOptions'

import { AntDesign,Feather } from '@expo/vector-icons'
import {pink,cream,darkCream,goodBlue,gray} from '../utils/colors'




export default function TestObj(){


		const Tab = createBottomTabNavigator();
		return(
			<NavigationContainer> 
				<Tab.Navigator
				  tabBarOptions={{
				  	activeTintColor:'white',
          			inactiveBackgroundColor: 'white',
         			 activeBackgroundColor:goodBlue
        			}}
				>

					<Tab.Screen name='home'
					options={{ title:'Browse',  
            		tabBarIcon: () => ( <AntDesign name="home" color={'black'} size={22} /> )}} 

					//children={()=><CategoryResultPage dishes={this.state.dishesID}/>}
					component={Screen1}
					/>

					<Tab.Screen name='List'
					options={{ title:'List',  
           			tabBarIcon: () => ( <Feather name="list" color={'black'} size={22} /> )}} 
					
					component={Screen2}
					/>
					

				</Tab.Navigator>
			</NavigationContainer> 

		)

}
	const Stack = createStackNavigator();
const Screen1 = () =>{

	const [tags,setTags] = useState(false)
	useEffect(()=>{
		console.log('screen 1 mounted')
	},[])
 
	return(
		<View style={{width:'100%',height:'100%',backgroundColor:'red'}}>
			<Stack.Navigator
					screenOptions={{
				    headerStyle:{backgroundColor:goodBlue,height:100,borderBottomColor: 'rgba(0,0,0,.25)',
					borderBottomWidth: 2}
				  }}>
					<Stack.Screen name="Main" children={()=><Main/>} options={{ headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerTintColor:'black' }}/>
					<Stack.Screen name="Result" 
					options={{headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerBackTitle:'Back', headerTintColor:'black' }} 
					children={()=><Result setTags={setTags}/>}
					/>

					<Stack.Screen name="Result2" 
					options={{headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerBackTitle:'Back', headerTintColor:'black' }} 
					component={Result2}
					/>
			</Stack.Navigator>
		</View>
	)
}


const Main = () =>{
		useEffect(()=>{
		console.log('main mount')
	},[])

	const navigation = useNavigation()

	return(
		<View style={{width:'100%',height:'100%',backgroundColor:'teal',alignItems:'center',justifyContent:'center'}}>
			<Text style={{fontSize:22,color:'white'}}>Main Page</Text>
			<TouchableOpacity onPress={()=>{navigation.push("Result")}}>
				<View style={{width:100,height:60,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
					<Text>Navigate</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}
const Result = ({setTags}) =>{
	useEffect(()=>{
		console.log('result mount')
	},[])
	const navigation = useNavigation()
	return(
		<View style={{width:'100%',height:'100%',backgroundColor:'purple',alignItems:'center',justifyContent:'center'}}>
			<Text style={{fontSize:22,color:'white'}}>Result Page</Text>
			<TouchableOpacity onPress={()=>{navigation.push("Result2"), setTags(true)}}>
				<View style={{width:100,height:60,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
					<Text>Navigate Next</Text>
				</View>
			</TouchableOpacity>
		</View>
	)
}
const Result2 = () =>{
	useEffect(()=>{
		console.log('result2 mount')
	},[])
	return(
		<View style={{width:'100%',height:'100%',backgroundColor:'brown',alignItems:'center',justifyContent:'center'}}>
			<Text style={{fontSize:22,color:'white'}}>Result2 Page</Text>

		</View>
	)
}


const Screen2 = () =>{
	return(
		<View style={{height:'100%',backgroundColor:'blue',alignItems:'center',justifyContent:'center'}}>
		<Text style={{fontSize:22,color:'white'}}>Screen 2</Text>
		</View>
	)
}
