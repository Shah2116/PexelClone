import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { BlurView } from "@react-native-community/blur";
import {
    BottomSheetModal,
    BottomSheetView,
  } from '@gorhom/bottom-sheet';
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

const FilterModal = ({bottomSheetModalRef}) => {

    const snapPoints = useMemo(() => ['75%'], []);

  return (
      <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={customBackdrop}
        //   onChange={handleSheetChanges}
      >
          <BottomSheetView style={styles.contentContainer}>
              <Text>Awesome 🎉</Text>
          </BottomSheetView>
      </BottomSheetModal>
  )
}


const customBackdrop=({animatedIndex, style})=>{


  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    )
    return {
      opacity
    }
  })

    containerStyle = [
      style,
      StyleSheet.absoluteFill,
      styles.overlay,
      containerAnimatedStyle
    ]

    return(
      <Animated.View style={containerStyle}>
        <BlurView
        style={styles.absoluteFill}
        blurType="dark"
        blurAmount={25}
        // reducedTransparencyFallbackColor="white"
      />
      </Animated.View>
    )

}



export default FilterModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
      overlay:{
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
})