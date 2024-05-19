import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Splash from '../screens/Splash'

const Stack = createStackNavigator()

const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={
      {
        headerShown: false,
      }
    }>
      <Stack.Screen name='splash' component={Splash} />
      <Stack .Screen name='Home' component={Home} />
    </Stack.Navigator>

  )
}

export default AppNavigation

const styles = StyleSheet.create({

})