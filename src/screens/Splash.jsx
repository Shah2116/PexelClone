import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import welcome from '../assets/images/welcome.png'
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native'

const Splash = () => {
    const navigation = useNavigation()

    const goToHome =() => {
        navigation.navigate('Home')
    }


  return (
      <View style={styles.conatiner}>
          <StatusBar barStyle={'light-content'} />
          <Image
            source={welcome}
            style={styles.bgImage}
          />

        {/* linear-gradinate */}

        <Animated.View entering={FadeInDown.duration(600)} style={{flex:1}}>
            <LinearGradient 
                colors={['rgba(225,225,225, 0)', 'rgba(225,225,225, 0.5)', 'white', 'white']}
                style={styles.gradiant}
                start={{x:0.5, y:0}}
                end={{x:0.5, y:0.8}}
            />

            {/* Content-Container */}

            <View style={styles.containContainer}>
                <Animated.Text entering={FadeInDown.delay(400).springify()} style={styles.title}>
                    Pixels
                </Animated.Text>
                <Animated.Text entering={FadeInDown.delay(500).springify()} style={styles.punchLine}>
                    Every Picture Tells a Story
                </Animated.Text>
                <TouchableOpacity 
                onPress={()=>goToHome()}
                style={styles.BtnConatiner}>
                    <Animated.Text entering={FadeInDown.delay(600).springify()} style={styles.btnText}>
                        Start Explore
                    </Animated.Text>
                </TouchableOpacity>
            </View>

        </Animated.View>
      </View>

  )
}

export default Splash

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
    },
    bgImage: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    gradiant: {
        width: '100%',
        height: '65%',
        bottom: 0,
        position: 'absolute'
    },
    containContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap:10,
    },
    title: {
        fontSize:60,
        fontWeight: '700',
        color: '#000',
    },
    punchLine: {
        fontWeight: '500',
        letterSpacing:1,
        fontSize: 18,
        marginBottom: 10,
        color: '#000',

    },
    BtnConatiner: {
        backgroundColor: '#000',
        padding:15,
        paddingHorizontal:90,
        borderRadius: 16,
        marginBottom: 50,
        borderCurve: 'continuous',
    },
    btnText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '700',
        letterSpacing: 2,
    }
})