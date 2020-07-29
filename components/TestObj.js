import React,{useState,useEffect,useLayoutEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {View,Text,TouchableWithoutFeedback,TouchableOpacity,StyleSheet,LayoutAnimation,UIManager} from 'react-native'
import {handleOpenSettingsGroceryItemAction,handleCloseSettingsGroceryItemAction} from '../actions/menuOptions'
import {OPEN_SETTINGS_GROCERY_ITEM,CLOSE_SETTINGS_GROCERY_ITEM} from '../actions/menuOptions'

import {pink,cream,darkCream,goodBlue,gray} from '../utils/colors'




export default function TestObj(){


	const action = useSelector(state=>state.menuOptions)
	useEffect(()=>{
		console.log('updatedddd')
		
		if (action.title === OPEN_SETTINGS_GROCERY_ITEM ){
			setOptionsToggled(true)

		}
		if (action.title === CLOSE_SETTINGS_GROCERY_ITEM){
			setOptionsToggled(false)
		}

	},[action.title])

	return(
		<View></View>)

}

