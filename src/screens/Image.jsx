import { Button, StyleSheet, Text, View, Image, Platform, ActivityIndicator, Pressable, PermissionsAndroid, Alert } from 'react-native'
import React, { useState } from 'react'
import { BlurView } from '@react-native-community/blur'
import { useNavigation, useRoute } from '@react-navigation/native'
import Cross from 'react-native-vector-icons/Feather'
import Download from 'react-native-vector-icons/Octicons'
import ShareIcon from 'react-native-vector-icons/Entypo'
import Animated, { FadeInDown } from 'react-native-reanimated'
import RNFS, { downloadFile } from 'react-native-fs';
import Share from 'react-native-share';

const ImageScreen = () => {

  const [status, setStatus] = useState('loading')

  const navigation = useNavigation();
  const route = useRoute()
  const uri = route?.params?.webformatURL
  const fileName = route?.params?.previewURL?.split('/').pop()
  const imageURL = uri
  const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`

  const getSize = () => {
    const imageWidth = route?.params?.imageWidth
    const imageHeight = route?.params?.imageHeight
    const aspectRation = imageWidth / imageHeight;
    // const maxWidth = Platform.OS == 'web' ? 500 : 200
    maxWidth = 300
    const calculateHeight = maxWidth / aspectRation;
    const calculateWidth = maxWidth;

    if (aspectRation < 1) {  //portraite image
      calculateWidth = calculateHeight * aspectRation
    }
    return {
      width: calculateWidth,
      height: calculateHeight
    }

  }
  const onLoad = () => {
    setStatus('')
  }

  const handleDownloadImage = async () => {
    setStatus('downloading')
    const uri = await downloadImageFile()
    if (uri) {
      console.log("Image Downloaded")
    }
  }

  const handleShareImage = async () => {
    setStatus('sharing')
    try {
      // const uri = await downloadImageFile()
      // if(uri){
      //   const options = {
      //     uri : uri
      //   }
      // }
      // Ensure the file exists before trying to share
      await RNFS.writeFile(filePath, 'This is a sample file.', 'utf8');
      const options = {
        url: `file://${filePath}`,
      };
      Share.open(options)
      setStatus('')
      console.log("file shared successfully:", options)

    } catch (error) {
      console.log("got error:", error.message)
      return null;
    }
  }

  //  downloading local image 
  const downloadImageFile = async () => {
    try {
      const result = await RNFS.downloadFile({
        fromUrl: uri,
        toFile: filePath,
      })
      setStatus('')
      return uri;
    } catch (error) {
      setStatus('')
      console.log("got error", error.message)
      Alert.alert("Image", error.message)
      return null
    }
  }


  return (
    <View
      style={styles.container}
      blurType='dark'
      tint='dark'
      blurAmount={36}
    >

      <View>
        <View style={styles.loading}>
          {
            status == 'loading' && <ActivityIndicator size={'large'} color={'white'} />
          }
        </View>
        <Image
          source={{ uri: uri }}
          style={[styles.image]}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.button}>
        <Animated.View style={styles.buttonIcon}>
          <Pressable
            onPress={() => navigation.goBack()}>
            <Cross name='x' size={30} color={'white'} />
          </Pressable>
        </Animated.View>
        <Animated.View style={styles.buttonIcon}>
          {
            status == 'downloading' ? (
              <View style={[styles.button, { marginBottom: 22 }]}>
                <ActivityIndicator size={'large'} color={'white'} />
              </View>
            ) : (
              <Pressable onPress={handleDownloadImage}>
                <Download name='download' size={30} color={'white'} />
              </Pressable>
            )
          }

        </Animated.View>
        <Animated.View style={styles.buttonIcon}>
          {
            status == 'sharing' ? (
              <View style={[styles.button, { marginBottom: 22 }]}>
                <ActivityIndicator size={'large'} color={'white'} />
              </View>
            ) : (
              <Pressable onPress={handleShareImage}>
                <ShareIcon name='share' size={30} color={'white'} />
              </Pressable>
            )
          }

        </Animated.View>
      </View>
    </View>
  )
}

export default ImageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(225,225,225, 0.1)',
    backgroundColor: 'rgba(225,225,225, 0.1)'
  },
  loading: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  buttonIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(225,225,225,0.2)',
    borderRadius: 10,
    borderCurve: 'continuous',
  }
})