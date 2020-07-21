import React,{useEffect, useState} from 'react'
import {View,Text,StyleSheet,Image,FlatList,TouchableOpacity,Animated,Easing} from 'react-native'

import {pink,white,black,cream,darkCream,goodBlue,gray} from '../utils/colors'
import {AntDesign,Feather,Entypo } from '@expo/vector-icons'; 

import {toggleListItemFromServer,checkHasAdded} from '../utils/api'


export default function CardItem3(props){

	const [dish,setDish] = useState({title:""})
	const [hasAdded,setHasAdded] = useState(false)
	const [responsivePos,setResponsivePos] = useState(new Animated.Value(0))
	const [toggleAnimation,setToggleAnimation] = useState(false)


	const fetchDish = async() => {
		const apiCall = await fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/foodData.json')
		const dishes = await apiCall.json()
		setDish(dishes[props.dishID] )
		setHasAdded(checkHasAdded('bertogz','list1',props.dishID)) 
	}

	useEffect(()=>{
		fetchDish()
	},[dish.title])

	function handleSetHasAdded(){
		hasAdded === true ? setHasAdded(false) : setHasAdded(true)
		animatePos()
	}


	function animatePos(){

        if (hasAdded===false){
            console.log('animatedStarted',dish.title, 'ons')
            Animated.timing(responsivePos, {
                toValue: 1,
                easing: Easing.elastic(.8),
                duration: 880,
                useNativeDriver: false
            }).start()


        }

        if (hasAdded===true){
             console.log('animation Returned',dish.title, 'off')
            Animated.timing(responsivePos, {
                toValue: 0,
                easing: Easing.linear,
                duration: 0,
                useNativeDriver: false
            }).start()

        }
    }

    const xVal = 
		responsivePos.interpolate({
	    inputRange: [0, 1],
	        outputRange: [0, 450]
		})

	const yVal = responsivePos.interpolate({
        inputRange: [0, 1],
            outputRange: [0, 0]
    })
	

    const animStyle = {
      transform: [{translateY: yVal}, {translateX: xVal }],
      position: 'absolute'
    }


	function Card(){

			const CardImage=()=>{
				return(
					<View>
						<View style={{padding:10,alignItems:'center'}}>
							<Image
						        style={styles.cardImg}
						        source={{uri:dish.url}}
						      />
						</View>

						{
							<Animated.View style={[{padding:10,width:'100%',alignItems:'center'},animStyle]}>
								<Image
							        style={styles.cardImg}
							        source={{uri:image.url}}
							      />
							</Animated.View>
						}
					</View>
				)
			}

		return(
			<View style={styles.container}>
				<View style={styles.card}>
					<View style={styles.cardHeader}>
						<Text style={styles.headerText}>{dish.title}</Text>
					</View>

					<Break/> 

					<CardImage />
					<CardButtons />
					<Description/>
				</View>

			</View>
		)	

	}


	const CardButtons=()=>{

		const hasFavorited = false

		const handleAdd =()=>{
		if (hasAdded)
		{
			handleSetHasAdded()
			toggleListItemFromServer('bertogz',dish.title,'list1').catch(e=>{
				handleSetHasAdded(),
				console.log('rejected')
			}
			)
			
		}
		else{
			handleSetHasAdded()
			toggleListItemFromServer('bertogz',dish.title,'list1').catch(e=>{
				handleSetHasAdded(),
				console.log('rejected')
			})
			
			}
		}

		const handleFavorite =()=>{
			//toggleListItemFromServer('bertogz',dish.title,'list1') 
		}

	return(
		<View style={{flexDirection:'row',alignItems:'flex-end',padding:0,marginLeft:10,marginRight:10,borderRadius:10, backgroundColor:darkCream}}>			
			<TouchableOpacity style={{marginLeft:36,padding:5}} onPress={handleAdd}>
				<Entypo name={hasAdded ? 'add-to-list' : 'add-to-list'} size={30} color={hasAdded ? pink:gray} />
			</TouchableOpacity>

			<TouchableOpacity style={{marginLeft:25, padding:5,marginBottom:3 }} onPress={handleFavorite}>
				<AntDesign name={hasFavorited ? "heart" : "hearto"} size={24} color={hasFavorited ? pink:gray}/>
			</TouchableOpacity>
			
			<TouchableOpacity style={{marginLeft:25, padding:5,marginBottom:3}} >
				<Feather name="send" size={24} color={gray} />
			</TouchableOpacity>
		</View>
	)
}



	return(
		<Card dish={dish}/>
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