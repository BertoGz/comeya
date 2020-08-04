import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Animated,Easing} from 'react-native'
import {useSelector} from 'react-redux'
import {white,cream,black,goodBlue} from '../utils/colors'


export default function HeaderRight(props){
	const currentList = useSelector(state=>state.currentList)
	const amount = useSelector(state => state.user.lists['list1']).length
	const [animScale,setAnimScale] = useState(new Animated.Value(0))
	const [init,setInit] = useState(true)
	useEffect(()=>{

		// prevents running animation on mounting
		if (!init){
			toggleAnimation()
		}
		setInit(false)
		// prevents running animation on mounting

	},[amount])

	const toggleAnimation = () => {
		Animated.timing(animScale,{
        	toValue:2,
        	easing:Easing.elastic(.8),
        	duration:500,
        	useNativeDriver: false
        }).start(() => setAnimScale(new Animated.Value(0)))
	}

	const iconScale = animScale.interpolate({
    	inputRange: [0,1,2],
    	outputRange: [18,12.3,18]
    })

    const animatedTextScaleStyle={
    	 fontSize: iconScale
    }


	return(

	<View style={{height:'100%',justifyContent:'flex-end',
		paddingRight:10,paddingBottom:10}}>
		<Animated.Text style={[{textAlign:'right',fontSize:18},animatedTextScaleStyle]}>List({amount})</Animated.Text>
	</View>
	)
}


const styles=StyleSheet.create({
	headingContainer:{
		width:'100%',
		height:100,
		backgroundColor:goodBlue,
		borderColor: 'rgba(0,0,0,.25)',
		borderBottomWidth: 2,
	},
	subcontainer:{
		left:'50%',
		right:'100%',
		height:'100%',
		backgroundColor:'blue'
	}
})