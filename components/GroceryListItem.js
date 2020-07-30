import React,{useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {View,Text,TouchableOpacity,Image,LayoutAnimation,StyleSheet} from 'react-native'
import {white, cream, darkCream,goodBlue,black,gray} from '../utils/colors'
import {SimpleLineIcons} from '@expo/vector-icons'; 
import {handleOpenSettingsGroceryItemAction} from '../actions/menuOptions'


export default function GroceryListItem(props){
	var _isMounted = false
	const [dish,setDish] = useState({title:""})
	const [opened,setOpened] = useState(false)
	const dispatch = useDispatch()
	const handlePress=()=>{
		console.log('togggg')
		setOpened(opened?false : true)
		LayoutAnimation.configureNext(CustomLayoutAnimation);
	}



	useEffect(()=>{

		_isMounted=true
		fetchDish()

				return () => { _isMounted=false
			console.log('unmount')
        }
	},[])

	const fetchDish = async() => {

		const apiCall = await fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/foodData.json')
		const dishes = await apiCall.json()
		if(_isMounted){
			console.log('set Dish', props.dishID)
			setDish(dishes[props.dishID] )
		}
	}

	function handleViewOptionsMenu(){
		dispatch(handleOpenSettingsGroceryItemAction(dish.title))
	}

	if (dish.title===""){
		return(
			<View style={{justifyContent:'center',alignItems:'center'}}><Text>Fetching Data...</Text></View>
		)
	}

	return(
		<View style={{width:'100%'}}>

			<View style={styles.itemUpper }> 

					<CardImage image={dish.url}/>
					<TouchableOpacity onPress={handlePress} style={{width:'68%',paddingRight:0}}>
							<CardTitle title={dish.title}/>
					</TouchableOpacity>
		

				<TouchableOpacity style={{justifyContent:'center'}} onPress={handleViewOptionsMenu}>
					<SimpleLineIcons name="options-vertical" size={24}color="black" />
				</TouchableOpacity>
			</View>
			
			
			<View style={styles.ingrediantsContainer}>
			
				<View style={[opened? null : {height:0} , {justifyContent:'center',flexWrap:'wrap'}]}>
				{  dish.title!=="" && 
					dish.ingrediants.map(item=>
								<Text key={item+'2'} style={{fontSize:opened?18:0,paddingTop:0,paddingLeft:30}}>{`\u2022`}{` ${item}` }</Text>
					)
		
				}
				</View>
			</View>
			

		</View>
	)
}



function CardImage({image}){

	return(
		<View style={{alignItems:'center',paddingLeft:10}}>
			<Image
		        style={styles.cardImg}
		        source={{uri:image}}
		      />
		</View>
	)
}
function CardTitle({title}){
	return(
		<View style={{height:'80%',alignItems:'center',flexShrink:1,justifyContent:'center'}}>
			<Text style={{fontSize:20,color:gray,paddingLeft:20,}}>{title}</Text>
		</View>
	)
}



const CustomLayoutAnimation = {
	duration:400,
	create:{
		duration:200,
		property: LayoutAnimation.Properties.opacity,
		type: LayoutAnimation.Types.linear,


	},
	update:{
		duration:400,
		property: LayoutAnimation.Properties.opacity,
		springDamping: 0.6,
		type: LayoutAnimation.Types.spring

	},
	delete:{
		duration:200,
		property: LayoutAnimation.Properties.opacity,
		type: LayoutAnimation.Types.linear,

	}
}



const styles=StyleSheet.create({
	itemUpper:{
		padding:10,
		flexDirection:'row',
		alignItems:'center',
		borderBottomWidth:2,
		borderColor:gray,
		height:100
	},
	ingrediantsContainer:{
		borderColor:gray,
		backgroundColor:darkCream,
		paddingTop:10,
		paddingBottom:10
	},
	cardImg:{
		width:65,
		height:65,
		borderRadius:10,
	},
})
