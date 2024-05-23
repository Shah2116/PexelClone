import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Splash from '../screens/Splash'
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Stack = createStackNavigator()

const AppNavigation = () => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack.Navigator screenOptions={
          {
            headerShown: false,
          }
        }>
          <Stack.Screen name='splash' component={Splash} />
          <Stack.Screen name='Home' component={Home} />
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>

  )
}

export default AppNavigation

const styles = StyleSheet.create({

})