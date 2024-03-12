import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,Image,TextInput,ScrollView ,Animated,Alert,ActivityIndicator } from 'react-native'
import React, { useState,useRef, useEffect } from 'react'
import Background from '../assets/background.png'
import Logo from '../assets/whitelogo.png';
import * as ImagePicker from 'expo-image-picker';
import AnimatedHeader from '../reusableComponents/AnimatedHeader';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import DateTime from '../reusableComponents/DateTime'
import { useSelector, useDispatch } from 'react-redux'
import { userBioData,getDate,store_access_token} from '../Slices/CartSlice'



const EditProfile = ({navigation}) => {

    
    const [City,setCity] = useState()
    const [State,setState] = useState(0)
    const [StateData,setStateData] = useState()
    const [address , setaddress] = useState()
    const [CityData, setCityData] = useState()
    const [BasicInfo,setBasicInfo] = useState(true)
    const [PaymnetMethod,settPaymnetMethod] = useState(false)
    const [PersonelInfo,setPersonelInfo] = useState(false)
    const [image, setImage] = useState(null);  //set image here
    const [zip,setzip] = useState()
    const [mobile_number,setmobile_number] = useState()
    const [experience, setexperience] = useState()
    const [cardNumber,setcardNumber] = useState()
    const [cardName , setcardName] = useState()
    const [cvc,setcvc] = useState()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);
    
    const SelectedDate = useSelector((state) => state.cart.getDate)
    const dispatch = useDispatch()
    const offset = useRef(new Animated.Value(0)).current;
    
    var acces_token = useSelector((state) => state.cart.acces_token)
    const _data = {
        mobile_number: mobile_number,
        mobile_number_country:'US',
        address: address,
        state_id: State,
        city_id : City,
        zipcode: zip,
        date_of_birth: SelectedDate,
        emergency_number: '202-555-0139',
        experience: experience,
        short_headline: 'short_headline for Account Setting',
        self_introduction: 'self_introduction for Account Setting',
        card_name: cardName,
        card_number: cardNumber,
        cvc: cvc,
        expiration:'MM/YY',
           
    }
   
   
   
    const Save = () => {
    axios.post('https://doggywawky.com/api/account-setting',_data ,
      { 
        
        headers: {"Authorization" : `Bearer ${acces_token}`} 
    })
    .then((res) => {
      //console.log(res)
     // console.log(res.data.data.service_details)
     Alert.alert('Profile has been edited')
   navigation.navigate('Home')
    console.log(res.data.data.user.email)
    })
    .catch((error) => {
     Alert.alert('Some feilds have invalid information')
    })
  }

    useEffect(()=>{
   axios.get(`https://doggywawky.com/api/states/${2}`)
.then(function (response){
    setStateData(response.data.data.states)

})
.catch(function(error){
    Alert.alert('Server response error')
}),
axios.get(`https://doggywawky.com/api/cities/${State}`)
.then(function (response){
    setCityData(response.data.data.cities)

})
.catch(function(error){
    Alert.alert('Server response error')
})

 },[State])


 
 const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.cancelled) {
      setImage(result.uri);
      // console.log(result.uri.base64)
      var base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
      setImagebase64(base64)
    }
  };


const toggleBasicInfo = () => {
    setBasicInfo(true)
    settPaymnetMethod(false)
    setPersonelInfo(false)
}
const togglePaymnetMethod = () => {
    settPaymnetMethod(true)
    setBasicInfo(false)
    setPersonelInfo(false)
}
const togglePersonelInfo = () => {
    setPersonelInfo(true)
    settPaymnetMethod(false)
    setBasicInfo(false)
}

    const showBasicInfo = () => {
      
        
    if(BasicInfo){
      

        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:20}}>

     <View>         
<Text style={styles.heading}>Select State</Text>
                <View>
                <Picker
             style={styles.picker}
  selectedValue={State}
 
  onValueChange={(itemValue, itemIndex) =>
    setState(itemValue)
  }>
 
 {StateData && StateData.map((post)=>{
     const name = post.name;
     const id = post.id
     return(
        <Picker.Item label={name} value={id} />
     )
 })}

</Picker>
              
                </View>
                </View>

<View>
    <Text style={styles.heading}>Select City</Text>
                <View>
                <Picker
             style={styles.picker}
  selectedValue={City}
 
  onValueChange={(itemValue, itemIndex) =>
    setCity(itemValue)
  }>
 {CityData && CityData.map((post)=>{
     const name = post.name;
     const id = post.id
     return(
        <Picker.Item label={name} value={id} />
     )
 })}
</Picker>
                </View>
                </View>

              




                <View>
<Text style={styles.heading}>Zip Code</Text>
<TextInput placeholder='Zip Code' style={styles.textinput} value={zip} onChangeText={setzip}></TextInput>
</View>








<View>
<Text style={styles.heading}>Add your address</Text>
<TextInput  style={{
        borderWidth:1,
borderColor:'#ccc',
        borderRadius:30,
        height:100,
        width:300,
     justifyContent:'flex-start',
     paddingHorizontal:5,
        marginVertical:10,
        backgroundColor:'white'
    }} value={address} onChangeText={setaddress}></TextInput>

</View>

{/* Image Picker */}
<View>
<View style={{alignItems:'center',justifyContent:'space-evenly',marginVertical:10}}>
    <Text style={styles.heading}>Add you dogs profile picture</Text>
    {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 ,marginLeft:10,borderWidth:2,marginVertical:10}} />}
<TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttontext}>Add Picture</Text>
          </TouchableOpacity>


      </View>
      </View>
           <TouchableOpacity onPress={togglePersonelInfo
        }
           
           
               style={{backgroundColor:'#020230', marginBottom:100, marginVertical:20,height:45,width:270,borderRadius:30,alignItems:'center',justifyContent:'center',}}
           ><Text
           style={{color:'white',fontSize:20,fontWeight:'bold'}}
           >Save</Text></TouchableOpacity>
            </View>
            
        )
    }
    }
    const showPersonelInfo = () => {
     if(PersonelInfo){
        return(
            
            <View style={{flex:1,alignItems:'center',marginTop:10,}}>
             
<View style={{marginTop:20,alignItems:'center'}}>
              <Text style={styles.heading}>Select Date</Text> 
<DateTime/>




    <Text style={styles.heading}>Enter your first name</Text>
<TextInput placeholder='First Name' style={styles.textinput}></TextInput>
<Text style={styles.heading}>Enter your last name</Text>
      <TextInput placeholder='Last Name' style={styles.textinput}></TextInput>
      <Text style={styles.heading}>Enter your Address</Text>
      <TextInput style={{
        borderWidth:1,
borderColor:'#ccc',
        borderRadius:30,
        height:100,
        width:300,
      justifyContent:'flex-start',
        marginVertical:10,
        backgroundColor:'white'
    }}></TextInput>
     
    
      <Text style={styles.heading}>Add your phone numbers</Text>
      <TextInput placeholder='(201) 555-0123' style={styles.textinput} keyboardType='number-pad'  maxLength={12} value={mobile_number} onChangeText={setmobile_number}></TextInput>
      <Text style={styles.heading}>Emergency contact number</Text>
      <TextInput placeholder='Emergency contact [optional]' style={styles.textinput}  keyboardType='number-pad'  maxLength={12}></TextInput>
      <Text style={styles.heading}>Years of experience</Text>
      <TextInput placeholder='Experience' style={styles.textinput} maxLength={1} keyboardType='number-pad' onChangeText={setexperience} value={experience}></TextInput>

</View>
<TouchableOpacity onPress={togglePaymnetMethod}
        style={{backgroundColor:'#020230',marginBottom:100, marginVertical:20,height:45,width:270,borderRadius:30,alignItems:'center',justifyContent:'center',}}>
          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Save</Text>
      </TouchableOpacity>
            </View>
            
        )
     }
    }
    const showPaymentMethod = () => {
       if(PaymnetMethod){
        return(
            <View style={{flex:1,marginTop:10,alignItems:'center'}}>
             <View style={{marginTop:20,width:'100%',alignItems:'center'}}>
<View>
<Text style={styles.heading}>Name on Card</Text>
<TextInput style={styles.textinput}  onChangeText={setcardName} value={cardName}/>
</View>
<View>
<Text style={styles.heading}>Enter card number</Text>
<TextInput style={styles.textinput} keyboardType='number-pad' placeholder='Card Number' onChangeText={setcardNumber} value={cardNumber}/>
</View>

<TextInput style={styles.textinput} keyboardType='number-pad' placeholder='MM/YY'/>


<TextInput style={styles.textinput} keyboardType='number-pad' placeholder='CVC' maxLength={3} onChangeText={setcvc} value={cvc}/>


</View>
<TouchableOpacity onPress={Save}
        style={{backgroundColor:'#020230',marginBottom:100, marginVertical:20,height:45,width:270,borderRadius:30,alignItems:'center',justifyContent:'center',}}>
          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>Save</Text>
      </TouchableOpacity>
            </View>
        )
       }
    }
  return (
   <ImageBackground style={{flex:1}} source={Background} blurRadius={4}>
<ScrollView style={{flex:1}}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: offset } } }],
        { useNativeDriver: false }
      )}
      >
    
<AnimatedHeader animatedValue={offset} />

       <View style={{marginTop:10, flexDirection:'row',justifyContent:'space-evenly',}}>
       <TouchableOpacity style={BasicInfo? styles.true:styles.button} onPress={toggleBasicInfo}>
           <Text style={styles.buttontext}>Basic Info</Text>
       </TouchableOpacity>
       <TouchableOpacity style={PersonelInfo? styles.true:styles.button} onPress={togglePersonelInfo}>
           <Text style={styles.buttontext}>Personel Info</Text>
       </TouchableOpacity>
       <TouchableOpacity style={PaymnetMethod?styles.true: styles.button} onPress={togglePaymnetMethod}>
           <Text style={styles.buttontext}>Payment Method</Text>
       </TouchableOpacity>
       </View>
 
{
showBasicInfo()}

{
showPersonelInfo()}
{
showPaymentMethod()

}

       </ScrollView>
       </ImageBackground>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    heading:{
       fontWeight:'bold',
       fontSize:16,
    },
    headerimage:{
        width:225,
        height:100,
        marginBottom:5,
    },
    button:{
        backgroundColor:'#ccc',
        marginHorizontal:5,
        marginVertical:5,
        width:100,
        height:40,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
    },
    picker: {
        marginVertical: 30,
        width: 300,
        padding: 10,
    
    
        color:'black',
      
      },
    buttontext:{
        color:'white',
        fontSize:16,
    },
    textinput:{
        borderWidth:1,
borderColor:'#ccc',
        borderRadius:30,
        height:50,
        width:300,
       textAlign:'center',
        justifyContent:'center',
        marginVertical:10,
        backgroundColor:'white'
    },
    true:{
        backgroundColor:'#020230',
        marginHorizontal:5,
        marginVertical:5,
        width:100,
        height:40,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
       
    }
})