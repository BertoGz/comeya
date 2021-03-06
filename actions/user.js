export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const TOGGLE_LIST_ITEM = 'TOGGLE_ADD_TO_LIST'
export const TOGGLE_FAVORITE_ITEM = 'TOGGLE_ADD_TO_FAVORITE'

import {getUserFromServer,toggleListItemFromServer} from '../utils/api'

export function setCurrentUserAction(user){
	return{
		type:SET_CURRENT_USER,
		user,
	}

}

export function handleSetCurrentUserAction(userID){
	return(dispatch)=>{
		return getUserFromServer(userID).then(({user})=>{
			dispatch(setCurrentUserAction(user))
		})
	}
}



export function toggleListItemAction(listItem){
	return{
		type:TOGGLE_LIST_ITEM,
		listItem,
	}
}

export function handleToggleListItemAction(authedUser,dishTitle,list){
	return(dispatch)=>{
		dispatch(toggleListItemAction({authedUser,dishTitle,list})) //redux store

		return toggleListItemFromServer(authedUser,dishTitle,list).catch(()=>{  //server side
			dispatch(toggleListItemAction({authedUser,dishTitle,list}))
			console.log('error in toggling listItem')
		
		})

	
	}
}