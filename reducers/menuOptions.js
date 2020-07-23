import {OPEN_SETTINGS_GROCERY_ITEM,CLOSE_SETTINGS_GROCERY_ITEM} from '../actions/menuOptions'

export default function menuOptions(state={title:null},action){
	switch(action.type){
		case OPEN_SETTINGS_GROCERY_ITEM:
		return {title: OPEN_SETTINGS_GROCERY_ITEM, item: action.item}

		case CLOSE_SETTINGS_GROCERY_ITEM:
		return {title: CLOSE_SETTINGS_GROCERY_ITEM, item: null}


		default: return state

	}

}