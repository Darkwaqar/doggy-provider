import { StyleSheet, Text, View ,ImageBackground,Image,TouchableOpacity,ScrollView,FlatList,TextInput,SafeAreaView,Alert} from 'react-native'
import React,{useEffect, useState} from 'react'
import DemoPic from '../assets/demo-user-profile.jpg'
import Background from '../assets/background.png'
import AppLoading from 'expo-app-loading';
import { useFonts,oswald,Montserrat} from '@expo-google-fonts/inter';
import Gradiant from '../assets/gradiant.png'
import { MaterialCommunityIcons } from "@expo/vector-icons/"
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import { useSelector} from 'react-redux'
import product from '../assets/dog.png'
import {Picker} from '@react-native-picker/picker';
import DogList from '../reusableComponents/DogList'
import { symbolicateLogLazy } from 'react-native/Libraries/LogBox/Data/LogBoxData';



const ProviderSetup = ({navigation}) => {
  const [dogs,setdogs] = useState()
  

  const [Smoking,setSmoking] = useState(false)
  const [Age05,setAge05] = useState(false)
  const [Age612,setAge612] = useState(false)
  const [FurnitureAllowed,setFurnitureAllowed] = useState(false)
  const [AllowedonBed,setAllowedonBed] = useState(false)
  const [Caged,setCaged] = useState(false)


const [Families,setFamilies] = useState(false)
const [Puppiesunder1,setPuppiesunder1] = useState(false)
const [notcrateTrained,setnotcrateTrained] = useState(false)
const [UnneuteredMale,setUnneuteredMale] = useState(false)
const [UnneuteredFemale,setUnneuteredFemale] = useState(false)
const [femaleinHeat,setfemaleinHeat] = useState(false)
const [Allowed,setAllowed] = useState()
const [userInfo,setuserInfo] = useState()

const [short_headline,setshort_headline] = useState()
const [experience,setexperience] = useState()
const [about_yourself,setabout_yourself] = useState()
const [petPerday,setpetPerday] = useState()
const [Home ,setHome] = useState()
const [Fenced,setFenced] =  useState()




var acces_token = useSelector((state) => state.cart.acces_token)

  useEffect(()=>{
    axios.get('https://doggywawky.com/api/dog/all',
    {
        headers: {"Authorization" : `Bearer ${acces_token}`} 
    })
    .then((response)=>{
        setdogs(response.data.data.dogs)
    })
    .catch((error)=>{
        console.log('error')
    })
},[setdogs])

useEffect(()=>{
   axios.get('https://doggywawky.com/api/me',
  {
      headers: {"Authorization" : `Bearer ${acces_token}`} 
  })
  .then(async(response)=>{
   
   setuserInfo(response.data.data.user)
  })
  .catch((error)=>{
      console.log('error')
  })
},[])
  
const data = {
  experience: 10,
  short_headline: short_headline,
  self_introduction: about_yourself,
  
  owners_expect_when_boarding_at_your_home: [
    "smooking",
    "age05"
  ],
  yard_do_you_have: Fenced,
  home_do_you_live_in: Home,
pets_per_day_can_you_host: petPerday
}

const Save = ()=>{
  axios.post('https://doggywawky.com/api/dashboard/store', data,
 {
     headers: {"Authorization" : `Bearer ${acces_token}`} 
 })
 .then(async(response)=>{
  Alert.alert('Dashboard details have been saved')
 
 })
 .catch((error)=>{
     Alert.alert('Invalid Info')
 })
}



const renderItem = ({item}) => (
  <DogList name={item.pet_name} image={item.dog_profile_image?item.dog_profile_image:product}/>
)



  let [fontsLoaded] = useFonts({
    oswald: require('../assets/oswald/Oswald_Stencil/Oswald-Stencil.otf'),
    MontserratBold: require('../assets/Montserrat/Montserrat-Bold.ttf'),
    Montserrat: require('../assets/Montserrat/Montserrat-Regular.ttf')
   });
 
   if (!fontsLoaded) {
     return <AppLoading />;
   } else {
  return (
    <ImageBackground style={{flex:1,}} source={Background} blurRadius={4}>
    <SafeAreaView>
    <ScrollView>
      <View style={{marginBottom:100,marginTop:50}}>
       <View 
       style={{alignItems:'center',width:220,marginLeft:10,marginTop:50,height:230,justifyContent:'space-evenly',backgroundColor:'#c91661',borderRadius:20}}>
      
      {userInfo?.user_details.user_image? <Image style={styles.image} source={userInfo.user_details.user_image}/>:<Image style={styles.image} source={DemoPic}/>}
       <Text style={{fontFamily:'oswald',fontSize:20,color:'white'}}>{userInfo?.full_name}</Text>
       <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}><Text style={{color:'white'}}>Edit profile</Text></TouchableOpacity>
      
       </View>
       <View style={{marginHorizontal:5,marginVertical:20,}}>
      <Text style={styles.heading}>Your Dogs</Text>
      <Text style={{color:'gray'}}>Add your dogs or edit their info</Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('AddDog')}>
      <MaterialCommunityIcons color="white" name="plus" size={28} />
        <Text style={{color:'white',fontSize:18}}>Add a dog</Text>
        </TouchableOpacity>
        <View style={{height:200,marginVertical:5,}}>
             <FlatList
             horizontal
             showsHorizontalScrollIndicator={false}
             data={dogs}
             renderItem={renderItem}
             keyExtractor={((item)=>item.id)}
             />
</View>
    </View>
    <View style={{marginHorizontal:5,marginVertical:20,}}>
    <Text style={styles.heading}>Services</Text>
    <Text style={{color:'gray'}}>Set your services preferences</Text>


    <TouchableOpacity style={styles.serviceTab} onPress={()=>navigation.navigate('ServiceSettings',{service:'Dog Walking'})}>
    <MaterialCommunityIcons color="white" name="plus" size={28} />
    <Text style={styles.serviceText}>Dog Walking</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.serviceTab}  onPress={()=>navigation.navigate('ServiceSettings',{service:'Dog Sitting'})}>
    <MaterialCommunityIcons color="white" name="plus" size={28} />
    <Text style={styles.serviceText}>Dog Siting</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.serviceTab}  onPress={()=>navigation.navigate('ServiceSettings',{service:'Dog Grooming'})}>
    <MaterialCommunityIcons color="white" name="plus" size={28} />
    <Text style={styles.serviceText}>Dog Grooming</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.serviceTab}  onPress={()=>navigation.navigate('ServiceSettings',{service:'Dog Dating'})}>
    <MaterialCommunityIcons color="white" name="plus" size={28} />
    <Text style={styles.serviceText}>Dog Dating</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.serviceTab}  onPress={()=>navigation.navigate('ServiceSettings',{service:'Pooper Scooper'})}>
    <MaterialCommunityIcons color="white" name="plus" size={28} />
    <Text style={styles.serviceText}>Pooper Scooper</Text>
    </TouchableOpacity>

   
    </View>
   

    <View style={{height:80,
backgroundColor:'#22224A',
width:'100%',
flexDirection:'row',
alignItems:'center',
paddingHorizontal:5,
marginVertical:5,
alignItems:'center',
justifyContent:'center'
}}>
    
    <Text style={{
    color:'white',
    fontFamily:'oswald',
    fontSize:30,
    marginVertical:5
  }}>Your profile details</Text>
    </View>
   <View style={{alignItems:'center',width:'100%',marginVertical:10,}}>
    <View>
     <Text style={{fontFamily:'Montserrat',fontSize:15}}>Write headline short, descriptive and genuine.</Text>
     <TextInput style={styles.formInput} onChangeText={setshort_headline} value={short_headline}/>
     </View>
     <View>
     <Text style={{fontFamily:'Montserrat',fontSize:15}}>Years of experience</Text>
     <TextInput style={styles.formInput} onChangeText={setexperience} value={experience}/>
     </View>
     <View>
     <Text style={{fontFamily:'Montserrat',fontSize:15}}>About yourself</Text>
     <TextInput style={styles.formInput} onChangeText={setabout_yourself} value={about_yourself}/>
     </View>
     <View>
     <Text style={{fontFamily:'Montserrat',fontSize:15}}>How many pets per day can you host in your home?</Text>
     <TextInput style={styles.formInput} onChangeText={setpetPerday} value={petPerday}/>
     </View>

   </View>
   <Text style={styles.heading}>About your home</Text>
   <View style={{alignItems:'center',width:'100%',marginVertical:10,}}>
     <View style={{alignItems:'center'}}>
       <View>
   <Text style={{fontFamily:'Montserrat',fontSize:15}}>What type of home do you live in?</Text>
   <View>
                <Picker
             style={styles.picker}
  selectedValue={Home}
 
  onValueChange={(itemValue, itemIndex) =>
    setHome(itemValue)
  }>
      <Picker.Item label='House' value='House' />
        <Picker.Item label='Apartment' value='Apartment'/>
        <Picker.Item label='Farm' value='Farm' />
</Picker>
              
                </View>
                </View>
                <View>
                <Text style={{fontFamily:'Montserrat',fontSize:15}}>What type of yard do you have?</Text>
                <View>
                <Picker
             style={styles.picker}
  selectedValue={Fenced}
 
  onValueChange={(itemValue, itemIndex) =>
    setFenced(itemValue)
  }>
      <Picker.Item label='Fenced yard' value='Fenced yard' />
        <Picker.Item label='Unfenced yard' value='Unfenced yard'/>
        <Picker.Item label='No yard' value='No yard' />
</Picker>
              
                </View>
                </View>
                <View style={{marginVertical:10}}>
                <Text style={{fontFamily:'Montserrat',fontSize:15}}>What can pet owners expect when boarding at your home?</Text>
   <TouchableOpacity style={Smoking?styles.buttonTrue:styles.buttonFalse} onPress={()=>setSmoking(!Smoking)}>
     <Text style={Smoking?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Smoking inside Home</Text>
   </TouchableOpacity>

   <TouchableOpacity style={Age05?styles.buttonTrue:styles.buttonFalse} onPress={()=>setAge05(!Age05)}>
     <Text style={Age05?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Children age 0-5</Text>
   </TouchableOpacity>

   <TouchableOpacity style={Age612?styles.buttonTrue:styles.buttonFalse} onPress={()=>setAge612(!Age612)}>
     <Text style={Age612?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Children age 6-12</Text>
   </TouchableOpacity>

   <TouchableOpacity style={FurnitureAllowed?styles.buttonTrue:styles.buttonFalse} onPress={()=>setFurnitureAllowed(!FurnitureAllowed)}>
     <Text style={FurnitureAllowed?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Dogs are allowed on furniture</Text>
   </TouchableOpacity>

   <TouchableOpacity style={AllowedonBed?styles.buttonTrue:styles.buttonFalse} onPress={()=>setAllowedonBed(!AllowedonBed)}>
     <Text style={AllowedonBed?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Dogs are allowed on bed</Text>
   </TouchableOpacity>

   <TouchableOpacity style={Caged?styles.buttonTrue:styles.buttonFalse} onPress={()=>setCaged(!Caged)}>
     <Text style={Caged?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Caged Dogs in home</Text>
   </TouchableOpacity>
                </View>
                <View style={{marginVertical:10}}>
                <Text style={{fontFamily:'Montserrat',fontSize:15}}>Are you able to host any of the following?</Text>

                <TouchableOpacity style={Families?styles.buttonTrue:styles.buttonFalse} onPress={()=>setFamilies(!Families)}>
     <Text style={Families?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Pets from different families at the same time</Text>
   </TouchableOpacity>

   <TouchableOpacity style={Puppiesunder1?styles.buttonTrue:styles.buttonFalse} onPress={()=>setPuppiesunder1(!Puppiesunder1)}>
     <Text style={Puppiesunder1?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Puppies under 1 year old</Text>
   </TouchableOpacity>

   <TouchableOpacity style={notcrateTrained?styles.buttonTrue:styles.buttonFalse} onPress={()=>setnotcrateTrained(!notcrateTrained)}>
     <Text style={notcrateTrained?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Dogs that are not crate trained</Text>
   </TouchableOpacity>

   <TouchableOpacity style={UnneuteredMale?styles.buttonTrue:styles.buttonFalse} onPress={()=>setUnneuteredMale(!UnneuteredMale)}>
     <Text style={UnneuteredMale?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Unneutered male dogs</Text>
   </TouchableOpacity>

   <TouchableOpacity style={UnneuteredFemale?styles.buttonTrue:styles.buttonFalse} onPress={()=>setUnneuteredFemale(!UnneuteredFemale)}>
     <Text style={UnneuteredFemale?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Unneutered female dogs</Text>
   </TouchableOpacity>

   <TouchableOpacity style={femaleinHeat?styles.buttonTrue:styles.buttonFalse} onPress={()=>setfemaleinHeat(!femaleinHeat)}>
     <Text style={femaleinHeat?{color:'white',fontSize:16}:{color:'black',fontSize:16}}>Female dogs in heat</Text>
   </TouchableOpacity>
                </View>
   </View>
   <TouchableOpacity onPress={Save} style={{
backgroundColor:'#22224A',
width:'80%',
paddingHorizontal:15,
height:60,
borderRadius:40,
justifyContent:'center',
alignItems:'center',
margin:5,
  }} >
     <Text style={{color:'white',fontSize:26,fontWeight:'bold'}}>Save</Text>
   </TouchableOpacity>
   </View>

    </View>
       </ScrollView>
       </SafeAreaView>
      </ImageBackground>
  )
   }
}

export default ProviderSetup

const styles = StyleSheet.create({
  image:{
    height:120,
    width:120,
    margin:5,
    borderRadius:60
  },
  buttonTrue:{
backgroundColor:'#22224A',
width:'100%',
paddingHorizontal:15,
height:40,
borderRadius:20,
justifyContent:'center',
alignItems:'center',
margin:5,

  },
  buttonFalse:{
backgroundColor: 'white',
width:'100%',
paddingHorizontal:15,
height:40,
borderRadius:20,
justifyContent:'center',
alignItems:'center',
margin:5,

  },
  heading:{
    fontFamily:'oswald',
    fontSize:29,
  marginVertical:5,
    marginTop:20,
    marginLeft:10
  },
  button:{
    flexDirection:'row',
    height:40,
    backgroundColor:'#22224A',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal:20,
    marginVertical:5,

  },
  picker: {
    marginVertical: 10,
    width: 300,
    padding: 10,
backgroundColor:'white',

    color:'black',
  
  },
  serviceTab:{
height:40,
backgroundColor:'#22224A',
width:'100%',
flexDirection:'row',
alignItems:'center',
paddingHorizontal:5,
marginVertical:5,
borderRadius:5
  },
  serviceText:{
    color:'white',
    fontWeight:'bold',
    fontSize:17,
    marginVertical:5
  },
  formInput:{
    width:350,
    marginVertical:5,
    height:40,
    borderRadius:20,
    backgroundColor:'white',

  }
})