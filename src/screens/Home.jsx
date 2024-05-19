import {Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState,useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/Header';
import Search from '../assets/images/search.png'
import Cross from '../assets/images/cross.png'
import Categories from '../components/Categories';


const Home = () => {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

  const { top } = useSafeAreaInsets();
  const searchInputRef = useRef(null);
  const paddingTop = top > 0 ? top + 10 : 30;

  const handleChangeCategory= (cat)=>{
        setActiveCategory(cat)
  }
  console.log('active category', activeCategory)

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Header />

      {/* Search Bar */}

      <View style={styles.searchBox}>
        <Image source={Search} style={styles.searchIcon} />
       
        <TextInput
          placeholder='Search for photos..'
          onChangeText={text => setSearch(text)}
          ref={searchInputRef}
          style={styles.searchInput}
        />
         {
          search &&  (
            <Pressable onPress={() => setSearch('')}>
              <Image source={Cross} style={styles.cross} />
            </Pressable>
           )
        }
      </View>
      {/* Categories Components */}
      <View>
      <Categories 
        activeCategory={activeCategory}
        handleChangeCategory={handleChangeCategory}
      />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    searchBox: {
      flexDirection: 'row',
      marginHorizontal:20,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal:10,
      borderRadius: 10,
      marginTop: 10,
      borderWidth: 1,
    },
    searchIcon: {
      height: 30,
      width: 30,
    },
    searchInput: {
      flex:1,
      fontSize: 20,
    },
    cross: {
      height: 22,
      width: 22,
    }
})