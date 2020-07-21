import React,{Component,useEffect,useState} from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'
import {connect,useSelector} from 'react-redux'

import DishResults from './DishResults'

import {white,cream,black,goodBlue} from '../utils/colors'
import {handleReceiveUserAction} from '../actions/user'

class Index extends Component{
	state={
		dishesID: [],
		authedUser: ""
	}

	componentDidMount(){

		this.props.dispatch(handleReceiveUserAction('bertogz'))

		return new Promise((resolve,reject)=>{
			fetch('https://raw.githubusercontent.com/BertoGz/food-data/master/food-id.JSON')
			.then((response) => resolve(response.json()))
		}).then((data)=>this.setState({dishesID:data}))

		
	}



	render(){
		
		if(this.props.loading){
			return null
		}

		return(
			<View style={{width:'100%'}}>
				<ViewHeading/>
				<DishResults dishes={this.state.dishesID}/>
			</View>

		)
	}
}

function ViewHeading(){
	const amount = useSelector(state => state.user)
	return(
		<View style={styles.headingContainer}>
			<View style={{flexDirection:'row',paddingTop:20,paddingLeft:100}}>
	        	<Text style={{fontSize:24, paddingTop:5,color:white}}>Recommended</Text>
	        	<Image
			        style={{marginLeft:6,width:40,height:40}}
			        source={require('../images/pizza-emoji.png')}
				/>
			</View>
			<View style={{width:100,height:'100%',justifyContent:'flex-end'}}>
				<Text style={{fontSize:20}}>List({amount.lists['list1'].length})</Text>
			</View>
        </View>
	)
}



const styles=StyleSheet.create({
	container:{
		justifyContent:'center',
		alignItems:'center',
	},
	headingContainer:{
		width:'100%',
		height:100,
		borderColor: 'rgba(0,0,0,.25)',
		borderBottomWidth: 2,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:goodBlue,
	}
})


function mapStateToProps({user}){
	console.log(user)
	//console.log('socks',currentList)
	return{
		loading: Object.values(user).length===0
		
	}
}


export default connect(mapStateToProps)(Index)