export const SET_CURRENT_LIST = 'SET_CURRENT_LIST'

export function setCurrentListAction(listName){
	return{
		type: SET_CURRENT_LIST,
		listName,
	}
}

export function handleSetCurrentListAction(listName){
	return (dispatch)=>{
		dispatch(setCurrentListAction(listName))
	}
}
