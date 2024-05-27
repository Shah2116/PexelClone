import {ActivityIndicator, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState,useRef, useEffect, useCallback } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Header from '../components/Header';
import Search from '../assets/images/search.png'
import Cross from '../assets/images/cross.png'
import Categories from '../components/Categories';
import { apiCall } from '../utils/API';
import ImageGrid from '../components/ImageGrid';
import { ScrollView } from 'react-native-gesture-handler';
import {debounce}  from 'lodash'
import FilterModal from '../components/FilterModal';
import Animated from 'react-native-reanimated';
import { useNavigation, useRoute } from '@react-navigation/native';


let page;
const Home = () => {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [images, setImages] = useState([])
  const [filters, setFilters] = useState(null)
  const [isReachedEnd, setIsReachedEnd] = useState(null)

  const { top } = useSafeAreaInsets();
  const searchInputRef = useRef(null);
  const bottomSheetModalRef = useRef(null);
  const scrollRef = useRef(null);
  const navigation = useNavigation()

  const paddingTop = top > 0 ? top + 10 : 30;

  useEffect(()=> {
    fetchImages()
  },[])

  const applyFilter=() =>{
    if(filters){
       page =1
       setImages([])
      let params ={
        page,
        ...filters
      }
      if(activeCategory){
        params.category = activeCategory
      }
      if(search){
        params.q = search
      }
    fetchImages(params,false)
    }
      closeFilterModal()
  }

  const resetFilter = () => {
    if (filters) {
      page = 1
      setFilters(null)
      setImages([])
      let params = {
        page,
      }
      if (activeCategory) {
        params.category = activeCategory
      }
      if (search) {
        params.q = search
      }
      fetchImages(params, false)
    }
    
    closeFilterModal()
  }

      
  const fetchImages = async (params = { page: 1 }, append = true) => {
    console.log("params :", params, append)
    const response = await apiCall(params)
    if (response.success && response?.data?.hits) {
      if (append) {
        // console.log("response:", response.data?.hits)
        setImages([...images, response.data?.hits])
      }
      setImages([...response.data?.hits])
    }
    
  }

  const handleChangeCategory= (cat)=>{
        setActiveCategory(cat)
        searchInputRef?.current.clear()
        clearSearch();
        setImages([]);
        page=1;
        let params ={page,...filters}
        if(cat)
          params.category	= cat;
        fetchImages(params, false)
  }

  const handleSearch =(text)=>{
    setSearch(text)
     if(text.length >2){
      //  search for this text
        page=1
        setImages([]);
        setActiveCategory(null)  //clear category when search
        fetchImages({page, ...filters, q: text},false)
     }
     if(text == ""){
        // reset results
      setImages([]);
      fetchImages({page:1},false)
      setActiveCategory(null) //clear category when search
      searchInputRef?.current.clear()
     }
  }

  const clearSearch =()=> {
    setSearch("")
  }

  const openFilterModal=()=>{
    bottomSheetModalRef?.current?.present()
  }
  const closeFilterModal=()=>{
    bottomSheetModalRef?.current?.close()
  }

  const closeApplyFilters=(filterName)=>{
    let filterz = {...filters}
    delete filterz[filterName]
    setFilters({...filterz})
    page=1
    setImages([])
    let params={
      page,
      ...filterz,
    }
    if(activeCategory) params.category = activeCategory
    if(search) params.q = search
    fetchImages(params,false)

  }

  const handleTextDebounce = useCallback(debounce(handleSearch,500),[])

  const handleScroll =(event)=>{
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight-scrollViewHeight;

    if (scrollOffset >= bottomPosition - 1) {
      if (!isReachedEnd) {
        setIsReachedEnd(true);
        console.log("last page:",page)
        let page =1;
        ++page;
        console.log("last page:",page)
        let params = {
          page,
          ...filters
        }
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params, true)
        console.log("reached end")
      } else if (isReachedEnd) {
        setIsReachedEnd(false);
      }
    }
  }

  const handleScrollUp=()=>{
    scrollRef?.current?.scrollTo({
      y:0,
      Animated: true,
    })
  }

  console.log("filters:",filters)

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Header openFilterModal={openFilterModal} handleScrollUp={handleScrollUp} />
      {/* Search Bar */}
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={5}  // how often scroll will fire while scrolling
        ref={scrollRef}
        contentContainerStyle={{ gap: 15 }}
      >
        <View style={styles.searchBox}>
          <Image source={Search} style={styles.searchIcon} />

          <TextInput
            placeholder='Search for photos..'
            onChangeText={handleTextDebounce}
            ref={searchInputRef}
            style={styles.searchInput}
          />
          {
            search && (
              <Pressable onPress={() => handleSearch("")}>
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
        {/* applied filter  */}
        <View>
          {
            filters && (
              <ScrollView contentContainerStyle={styles.filter} horizontal showsHorizontalScrollIndicator={false}>
                {
                  Object.keys(filters).map((key, index) => {
                    return (
                      <View key={key} style={styles.filterWrap}>
                        {
                          key === "colors" ? (
                            <View style={{
                              height: 20,
                              width: 30,
                              borderRadius: 4,
                              backgroundColor: filters[key],
                              marginHorizontal: 6
                            }} />
                          ) : (
                            <Text style={styles.filterItem}>{filters[key]}</Text>
                          )
                        }
                        <Pressable
                          onPress={() => closeApplyFilters(key)}
                          style={styles.filterIconContainer}>
                          <Image source={Cross} style={[styles.filterIcon]} />
                        </Pressable>
                      </View>
                    )
                  })
                }
              </ScrollView>
            )
          }
        </View>

        {/* Image Grid */}
        {
          images.length > 0 && <ImageGrid images={images} navigation={navigation} />
        }

        {/* loader */}
    
        <View style={{ marginBottom:70, marginTop: images.length > 0 ? 10 : 70,}}>
          <ActivityIndicator size='large' color={'black'} />
        </View>
      </ScrollView>
      {/* Filter modal */}
      <FilterModal
        bottomSheetModalRef={bottomSheetModalRef}
        onApply={applyFilter}
        onReset={resetFilter}
        onClose={closeFilterModal}
        filters={filters}
        setFilters={setFilters}
      />
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
    },
    imageLayout: {
      flex:1,
    },
    filter: {
      paddingLeft: 16,
      paddingBottom: 12,
      gap:10,
        },
    filterWrap: {
      flexDirection: 'row',
      backgroundColor: '#d3f2e3',
      padding:6,
      borderRadius:10,
      borderCurve: 'continuous',
      justifyContent:'center',
      alignItems:'center',
    },
    filterItem: {
      paddingHorizontal:4
    },
    filterIconContainer:{
      flex:1,
      padding:2,
      backgroundColor:'#7cd8aa',
      borderRadius: 4
    },
    filterIcon : {
      height:16,
      width:16,
    }
})