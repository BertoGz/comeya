export const RECEIVE_USER = 'RECEIVE_USER'
export const TOGGLE_LIST_ITEM = 'TOGGLE_ADD_TO_LIST'
export const TOGGLE_FAVORITE_ITEM = 'TOGGLE_ADD_TO_FAVORITE'

import {getUserFromServer,toggleListItemFromServer} from '../utils/api'

export function receiveUserAction(user){
	return{
		type:RECEIVE_USER,
		user,
	}

}

export function handleReceiveUserAction(userID){
	return(dispatch)=>{
		return getUserFromServer(userID).then(({user})=>{
			dispatch(receiveUserAction(user))
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
		dispatch(toggleListItemAction({authedUser,dishTitle,list}))

		return toggleListItemFromServer(authedUser,dishTitle,list).catch(()=>{
			dispatch(toggleListItemAction({authedUser,dishTitle,list}))
			console.log('error in toggling listItem')
		})

	
	}
}