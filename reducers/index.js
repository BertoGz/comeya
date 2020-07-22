import {combineReducers} from 'redux'
import user from './user'
import currentList from './currentList'

export default combineReducers({
	user,
	currentList
})