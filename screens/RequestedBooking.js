import { StyleSheet, Text, View,ImageBackground,Image,TouchableOpacity,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Background from '../assets/background.png'
import AppLoading from 'expo-app-loading';
import { useFonts,oswald,Montserrat} from '@expo-google-fonts/inter';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { acc } from 'react-native-reanimated';
import BookingTab from '../reusableComponents/BookingTab';


const RequestedBooking = () => {


    const data_1 = [
        {
            id:1,
        },
        {
            id:2,
        }
    ]

    const acces_token = useSelector((state) => state.cart.acces_token)
const [data,setdata] = useState()
useEffect(()=>{
    axios.get('https://doggywawky.com/api/bookings/0',
     { 
        headers: {"Authorization" : `Bearer ${acces_token}`} 
    }
    
    )
    .then((response)=>
    {
        setdata(response.data.data.bookings)
    })
    .catch((error)=>{
        console.log('error')
    })
},[])


    let [fontsLoaded] = useFonts({
        oswald: require('../assets/oswald/Oswald_Stencil/Oswald-Stencil.otf'),
        Montserrat: require('../assets/Montserrat/Montserrat-Regular.ttf')
       });
      
       if (!fontsLoaded) {
         return <AppLoading />;
       } else {
        return (
    <ImageBackground style={{flex:1}} source={Background} blurRadius={4}>
<View style={{height:200,width:'100%' ,backgroundColor:'#22224a',justifyContent:'flex-end',alignItems:'center',}}>
    <Text style={{color:'white',fontSize:30,fontFamily:'oswald',marginBottom:5}}>Requested Booking List </Text>
</View>
<View style={styles.flatList}>
    <FlatList
    data={data}
keyExtractor={(item)=>item.id}
renderItem={({item})=>(<BookingTab number={'123'}/>)}
    />
</View>

    </ImageBackground>
  )}
}

export default RequestedBooking

const styles = StyleSheet.create({
    flatList:{

    }
})