import {SET_CURRENT_LIST} from '../actions/currentList'

export default function currentList(state=null, action){
	switch(action.type){
		case SET_CURRENT_LIST:
			return action.listName
		default : 
			return state
	}
}