
import {SET_CURRENT_USER,TOGGLE_LIST_ITEM} from '../actions/user'

export default function user(state={},action){
	switch(action.type){
		case SET_CURRENT_USER:
		return{
			...state,
			...action.user
		}

		case TOGGLE_LIST_ITEM:

		const authedUser = action.listItem.authedUser
		const dishTitle = action.listItem.dishTitle
		const list = action.listItem.list



		return{
			...state,
				lists:{
					...state.lists,
					[list]: state.lists[list].includes(dishTitle) === true
            		? state.lists[list].filter((item) => item !== dishTitle)
            		: state.lists[list].concat([dishTitle])
				} 
		}

		default: return state
	}

}