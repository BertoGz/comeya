import {OPEN_SETTINGS_GROCERY_ITEM} from '../actions/menuOptions'

export default function menuOptions(state=null,action){
	switch(action.type){
		case OPEN_SETTINGS_GROCERY_ITEM:
		return action.item


		default: return state

	}

}