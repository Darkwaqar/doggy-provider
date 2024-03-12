import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'

export default function SocialMedia(props) {
    return (
        <View style={{flexDirection:'row',marginVertical:15,marginBottom:10,justifyContent:'center'}}>
<TouchableOpacity style={styles.logo} activeOpacity={0.5}  onPress={props.facebook}>

    <Image style={styles.image}
     source={require("../assets/facebook.png")}
    
    />
    
    
</TouchableOpacity>
    
<TouchableOpacity style={styles.logo} activeOpacity={0.5} onPress={props.google}>
    <Image style={styles.image}
    source={require("../assets/google.png")} 
    
    />
    
</TouchableOpacity>
<TouchableOpacity style={styles.logo} activeOpacity={0.5} onPress={props.linkdin}>
    <Image style={styles.image}
     source={{ uri: 'https://cdn3.iconfinder.com/data/icons/capsocial-round/500/linkedin-512.png',}}
    
    />
    
    
</TouchableOpacity>

  </View>
    )
}



const styles = StyleSheet.create({
    logo:{
        padding:6,
          },
          image:{
            width:55,
            height:55,
            resizeMode:'contain',
            padding:1,
            
          },
})