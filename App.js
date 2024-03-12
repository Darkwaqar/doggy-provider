import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux'
import store from './Store'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import ForgotPassword from './screens/ForgotPassword'
import ProviderSetup from './screens/ProviderSetup'
import AddDog from './screens/AddDog';
import EditProfile from './screens/EditProfile'
import ServiceSettings from './screens/ServiceSettings';
import DrawerNavigator from './Navigator/DrawerNavigator';
export default function App() {


const Stack = createStackNavigator();
return (
  <Provider store={store}>
    <NavigationContainer>
<SafeAreaProvider>
    
      <Stack.Navigator initialRouteName='SignIn'>
      <Stack.Screen 
      options={{
    headerShown: false
  }} 
  name="SignIn" 
  component={SignIn} 
  />
      <Stack.Screen options={{
    headerShown: false
  }}  
  name="SignUp" 
  component={SignUp} />
      <Stack.Screen options={{
    headerShown: false
  }} 
   name="ForgotPassword" 
   component={ForgotPassword} />
      <Stack.Screen
      options={{headerShown: false}}
      name='ProviderSetup'
      component={ProviderSetup}
      />
       <Stack.Screen
      options={{headerShown: false}}
      name='AddDog'
      component={AddDog}
      />
       <Stack.Screen
      options={{headerShown: false}}
      name='EditProfile'
      component={EditProfile}
      />

<Stack.Screen
      options={{headerShown: false}}
      name='ServiceSettings'
      component={ServiceSettings}
      />

<Stack.Screen
      options={{headerShown: false}}
      name='DrawerNavigator'
      component={DrawerNavigator}
      />


      </Stack.Navigator>


      </SafeAreaProvider>
   
    </NavigationContainer>
    </Provider>
  )
}

