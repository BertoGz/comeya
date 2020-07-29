import React,{useState,useEffect} from 'react'
import {View,Text,Image,StyleSheet,Animated,Easing} from 'react-native'
import {useSelector} from 'react-redux'
import DishResults from './DishResults'
import {white,cream,black,goodBlue} from '../utils/colors'


export default function CategoryResultPage(){
	const [init,setInit] = useState(true)
	const [dishes,setDishes] = useState([])
	useEffect(()=>{
		console.log('used effect')

		if (init){
			console.log('tried fetching')
			const getDishes = setInterval(fetchDishes, 10)

			function fetchDishes(){
			
				fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/food-id.JSON')
				.then(response=>response.json()).then(data=>{setDishes(data),clearInterval(getDishes),console.log('success')})
				.catch((error)=>{console.log('error')})
			}
		}
	},[init])




	return(
		dishes.length!==0 &&
		<View style={{width:'100%'}}>
			{/*<ViewHeading/>*/}
			<DishResults dishes={dishes}/>
		</View>

	)
}




function ViewHeading(){
	const amount = useSelector(state => state.user).lists['list1'].length
	const [animScale, setAnimScale] = useState(new Animated.Value(0))
	
	useEffect(()=>{
		toggleAnimation()
	},[amount])

	const toggleAnimation = () => {
		Animated.timing(animScale,{
        	toValue:2,
        	easing:Easing.elastic(1),
        	duration:700,
        	useNativeDriver: false
        }).start(() => setAnimScale(new Animated.Value(0)))
	}

	const iconScale = animScale.interpolate({
    	inputRange: [0,1,2],
    	outputRange: [16,12.3,16]
    })

    const animatedTextScaleStyle={
    	//transformOrigin: 'center',
    	 fontSize: iconScale
    }


	return(
		<View style={styles.headingContainer}>
			<View style={{flexDirection:'row',paddingTop:20,paddingLeft:0}}>
	        	<Text style={{fontSize:24, paddingTop:5,color:white}}>Recommended</Text>

			</View>
			<View style={{width:'100%',height:'100%',justifyContent:'flex-end',alignItems:'flex-end',position:'absolute',paddingRight:10,paddingBottom:10}}>

					<Animated.Text style={[styles.listAmount,animatedTextScaleStyle]}>List({amount})</Animated.Text>

			</View>
        </View>
	)
}

const styles=StyleSheet.create({
	container:{
		justifyContent:'center',
		alignItems:'center',
	},
	headingContainer:{
		width:'100%',
		height:100,
		borderColor: 'rgba(0,0,0,.25)',
		borderBottomWidth: 2,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:goodBlue,
	},
	listAmount:{
		textAlign:'right',
		fontWeight:'bold',
		color: cream,

	}
})