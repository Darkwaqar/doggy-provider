import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View ,TextInput,TouchableOpacity,Image,ScrollView,ImageBackground,Platform,KeyboardAvoidingView, Alert} from 'react-native'
import Background from '../assets/background.png'
import BlackBackground from '../assets/BlackBackground.png'
import axios from 'axios';
import { userBioData,faceBookLoginData,store_access_token} from '../Slices/CartSlice'
import { useSelector, useDispatch } from 'react-redux'




let disabled = false


// const key = Application.androidId;
// console.log(key)
// const name = Application.nativeApplicationVersion;
// console.log(name)



const SignIn = ({navigation}) => {

  const  [userName,setuserName] = useState('')
  const  [password,setpassword] = useState('')
  const [loginData,setloginData] = useState()
  const [signInPost,setsignInPost] = useState()
  const [Status,setStatus] = useState()
const [Message,setMessage] = useState();
const [success,setsuccess] = useState();
const [access_token,setaccess_token] = useState();
const [userInfo,setuserInfo] = useState();

const dispatch = useDispatch()


  // Platform Id
  let PlatformID = 0
  if(Platform.OS==='android'){
    PlatformID = 1
  }
  else{
    PlatformID=2
  }
  




var data = {
  email: userName,
  password : password,
  fcm_token : "string", 
  platform_id : PlatformID
}





  function Post(){
 axios.post('https://doggywawky.com/api/auth/login', data)
.then(function (response) {
 console.log('Login ')
 var Name = 'Welcome' +' '+ response.data.data.user.first_name;
 setMessage(Name)
 setsuccess(true)

 dispatch(store_access_token(response?.data.data.access_token))
 dispatch(userBioData(response.data.data.user));
//  setuserName('');
//  setpassword('');
//  console.log(response.data.data.user.email)
  navigation.navigate('DrawerNavigator')
})
.catch(function (error) {
  
  

  if(userName===''||password==='')
  {
    Alert.alert("Username or password field empty")
  }
  else{
    // error.response.data.data.errors.email&& Alert.alert(error.response.data.data.errors.email)
    // error.response.data.data.errors.email|| Alert.alert("Wrong password")
    error.response.data.data.errors.email&& setMessage(error.response.data.data.errors.email)
    error.response.data.data.errors.email|| setMessage("Wrong password")
  setsuccess(false)
  }
  

});

 }


 


 
 function _Navigation(){
if(Status===200){
navigation.navigate('DrawerNavigator')
}
else{
  Alert.alert("Wrong password")
}
}
// facebook login


  return (
      
        <ImageBackground style={{flex:1}} source={Background} blurRadius={3}>
            <ScrollView  
            contentContainerStyle={{justifyContent:'center',flex:1,}}
             keyboardDismissMode={'on-drag'}> 

            <View style={styles.container}>
          
            <Image style={{width:250,height:250,}} source={BlackBackground}/>
         
        
            
            <KeyboardAvoidingView behavior='height'>
              <Text style={success? {color:'green'}:{color:'red'}}>{Message}</Text>
            <TextInput style={styles.textinput} placeholder='email' keyboardType='email-address' value={userName} onChangeText={setuserName}></TextInput>
            
            <TextInput style={styles.textinput} placeholder='Password' value={password} onChangeText={setpassword} secureTextEntry={true} />
            </KeyboardAvoidingView>
           <TouchableOpacity onPress={Post} disabled={disabled} style={styles.button}><Text style={{color:'white', fontWeight:'bold'}}>Login In</Text></TouchableOpacity>
           <TouchableOpacity onPress={()=>navigation.navigate('SignUp')}  style={styles.button}><Text style={{color:'white', fontWeight:'bold'}}>Sign Up</Text></TouchableOpacity>
           <View>
           <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}><Text style={{color:'blue',marginTop:20,marginBottom:150}}>Forgot Password</Text></TouchableOpacity>  
              </View>
            </View>
            </ScrollView> 
            </ImageBackground>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        alignItems:'center',
marginTop:10,
marginBottom:200
    },
    textinput:{
        backgroundColor:'white',
       
        width:300,
        margin:5,
        marginTop:10,
        borderRadius:30,
        height:60,
        textAlign:'center',
    },
    button:{
//borderWidth:1,
width:240,
marginTop:10,
borderRadius:30,
alignItems:'center',
height:60,
justifyContent:'center',
backgroundColor:'#c91661',
    },
})
