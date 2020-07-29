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


	return(
		<View style={{width:'100%'}}>
			<View style={opened ? styles.headerOpen : styles.headerClosed }> 
				<View style={{paddingLeft:10,flexDirection:'row'}}>
					<CardImage image={dish.url}/>
					<TouchableOpacity onPress={handlePress} style={{width:'68%',paddingRight:20}}>
						<View>
							<CardTitle title={dish.title}/>
						</View>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={{justifyContent:'center',padding:20}} onPress={handleViewOptionsMenu}>
					<SimpleLineIcons name="options-vertical" size={24} color="black" />
				</TouchableOpacity>
			</View>
			
			{ 
				<View style={styles.ingrediantsContainer}>
				
					<View style={[opened? null : {height:0} , {justifyContent:'center',flexWrap:'wrap'}]}>
					{  dish.title!=="" && 
						dish.ingrediants.map(item=>
									<Text key={item+'2'} style={{fontSize:opened?16:0,paddingLeft:20}}>{` ${item},`}</Text>
						)
			
					}
					</View>
				</View>
			}

		</View>
	)
}



function CardImage({image}){

	return(
		<View style={{alignItems:'center'}}>
			<Image
		        style={styles.cardImg}
		        source={{uri:image}}
		      />
		</View>
	)
}
function CardTitle({title}){
	return(
		<View style={{ flexShrink:1 }}>
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
	headerClosed:{
		width:'100%',
		padding:10,
		flexDirection:'row',
		alignItems:'center',
		borderBottomWidth:2,
		borderColor:gray,
	},
	headerOpen:{

		padding:10,
		flexDirection:'row',
		alignItems:'center',
		borderBottomWidth:2,
		borderColor:gray,
	},
	ingrediantsContainer:{
		borderColor:gray,
		backgroundColor:darkCream
	},
	cardImg:{
		width:65,
		height:65,
		borderRadius:10,
	},
})
