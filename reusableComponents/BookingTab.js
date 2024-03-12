import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BookingTab = (props) => {
  return (
    <View style={{borderWidth:1,margin:5,borderRadius:10,backgroundColor:'white',paddingVertical:10,}}>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.heading}>#: </Text>
      <Text>{props.number} </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.heading}>Address: </Text>
      <Text>{props.address} </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.heading}>Date:  </Text>
      <Text>{props.date} </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.heading}>Amount: </Text>
      <Text>{props.amount} </Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Text style={styles.heading}>Requested: </Text>
      <Text>{props.requested} </Text>
      </View>
    </View>
  )
}

export default BookingTab

const styles = StyleSheet.create({
  heading:{
    fontSize:15,
    fontWeight:'bold',
    marginLeft:5,
  }
})