import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import BarIcon from 'react-native-vector-icons/FontAwesome6'


const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pixels</Text>
      <BarIcon name='bars-staggered' size={22} color={'#000'}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
},
title: {
  fontSize: 40,
  color: '#000',
  fontWeight: '600'
}
})