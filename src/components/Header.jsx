import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import BarIcon from 'react-native-vector-icons/FontAwesome6'


const Header = ({openFilterModal}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pixels</Text>
      <Pressable onPress={openFilterModal}>
        <BarIcon name='bars-staggered' size={22} color={'#000'} />
      </Pressable>
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