import { StyleSheet, Text, View,FlatList, Pressable } from 'react-native'
import React from 'react'
import { data } from '../assets/data/categoriesItem'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'


const Categories = ({activeCategory, handleChangeCategory}) => {
  return (
    <View style={styles.container}>
        <FlatList 
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.categoriesContainer}
            data={data.categoriesItem}
            keyExtractor={item => item}
            renderItem={({item,index}) => {
                return (
                       <CategoryItem  
                       isActive = {activeCategory == item}
                       handleChangeCategory={handleChangeCategory}
                       title={item} 
                       index={index}
                       />
                )
            }}
        />
     </View>
  )
}

const CategoryItem = ({title, index, isActive, handleChangeCategory}) => {
        const activeBackground = isActive ? "#000" : "#fff"
        const textColor = isActive ? "#fff" : "#000"
    return (
        <Animated.View entering={FadeInRight.delay(index*200).duration(1000).springify().damping(14)}>
            <Pressable onPress={() => handleChangeCategory(isActive ? null: title)} style={[styles.categoryItem,{backgroundColor:activeBackground}]}>
                <Text style={[styles.title,{color:textColor}]}>{title}</Text>
            </Pressable>
        </Animated.View>
        
    )
}

export default Categories

const styles = StyleSheet.create({
    categoriesContainer: {
        padding: 20,
        gap:10,
    },
    categoryItem: {
        paddingHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,

    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        padding: 8,
    }
})