import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {View,Text,StyleSheet,Image,FlatList,TouchableOpacity,Animated,Easing} from 'react-native'

import {pink,white,black,cream,darkCream,goodBlue,gray} from '../utils/colors'
import {AntDesign,Feather,Entypo } from '@expo/vector-icons'; 

import {checkInList} from '../utils/api'
import {handleToggleListItemAction} from '../actions/user'
export default function CardItem(props){
	const [dish,setDish] = useState({title:""})

	{/*animation states 1 = added to list animation
	2 = heart animation*/}
	const [init,setInit] = useState(true)
	const currentList = useSelector(state=>state.currentList)
	const isInList = useSelector(state => state.user).lists[currentList].includes(dish.title)
	const [triggerAnimation1,setTriggerAnimation1] = useState(isInList)
	var _isMounted = false

	useEffect(()=>{
		console.log('dishItem mounted')
		_isMounted=true
		if(init){
			fetchDish()
		}

			return ()=>{
				_isMounted=false
				console.log('dishItem unmounted')
			}

	},[])

	const fetchDish = async() => {
		console.log('caca fetching')
		const apiCall = await fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/foodData.json')
		const dishes = await apiCall.json()
		if (_isMounted){
			setDish(dishes[props.dishID] )
			setInit(false)
		}
	}




	return(
			<View style={styles.container}>
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.headerText}>{dish.title}</Text>
					</View>

					<Break/> 
					<CardImage image={dish.url} isInList={isInList} triggerAnimation1={triggerAnimation1} />
					<CardButtons inList={isInList} dishTitle={dish.title} setTriggerAnimation1={setTriggerAnimation1}/>
					<Description/>
				</View>

			</View>
		)	

	

	
}


const CardImage=({image,isInList,triggerAnimation1})=>{

	const [animationPos,setAnimationPos] = useState(new Animated.Value(triggerAnimation1? 1 : 0))
	const [animationIconTransform, setAnimationIconTransform] = useState(new Animated.Value(triggerAnimation1 ? 2: 0))

	useEffect(()=>{
		if(isInList){
			Animated.timing(animationPos, {
            toValue: 1,
            easing: Easing.elastic(.8),
            duration: 1,
            useNativeDriver: true
        }).start()

        Animated.timing(animationIconTransform,{
        	toValue:2,
        	easing:Easing.elastic(1),
        	duration:1,
        	useNativeDriver: false
        }).start()
			
		}
	},[])

    if (triggerAnimation1===true || isInList){
  
        Animated.timing(animationPos, {
            toValue: 1,
            easing: Easing.elastic(.8),
            duration: 880,
            useNativeDriver: true
        }).start()

        Animated.timing(animationIconTransform,{
        	toValue:2,
        	easing:Easing.elastic(1),
        	duration:700,
        	useNativeDriver: false
        }).start()


    }

    if (triggerAnimation1===false && !isInList ){

        Animated.timing(animationPos, {
            toValue: 0,
            easing: Easing.linear,
            duration: 0,
            useNativeDriver: true
        }).start()

        Animated.timing(animationIconTransform,{
        	toValue:0,
        	easing:Easing.elastic(1),
        	duration:700,
        	useNativeDriver: false
        }).start()

    }
	
    

    const xVal = 
		animationPos.interpolate({
	    inputRange: [0, 1],
	        outputRange: [0, 450]
		})

	const yVal = animationPos.interpolate({
        inputRange: [0, 1],
            outputRange: [0, 0]
    })

    const iconScale = animationIconTransform.interpolate({
    	inputRange: [0,1,2],
    	outputRange: [1,.8,1]
    })
    const highLightFade = animationIconTransform.interpolate({
    	inputRange: [0,1],
    	outputRange: [0,5]
    })
    const radiusFade= animationIconTransform.interpolate({
    	inputRange: [0,1],
    	outputRange: [10,30]
    })
	

    const animStyle = {
      transform: [{translateY: yVal}, {translateX: xVal }],
      position: 'absolute',

    }

    const iconAnimStyle={
    	//transformOrigin: 'center',

    	 transform: [{ scale: iconScale }],
    	 borderWidth:highLightFade,
    	 borderColor:pink,
    	 borderRadius:radiusFade,
    }






	return(
		<View>
			<View style={{padding:10,alignItems:'center'}}>
				<Animated.Image
			        style={[styles.cardImg,iconAnimStyle]}
			        source={{uri:image}}
			      />
			</View>




		</View>
	)
}


const CardButtons=({dishTitle,inList,setTriggerAnimation1})=>{

		const hasFavorited = false
		const dispatch=useDispatch()
		function toggleItem(){
				return dispatch(handleToggleListItemAction('bertogz',dishTitle,'list1'))
		}
		const handleAddToList =()=>{
			setTriggerAnimation1(inList ? false : true)
			toggleItem().catch((error)=>{setTriggerAnimation1(inList ? false : true)})
		}

	return(
		<View style={{flexDirection:'row',alignItems:'flex-end',padding:0,marginLeft:10,marginRight:10,borderRadius:10, backgroundColor:darkCream}}>			
			<TouchableOpacity style={{marginLeft:36,padding:5}} onPress={handleAddToList}>
				<Entypo name={inList ? 'add-to-list' : 'add-to-list'} size={30} color={inList ? pink:gray} />
			</TouchableOpacity>

			<TouchableOpacity style={{marginLeft:25, padding:5,marginBottom:3 }} onPress={null}>
				<AntDesign name={hasFavorited ? "heart" : "hearto"} size={24} color={hasFavorited ? pink:gray}/>
			</TouchableOpacity>
			
			<TouchableOpacity style={{marginLeft:25, padding:5,marginBottom:3}} >
				<Feather name="send" size={24} color={gray} />
			</TouchableOpacity>
		</View>
	)
}

function Break() {
	return(
		<View style={{alignItems:'center'}}>
			<View style={styles.break}>
			</View>
		</View>
	)
}




function Description(){
	return(
		<Text style={{paddingTop:20,paddingBottom:20,paddingLeft:30,paddingRight:30}}>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin faucibus arcu. Pellentesque ornare, risus ut condimentum fringilla, risus ligula suscipit turpis, et commodo nulla arcu at nulla. Vestibulum urna eros, accumsan at commodo vitae, cursus at mauris. Aenean ullamcorper diam eget lectus aliquam lobortis.
		</Text>
	)
}



const styles=StyleSheet.create({
	container:{
		width:'100%',
		alignItems:'center',
		backgroundColor:'red'

	},
	card:{
		width:'100%',
		backgroundColor:cream
	},
	cardHeader:{

		height:40,
		paddingRight:20,
		alignItems:'flex-end',
		justifyContent:'center',
	},
	cardImg:{

		width:'80%',
		height:300,
		borderRadius:10,
	},
	headerText:{

		paddingRight:10,
		paddingTop:10,
		textAlign:'left',
		fontSize:20,
		color:gray
	},
	break:{
		width:'95%',
		backgroundColor:goodBlue,
		height:2,
		opacity:.5
	}
})