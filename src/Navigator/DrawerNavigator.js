import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProviderSetup from '../screens/ProviderSetup';
import MyBooking from '../screens/MyBooking';
import RequestedBooking from '../screens/RequestedBooking';
const DrawerNavigator = () => {

    const Drawer = createDrawerNavigator();

  return (
   
    <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{headerShown:false,}}  options={{gestureEnabled: false}}>
      <Drawer.Screen name="Dashboard" component={ProviderSetup} />
      <Drawer.Screen name="MyBooking" component={MyBooking} />
      <Drawer.Screen name="RequestedBooking" component={RequestedBooking} />
    
    </Drawer.Navigator>
 
  )
}

export default DrawerNavigator

