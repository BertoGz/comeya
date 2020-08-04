import React,{useState,useMemo,useEffect} from 'react'
import {View,Text,StyleSheet,ScrollView,FlatList,TouchableOpacity} from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HeaderRight from './HeaderRight'
import CategoryResultPage from './CategoryResultPage'
import {white,cream,black,goodBlue,darkCream} from '../utils/colors'
import {getCategoriesFromServer} from '../utils/api'

const Stack = createStackNavigator();
export default function BrowseTabView(){
	const [tags,setTags] = useState([])


	


	return(

		<View style={{width:'100%',height:'100%'}}>
			
				<Stack.Navigator
					screenOptions={{headerRight:()=><HeaderRight/>,
				    headerStyle:{backgroundColor:goodBlue,height:100,borderBottomColor: 'rgba(0,0,0,.25)',
					borderBottomWidth: 2}
				  }}>
					<Stack.Screen name="Main" children={()=><Main setTags={setTags}/>} 
					options={{  headerTitle: 'Browse',headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerTintColor:'black' }}/>
					<Stack.Screen name="ResultCategory" 
					options={{ headerTitle: 'Browse',headerTitleStyle: {fontSize:24,fontWeight:'normal'},headerBackTitle:'Back', headerTintColor:'black' }} 
					children={()=><CategoryResultPage />} 
					/>
				</Stack.Navigator>
		
		</View>
	)


}


//shows a page with category icons
function Main({setTags}){
		const [categories,setCategories] = useState([])
		var _isMounted = false

	useEffect(()=>{
		console.log('mounted')
		_isMounted=true
			getCategoriesFromServer().then(({categories})=>{
				if (_isMounted){
				setCategories(categories)
				}	
			}
		)
		return ()=>{
			_isMounted=false
		}
	},[])

	if (categories.length===0){
		return (
			<View style={{height:'100%',justifyContent:'center',alignItems:'center'}}><Text>Fetching...</Text></View>
		)
	}
	return(
			<View style={{backgroundColor:cream}}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:20,flexGrow: 1,flexWrap:'wrap',flexDirection:'row'}}>
				{
					Object.values(categories).map((item,index)=>{return<CategoryIcon key={index} category={item} setTags={setTags}/>})
				}
				</ScrollView>
			</View>
	)
}



function CategoryIcon({category,setTags}){
	const navigation = useNavigation();
	const handleNavigation=()=>{
		navigation.push("ResultCategory");
		setTags(category.tags)

	}

	return(
			<View style={styles.card}>
				<TouchableOpacity style={styles.container} onPress={handleNavigation}>
				<View style={styles.container}>
					<Text style={{fontSize:18,paddingBottom:20}}>{category.title}</Text>
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






