export const OPEN_SETTINGS_GROCERY_ITEM = 'OPEN_SETTINGS_GROCERY_ITEM'
export const CLOSE_SETTINGS_GROCERY_ITEM = 'CLOSE_SETTINGS_GROCERY_ITEM'


export function openSettingsGroceryItemAction(item){
	return{
		type: OPEN_SETTINGS_GROCERY_ITEM,
		item,
	}
}

export function handleOpenSettingsGroceryItemAction(item){
	return (dispatch)=>{
		dispatch(openSettingsGroceryItemAction(item))
	}
}


export function closeSettingsGroceryItemAction(){
	return{
		type: CLOSE_SETTINGS_GROCERY_ITEM,
	}
}

export function handleCloseSettingsGroceryItemAction(){
	return (dispatch)=>{
		dispatch(closeSettingsGroceryItemAction())
	}
}
