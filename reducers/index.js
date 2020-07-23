import {combineReducers} from 'redux'
import user from './user'
import currentList from './currentList'
import menuOptions from './menuOptions'
export default combineReducers({
	user,
	currentList,
	menuOptions
})