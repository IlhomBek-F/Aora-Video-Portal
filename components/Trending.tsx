import { icons } from "@/constants";
import React, { useState } from "react"
import { FlatList , ImageBackground, Text, TouchableOpacity, Image, View} from "react-native"
import * as Animatable from 'react-native-animatable';
import {Video, ResizeMode} from 'expo-av';

const zoomIn = {
  from: {
    scale: 0.9
  },
  to: {
    scale: 1
  }
}

const zoomOut = {
  from: {
    scale: 1
  },
  to: {
    scale: 0.9
  }
}

const TrendingItem = ({activeItem, item}: any) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View className="mr-5" animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}>
      {play ? (
           <Video source={{uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}} className="w-52 h-72 rounded-[35px] mt-3" resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(playbackStatus: any) => {
            if(playbackStatus.didJustFinish) {
              setPlay(false)
            }
          }}
          onError={(e) => console.log(e)}
          />    
      ) : (
        <TouchableOpacity className="relative justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
           <ImageBackground source={{uri: item.thumbnail}} className="w-52 h-72 rounded-[20px] overflow-hidden shadow-lg shadow-black/40" resizeMode="cover"/>
           <Image source={icons.play} className="absolute w-12 h-12" resizeMode="contain"/>
        </TouchableOpacity>
      )}
    </Animatable.View>
  )
}

function Trending({posts}: any) {
   const [activeItem, setActiveItem] = useState(posts[1]);

   const viewItemChanged = ({viewableItems}) => {
      setActiveItem(viewableItems[0]?.key)
   } 

    return (
         <FlatList data={posts} keyExtractor={(item) => item.$id}
         key={1}
         horizontal 
         onViewableItemsChanged={viewItemChanged}
         viewabilityConfig={{itemVisiblePercentThreshold: 70}}
         contentOffset={{x: 170, y: 0}}
          renderItem={({item}) => {
            return <TrendingItem activeItem={activeItem} item={item} key={item.$id}/>
          }}
         />
    )
}

export default Trending