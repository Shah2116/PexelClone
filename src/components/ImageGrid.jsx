import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import { getColoum } from '../utils/helper/common';

const ImageGrid = ({images}) => {
    const coloum = getColoum()
  return (
      <View style={styles.container}>
          <MasonryFlashList
              data={images}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.flashListContainer}
              numColumns={coloum}
              renderItem={({item,index}) => <ImageCard item={item} index={index}/>}
              estimatedItemSize={200}
          />
      </View>
    
  )
}

 const ImageCard = ({item,index}) =>{
    console.log("item",item)
    return(
        <View>
            <Pressable>
                <Image 
                    style={styles.images}
                    source={{uri:item.webformatURL}}
                />
            </Pressable>
        </View>
    )
 }

export default ImageGrid

const styles = StyleSheet.create({
    container: {
        minHeight: 3,
        height: "100%",
        // width: "100%",
        // backgroundColor: 'blue',
    },
    flashListContainer:{
        paddingHorizontal: 10,
    },
    images: {
        height:300,
        width: '100%',
    }



})