let users = {
	bertogz:{
		id: 'bertogz',
		name: 'berto gonzalez',
		favorites:[
			'Shrimp & Snap Pea Stir-Fry',
		],
		lists:{
			list1:[
				'Shrimp & Snap Pea Stir-Fry'
			]
		}
	}
}

export function getUserFromServer(userID){
	  return new Promise((res, rej) => {
    setTimeout(() => res({...users[userID]}), 1000)
  }).then(user=>({user}))
}

export function checkInList(user,list,dish){
	return users[user].lists[list].includes(dish)
}
export function getList(user,list){
	return users[user].lists[list]
}

export function toggleFavoriteFromServer (authedUser,dishTitle) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          favorites: users[authedUser].favorites.includes(dishTitle) === true
            ? users[authedUser].favorites.filter((item) => item !== dishTitle)
            : users[authedUser].favorites.concat([dishTitle])
        }
      }

      res({authedUser,dishTitle})
    }, 500)
  })
}




export function toggleListItemFromServer(authedUser,dishTitle,list){
	return new Promise((res,rej)=>{
		setTimeout(()=>{
			users = {
				...users,
				[authedUser]:{
					...users[authedUser],
					lists:{
						...users[authedUser].lists,
						[list]: users[authedUser].lists[list].includes(dishTitle) === true
	            		? users[authedUser].lists[list].filter((item) => item !== dishTitle)
	            		: users[authedUser].lists[list].concat([dishTitle])
					} 
						
				}
			}
			res()
			//
		},500)
	})
}
