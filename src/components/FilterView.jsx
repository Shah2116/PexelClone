import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { capitazile } from '../utils/helper/common'

const SectionView=({title,content})=>{
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <View>
                {content}
            </View>
        </View>
    )
  }

  export const CommonFilterRow=({data,filterName,filters,setFilters})=>{

    const onSelect=(item) =>{
        setFilters({...filters,[filterName]:item})
    }    
      return (
          <View style={styles.flexWrapRow}>
              {

                  data && data.map((item) => {
                      let isActive = filters && filters[filterName] == item;
                      let activeBackground = isActive ? "#000" : "#fff";
                      let activeTextColor = isActive ? "#fff" : "#000";
                      return (
                          <Pressable
                              key={item}
                              onPress={() => onSelect(item)}
                              style={[styles.outlinedButton, { backgroundColor: activeBackground }]}
                          >
                              <Text style={[styles.outlinedButtonText, { color: activeTextColor }]}>{capitazile(item)}</Text>
                          </Pressable>
                      )
                  })
              }
          </View>
      )
  }

  export const ColorFilterRow=({data,filterName,filters,setFilters})=>{

    const onSelect=(item) =>{
        setFilters({...filters,[filterName]:item})
    }    
      return (
          <View style={styles.flexWrapRow}>
              {
                  data && data.map((item) => {
                      let isActive = filters && filters[filterName] == item;
                      let activeBorderColor = isActive ? "#000" : "#fff";
                      return (
                          <Pressable
                              key={item}
                              onPress={() => onSelect(item)}
                          >
                          <View style={[styles.colorBtnWrapper,{borderColor:activeBorderColor}]}>
                                <View style={[styles.color,{backgroundColor:item}]}/>
                          </View>
                          </Pressable>
                      )
                  })
              }
          </View>
      )
  }


  export default SectionView;

const styles = StyleSheet.create({
    container: {
        gap:10,
    },
    titleText:{
        fontSize: 25
    },
    flexWrapRow: {
        flexDirection: 'row',
        flexWrap:'wrap',
        gap:10,
    },
    outlinedButton:{
        padding:8,
        paddingHorizontal:10,
        borderWidth:2,
        borderRadius:10,
        borderCurve:'continuous',
    },
    outlinedButtonText:{

    },
    colorBtnWrapper: {
        padding: 3,
        borderWidth:2,
        borderRadius:10,
        borderCurve: 'continuous',
    },
    color: {
        height:30,
        width:40,
        borderRadius:10,
    },

})