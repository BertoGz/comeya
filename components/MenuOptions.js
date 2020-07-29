import React,{useState,useEffect,useLayoutEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {View,Text,TouchableWithoutFeedback,TouchableOpacity,TouchableNativeFeedback,StyleSheet,LayoutAnimation,UIManager} from 'react-native'

import {handleOpenSettingsGroceryItemAction,handleCloseSettingsGroceryItemAction} from '../actions/menuOptions'
import {OPEN_SETTINGS_GROCERY_ITEM,CLOSE_SETTINGS_GROCERY_ITEM} from '../actions/menuOptions'

import {pink,cream,darkCream,goodBlue,darkBlue,gray} from '../utils/colors'


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
		console.log('crispy')
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
    	LayoutAnimation.configureNext(CustomLayoutAnimation);
    	setDrawerPosition(drawerPosition === "bottom" ? "top" : "bottom")
  	};



  	const animationEnd=()=>{
  		toggleDrawerAnimation()
  		setTerminate(true)
	  	const timer = setTimeout(() => {
	  	
	    	handleCloseOptionsToggled()
	    	console.log('ended')
	  	}, 300);
	  return () => clearTimeout(timer);
  	}

	return(

		 <View style={{		width:'100%',
		height:'100%',	position:'absolute',justifyContent:'center', alignItems:'center',	zIndex: 1,elevation:1}}>
		{	!terminate &&
			<TouchableNativeFeedback onPress={animationEnd}>
				<View style={[styles.optionsMenuContainer ]}>

				</View>
			</TouchableNativeFeedback>
		}
					<View style={[styles.optionsMenuContainer2]}>
					<View style={drawerPosition === "top" ? null : styles.drawerBottom}></View>
					<TouchableWithoutFeedback>

						<View style={{width:'100%',alignItems:'center'}}>
							<View style={{borderTopLeftRadius:30,borderTopRightRadius:30,width:'100%',backgroundColor:darkBlue,alignItems:'center',justifyContent:'center'}}>
								<Text style={[styles.optionButtonText,{fontSize:18,paddingTop:20,paddingBottom:20}]}>{item}</Text>
							</View>

							
								<View style={{width:'100%',backgroundColor:goodBlue,alignItems:'center',justifyContent:'center'}}>
									<TouchableOpacity>
										<Text style={[styles.optionButtonText,{paddingTop:10}]}>Goto Page</Text>
									</TouchableOpacity>
								</View>

								<View style={{width:'100%',backgroundColor:goodBlue,alignItems:'center',justifyContent:'center'}}>
									<TouchableOpacity>
										<Text style={styles.optionButtonText}>Remove</Text>
									</TouchableOpacity>
								</View>
								<View style={{borderBottomLeftRadius:30,borderBottomRightRadius:30,width:'100%',backgroundColor:goodBlue,alignItems:'center',justifyContent:'center'}}> 
									<TouchableOpacity>
										<Text style={[styles.optionButtonText,{paddingBottom:20}]}>Expand</Text>
									</TouchableOpacity>
								</View>
				
						</View>

					</TouchableWithoutFeedback>
					</View>

		
		</View>

		
	)
}


const CustomLayoutAnimation = {
	duration:900,
	create:{
		property: LayoutAnimation.Properties.opacity,
		type: LayoutAnimation.Types.linear,


	},
	update:{
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
	optionsMenuContainer:{
		width:'100%',
		height:'100%',
		justifyContent:'center',
		alignItems:'center',
		position:'absolute',
		zIndex: 2,
		elevation:2,
		backgroundColor:'rgba(0,0,0,0.5)',
		
	},	optionsMenuContainer2:{
		width:'80%',alignItems:'center',
		justifyContent:'center',
		zIndex:2,
		elevation:2,
	},
	grocerySettings:{
		width:'100%',
		backgroundColor:goodBlue,
		elevation:3,
		zIndex:3,
		borderRadius:30,
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
		textAlign:'center',
		paddingTop:40,
	},
	fading:{
		backgroundColor:'rgba(0,0,0,0.5)',
		height:'80%'
	},
	drawerBottom:{
		paddingTop:'330%'
	},
})

