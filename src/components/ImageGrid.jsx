import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MasonryFlashList } from "@shopify/flash-list";
import { getColoum, getImageSize } from '../utils/helper/common';

const ImageGrid = ({ images, navigation}) => {

    const coloum = getColoum()
    return (
        <View style={styles.container}>
            <MasonryFlashList
                data={images}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flashListContainer}
                numColumns={coloum}
                renderItem={({ item, index }) => <ImageCard navigation={navigation} item={item} index={index} />}
                estimatedItemSize={200}
            />
        </View>

    )
}



const ImageCard = ({ item, index, navigation}) => {
    const getImageHeight = () => {
        let { imageHeight: height, imageWidth: width } = item;
        return { height: getImageSize(height, width) };
    }

    return (
        <View>
            <Pressable
               onPress={() => {
                navigation.navigate('Image',{...item})
               }}
                style={[styles.imageWrapper]}>
                <Image
                    style={[styles.images, getImageHeight()]}
                    source={{ uri: item.webformatURL }}
                    transition={100}
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
        // backgroundColor: '#fff'
    },
    flashListContainer: {
        paddingHorizontal: 10,
    },
    images: {
        // height: 300,
        width: '100%',
        borderRadius: 20
    },
    imageWrapper: {
        marginBottom: 6,
        marginHorizontal: 4
    }

})