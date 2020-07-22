export const OPEN_SETTINGS_GROCERY_ITEM = 'OPEN_SETTINGS_GROCERY_ITEM'


export function openSettingsGroceryItemAction(item){
	return{
		type: SET_CURRENT_LIST,
		item,
	}
}

export function handleOpenSettingsGroceryItemAction(item){
	return (dispatch)=>{
		dispatch(openSettingsGroceryItemAction(item))
	}
}
