import { StyleSheet, Text, View,ImageBackground,Image,TextInput,TouchableOpacity,ScrollView,Alert } from 'react-native'
import React, { useState } from 'react'
import Background from '../assets/background.png'
import BlackBackground from '../assets/BlackBackground.png'
import axios from 'axios';




const ForgotPassword = ({navigation}) => {

  const [email,setemail] = useState('')
var [Message,setMessage] = useState("")
const [success,setsuccess] = useState()


function sendEmail(){

  const data = {
    email: email.toString()
  }
  
  axios.post('https://doggywawky.com/api/auth/forgot-password', data)
  .then((response) => {
    
  setMessage(response.data.message)
  setsuccess(true)
navigation.navigate('SignIn')
Alert.alert(response.data.message)
  })
  .catch((error)=> {
    
    if(email===''){
      setMessage("Enter an email address")
    }
    else{
  setsuccess(false)
  setMessage("Email does not exist")
    }
  })



}


  return (
   <ImageBackground style={styles.container} source={Background} blurRadius={4}>
     <ScrollView contentContainerStyle={{justifyContent:'center',flex:1,alignItems:'center'}}>
     <View style={{alignItems:"center"}}>
      <Text style={{fontWeight:'bold',fontSize:20,marginBottom:10,color:'black'}}>Enter you email address</Text>
      <Text style={success?{width:250,color:'green',marginVertical:10}:{width:250,color:'red',marginVertical:10}}>{Message}</Text>
      <TextInput style={styles.input}  placeholder='email' onChangeText={setemail} value={email}/>
      <TouchableOpacity onPress={sendEmail} style={styles.button}>
        <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}> 
          Send 
        </Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    </ImageBackground>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
borderWidth:1,
borderColor:'gray',
width:300,
height:60,
borderRadius:30,
backgroundColor:'white',
textAlign:'center'
    },
    button:{
      //borderWidth:1,
      width:240,
      marginTop:20,
      borderRadius:30,
      alignItems:'center',
      height:50,
      justifyContent:'center',
      backgroundColor:'#c91661',
          },
})