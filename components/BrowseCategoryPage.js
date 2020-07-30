import React,{useState,useMemo,useEffect} from 'react'
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import BrowseHeading from './BrowseHeading'
import CategoryResultPage from './CategoryResultPage'
import {white,cream,black,goodBlue,darkCream} from '../utils/colors'
import {getCategoriesFromServer} from '../utils/api'

const Stack = createStackNavigator();
export default function BrowseCategoryPage(){


	return(
		<View style={{width:'100%',height:'100%'}}>
			
				<Stack.Navigator
					screenOptions={{
				    headerStyle:{backgroundColor:goodBlue,height:100,borderColor: 'rgba(0,0,0,.25)',
		borderBottomWidth: 2}
				  }}>
					<Stack.Screen name="Main" component={Main} options={{ headerTitle: 'Browse',headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerTintColor:'black' }}/>
					<Stack.Screen name="ResultCategory" 
					options={{ headerTitle: 'Browse',headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerBackTitle:'Back', headerTintColor:'black' }} 
					children={()=><CategoryResultPage/>} 
					/>
				</Stack.Navigator>
		
		</View>
	)
}

//shows a page of different categories
function Main({navigation}){
		const [categories,setCategories] = useState([])

	useEffect(()=>{
		getCategoriesFromServer().then(({categories})=>
			setCategories(categories)
		)			
	},[categories.length])

	if (categories.length===0){
		return (
			<View></View>
		)
	}
	return(
			<View style={{backgroundColor:cream}}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20,flexGrow: 1,flexWrap:'wrap',flexDirection:'row'}}>
				{
					Object.values(categories).map((item,index)=>{return<CategoryIcon key={index} text={item.title} navigation={navigation}/>})
				}
				</ScrollView>
			</View>
	)
}



function CategoryIcon({text,navigation}){
	const handleNavigation=()=>{
		navigation.push("ResultCategory");

	}
	return(
			<View style={styles.card}>
				<TouchableOpacity style={styles.container} onPress={handleNavigation}>
				<View style={styles.container}>
					<Text style={{fontSize:18,paddingBottom:20}}>{text}</Text>
				</View>
				</TouchableOpacity>
			</View>
	)
}

const styles=StyleSheet.create({
	container:{
		width:'80%',height:'90%',
		justifyContent:'flex-end',
		alignItems:'center',
		backgroundColor:darkCream
	},
	card:{
	width:'50%',height:200,
		justifyContent:'flex-end',
		alignItems:'center',
	}
})






