import { icons, images } from "@/constants";
import { addToFavorite, deletePost } from "@/lib/appwrite";
import { useUser } from "@/lib/context/userContext";
import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { View , Text, Image, TouchableOpacity, Alert} from "react-native";


function VideoCard({item, handleDeletePost}: any) {
  const [openMenu, setOpenMenu] = useState(false);
    const {user: {currentUser}} = useUser()
    const {title, thumbnail, video, users} = item;
    const user = users
    
    const [play, setPlay] = useState(false);
   
    const handleMenuPress = () => {
       setOpenMenu(!openMenu)
    }

    const handleSavePress = () => {
          addToFavorite(user.$id, item.$id)
    }

    return (
       <View className="flex-col items-center px-4 mb-14">
         <View className="flex-row gap-3 items-start absolute z-10">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-md border border-secondary justify-center items-center p-0.5">
                    <Image source={{uri: user?.avatar}} className="w-full h-full rounded-lg" resizeMode="cover"/>
                </View>

                <View className="justify-center flex-1 ml-3 gap-y-1">
                     <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                     <Text className="text-xs text-gray-100 font-pregular">{user?.username ?? ''}</Text>
                </View>
            </View>

            <View className="pt-2" >
              <TouchableOpacity onPress={handleMenuPress}>
                <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
              </TouchableOpacity>
              {openMenu && (
                <View className="absolute top-10 right-3 p-2 z-auto bg-black-100 w-32 rounded">
                    <TouchableOpacity className="flex flex-row items-center p-2" activeOpacity={0.4} onPress={handleSavePress}>
                       <Image source={icons.bookmark} className="w-3 h-3 mr-2"/>
                       <Text className="text-white font-semibold">Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-row items-center p-2"  activeOpacity={0.4} onPress={handleDeletePost}>
                       <Image source={images.delete} className="w-3 h-3 mr-2"/>
                       <Text className="text-white  font-semibold">Delete</Text>
                    </TouchableOpacity>
                </View>
              )}
            </View>
         </View>

        {play ? (
            <Video source={{uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}} 
            className="w-full h-60 rounded-xl mt-14" resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(playbackStatus: any) => {
              if(playbackStatus.didJustFinish) {
                setPlay(false)
              }
            }}
            onError={(e) => console.log(e)}
            />    
        ) : <TouchableOpacity className="w-full h-60 rounded-xl mt-14 relative justify-center items-center" activeOpacity={0.7}
            onPress={() => setPlay(true)}>
              <Image source={{uri: thumbnail}} className="w-full h-full rounded-xl mt-3" resizeMode="cover"/>
              <Image source={icons.play} className="w-12 h-12 absolute"/>
            </TouchableOpacity>}
       </View>
    )
}

export default VideoCard;