import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { BlurView } from "@react-native-community/blur";
import {
    BottomSheetModal,
    BottomSheetView,
  } from '@gorhom/bottom-sheet';
import Animated, { Extrapolation, FadeInDown, interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import SectionView, { ColorFilterRow, CommonFilterRow } from './FilterView';
import { capitazile} from '../utils/helper/common';
import { data } from '../assets/data/categoriesItem';

const FilterModal = ({bottomSheetModalRef,filters,setFilters,onClose,onApply,onReset}) => {

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
              <View style={styles.content}>
                <Text style={styles.filterText}>Filters</Text>
                {
                  Object.keys(sections).map((sectionName, index) => {
                    let sectionView = sections[sectionName];
                    let title = capitazile(sectionName)
                    let sectionData = data.filter[sectionName]
                    return (
                      <Animated.View 
                      entering={FadeInDown.delay((index*100)+100).springify().damping(11)}
                      key={sectionName}>
                      <SectionView
                      title={title} 
                      content={sectionView({
                        data:sectionData,
                        filters,
                        setFilters,
                        filterName: sectionName
                      })}
                      />
                      </Animated.View>
                    )
                  })
                }
                {/* Filter action button */}
                <Animated.View 
                 entering={FadeInDown.delay((500)).springify().damping(11)}
                style={styles.buttonContainer}>
                  <Pressable style={[styles.button,{backgroundColor:'White',borderWidth:2}]}
                  onPress={onReset}>
                      <Text style={[styles.resetBtn,]}>Reset</Text>
                  </Pressable>
                  <Pressable style={[styles.button]}
                  onPress={onApply}>
                      <Text style={[styles.resetBtn,{color:'white'}]}>Apply</Text>
                  </Pressable>
                </Animated.View>
              </View>
          </BottomSheetView>
      </BottomSheetModal>
  )
}

const sections = {
  "order": (props) => <CommonFilterRow {...props} />, 
  "orientation": (props) => <CommonFilterRow {...props} />,
  "type": (props) => <CommonFilterRow {...props}/>,
  "colors": (props) => <ColorFilterRow {...props}/>,
}

const customBackdrop=({animatedIndex, style})=>{

    // for filterModal smoth drop down
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
      },
      content:{
        flex:1,
        width: '100%',
        padding: 20,
      },
      filterText:{
        fontSize: 50,
      },
      buttonContainer:{
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        gap:10,
      },
      button:{
        flex:1,
        padding:10,
        justifyContent:'center',
        alignItems:"center",
        borderRadius:10,
        borderCurve:'continuous',
        backgroundColor:'brown'
      },
      resetBtn: {
        fontSize: 18,
        fontWeight:'500',
      },
})