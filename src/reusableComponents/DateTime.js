import React,{useState} from 'react'
import { StyleSheet, Text, View ,Platform,TouchableOpacity,Button, TextInput} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux'
import { userBioData,getDate,store_access_token} from '../Slices/CartSlice'

const DateTime = () => {
    const [date,setDate] = useState(new Date());
    const [mode,setMode] = useState('date')
    const [show,setshow] = useState(false)
const [text,settext] = useState('Select date and time')
const dispatch = useDispatch();

    const onChange = (event,selectDate) => {
const currentDate = selectDate || date;
setshow(Platform.OS==='ios')
setDate(currentDate);

let  tempDate = new Date(currentDate);
let fDate = tempDate.getFullYear()+ '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
let fTime = tempDate.getHours() +':' + tempDate.getMinutes();
settext(fTime + ' '+fDate)
dispatch(getDate(fDate))
}

    const showMode = (currentMode) => {
        setshow(true)
        setMode(currentMode)
    }
    return (
        <View style={{marginVertical:10}}>
        
        <View style={{flexDirection:'row',justifyContent:'space-evenly', alignItems:'center',}}>
            <Text style={{fontWeight:'100',fontSize:15,}}>{text}</Text>
            <View style={{flexDirection:'row'}}>
         <TouchableOpacity style={styles.button} onPress={()=>showMode('time')}>
             <Text style={styles.buttontext}>Select time</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={()=>showMode('date')}>
         <Text style={styles.buttontext}>Select Date</Text>
         </TouchableOpacity>
         </View>
        </View>


         {show&&(
            <DateTimePicker
         testID='dateTimePicker'
         value= {date}
        mode={mode}
        is24Hour={true}
        display='default'
        onChange={onChange}       
                />)}
                </View>

    );
}

export default DateTime

const styles = StyleSheet.create({
    button:{
        backgroundColor:'#c91661',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        margin:5,
        height:40,
        width:90,
    },
    buttontext:{
        color:'white',
        
    }
})
