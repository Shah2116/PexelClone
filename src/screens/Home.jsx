import {Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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

let page;
const Home = () => {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [images, setImages] = useState([])
  const [filters, setFilters] = useState(null)

  const { top } = useSafeAreaInsets();
  const searchInputRef = useRef(null);
  const bottomSheetModalRef = useRef(null);

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

  const handleTextDebounce = useCallback(debounce(handleSearch,500),[])


  console.log("filters:",filters)

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Header openFilterModal={openFilterModal} />
      {/* Search Bar */}
      <ScrollView>
      <View style={styles.searchBox}>
        <Image source={Search} style={styles.searchIcon} />
       
        <TextInput
          placeholder='Search for photos..'
          onChangeText={handleTextDebounce}
          ref={searchInputRef}
          style={styles.searchInput}
        />
         {
          search &&  (
            <Pressable onPress={() =>handleSearch("")}>
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

      {/* Image Grid */}
      {
        images.length>0 && <ImageGrid images={images}/>
      }
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
    }
})