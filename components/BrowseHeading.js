import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,Animated,Easing} from 'react-native'
import {useSelector} from 'react-redux'
import {white,cream,black,goodBlue} from '../utils/colors'


export default function BrowseHeading(props){
	const amount = useSelector(state => state.user).lists['list1'].length
	const [animScale, setAnimScale] = useState(new Animated.Value(0))
	
	useEffect(()=>{
		toggleAnimation()
	},[amount])

	const toggleAnimation = () => {
		Animated.timing(animScale,{
        	toValue:2,
        	easing:Easing.elastic(1),
        	duration:700,
        	useNativeDriver: false
        }).start(() => setAnimScale(new Animated.Value(0)))
	}

	const iconScale = animScale.interpolate({
    	inputRange: [0,1,2],
    	outputRange: [16,12.3,16]
    })

    const animatedTextScaleStyle={
    	 fontSize: iconScale
    }


	return(
		<View style={styles.headingContainer}>
			<View style={{justifyContent:'center',alignItems:'center'}}>
				<Text>Back</Text>
			</View>
			<View style={{justifyContent:'center',alignItems:'center'}}>
	        	<Text style={{fontSize:24,color:white}}>{props.text}</Text>
			</View>
			<View style={{justifyContent:'center',alignItems:'center'}}>
				<Animated.Text style={[styles.listAmount,animatedTextScaleStyle]}>List({amount})</Animated.Text>
			</View>

        </View>
	)
}


const styles=StyleSheet.create({
	headingContainer:{
		width:'100%',
		height:100,
		borderColor: 'rgba(0,0,0,.25)',
		borderBottomWidth: 2,
		paddingBottom:20,
		flexDirection:'row',
		justifyContent:'space-around',
		alignItems:'flex-end',
	}
})