import React,{useState,useEffect,useLayoutEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {View,Text,TouchableWithoutFeedback,TouchableOpacity,StyleSheet,LayoutAnimation} from 'react-native'

import {handleOpenSettingsGroceryItemAction,handleCloseSettingsGroceryItemAction} from '../actions/menuOptions'
import {OPEN_SETTINGS_GROCERY_ITEM,CLOSE_SETTINGS_GROCERY_ITEM} from '../actions/menuOptions'

import {pink,cream,darkCream,goodBlue,gray} from '../utils/colors'


if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}



export default function MenuOptions(){

	const action = useSelector(state=>state.menuOptions)
	const [optionsToggled,setOptionsToggled] = useState(false)

	const dispatch = useDispatch()
	useEffect(()=>{ 
		if (action.title === OPEN_SETTINGS_GROCERY_ITEM ){
			setOptionsToggled(true)

		}
		if (action.title === CLOSE_SETTINGS_GROCERY_ITEM){
			setOptionsToggled(false)
		}

	},[action.title])


	{/* closes menu */}
	function handleCloseOptionsToggled(){
		dispatch(handleCloseSettingsGroceryItemAction())
	}


	return(
		optionsToggled &&
		<GrocerySettings item={action.item} handleCloseOptionsToggled={handleCloseOptionsToggled}/>
	)


}


function GrocerySettings({item,handleCloseOptionsToggled}){
	const [init,setInit] = useState(true)
	const [drawerPosition,setDrawerPosition] = useState("bottom")
	const [terminate,setTerminate] = useState(false)



	useEffect(()=>{
		if (init){
			console.log('first render')
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
			setInit(false)
		}
		else{
				const timer = setTimeout(() => {
	  	
	    	console.log('second render')
			toggleDrawerAnimation()
			  	}, 1);
			  return () => clearTimeout(timer);


		}
	},[init])

	const toggleDrawerAnimation=()=>{
		console.log('POWER')
    	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    	setDrawerPosition(drawerPosition === "bottom" ? "top" : "bottom")
  	};



  	const animationEnd=()=>{
  		toggleDrawerAnimation()
  		setTerminate(true)
	  	const timer = setTimeout(() => {
	  	
	    	handleCloseOptionsToggled()
	    	console.log('ended')
	  	}, 200);
	  return () => clearTimeout(timer);
  	}

	return(
		<View style={{		width:'100%',
		height:'100%',	position:'absolute',justifyContent:'center', alignItems:'center',	zIndex: 1}}>
		{	!terminate &&
			<TouchableWithoutFeedback onPress={animationEnd}>
				<View style={[styles.optionsMenuContainer ]}>

				</View>
			</TouchableWithoutFeedback>
		}
					<View style={[styles.optionsMenuContainer2, drawerPosition === "top" ? null : styles.drawerBottom]}>
					<TouchableWithoutFeedback>

						<View style={styles.grocerySettings}>
							<View style={{width:'100%',height:50,backgroundColor:pink,opacity:.5,alignItems:'center',justifyContent:'center'}}>
								<Text style={[styles.optionButtonText,{fontSize:18}]}>{item}</Text>
							</View>

							<View style={{width:'100%'}}>
								<View style={styles.optionButton}>
									<TouchableOpacity>
										<Text style={styles.optionButtonText}>View Dish</Text>
									</TouchableOpacity>
								</View>

								<View style={styles.optionButton}>
									<TouchableOpacity>
										<Text style={styles.optionButtonText}>Remove</Text>
									</TouchableOpacity>
								</View>
								<View style={styles.optionButton}> 
									<TouchableOpacity>
										<Text style={styles.optionButtonText}>Expand</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

					</TouchableWithoutFeedback>
					</View>

		
		</View>
	)
}



const styles=StyleSheet.create({
	optionsMenuContainer:{
		width:'100%',
		height:'100%',
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		zIndex: 1,
		backgroundColor:'rgba(0,0,0,0.5)',
		
	},
	grocerySettings:{
		width:'100%',
		height:250,
		backgroundColor:goodBlue,
		opacity:1,
		justifyContent:'flex-start',
		alignItems:'center',

	},
	optionButton:{
		paddingTop:20,
		paddingBottom:20,
	},
	optionButtonText:{
		fontSize:20,
		color:'white',
		fontWeight:'bold',
		textAlign:'center'
	},
	fading:{
		backgroundColor:'rgba(0,0,0,0.5)',
		height:'80%'
	},
	optionsMenuContainer2:{
		width:'80%', paddingTop:0,alignItems:'center',
		justifyContent:'center',
		zIndex:1,
		backgroundColor:'red',
	},
	drawerBottom:{
		marginTop:'300%'
	},
})

