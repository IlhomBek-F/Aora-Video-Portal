import EmptyState from "@/components/EmptyState";
import InfoBox from "@/components/InfoBox";
import VideoCard from "@/components/VideoCard";
import { icons } from "@/constants";
import useAppwrite from "@/hooks/useAppwrite";
import { getPostsByUserId, logOut } from "@/lib/appwrite";
import { useUser } from "@/lib/context/userContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, FlatList, View, TouchableOpacity , Image} from "react-native";

function Profile() {
  const {user: {currentUser}, setUser} = useUser();
  const {data} = useAppwrite(() => getPostsByUserId(currentUser.$id));
  const [refreshing, setRefresh] = useState(false);
  
  const handleLogout = () => {
     logOut().then(() => {
      setUser({isLoggedIn: false, currentUser: {}, loading: false})
      router.replace('/sign-in')
     })
  }

  return (
      <SafeAreaView className="bg-primary text-white h-full">
       <FlatList data={data} 
       key={1}
       keyExtractor={(item: any) => item?.$id}
       renderItem={({item}) => <VideoCard item={item} key={item?.$id}/>}
       ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
               <TouchableOpacity className="w-full items-end mb-10" onPress={handleLogout}>
                <Image source={icons.logout} resizeMode="contain" className="w-6 h-6"/>
               </TouchableOpacity>

               <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
                  <Image source={{uri: currentUser?.avatar}} className="w-[90%] h-[90%] rounded-lg" resizeMode="cover"/>
               </View>


               <View className="mt-5 flex-row">

               <InfoBox title={data?.length || 0} 
                        containerStyle="mr-10" 
                        subtitle="Posts"
                        titleStyles="text-xl"
                        />
               <InfoBox title='1.2k' 
                        subtitle="Followers"
                        titleStyles="text-xl"
                        />
               </View>
          </View>
       )}
       ListEmptyComponent={<EmptyState title='No videos found' subtitle='No videos found for this search query'/>}
       refreshing={refreshing}
       onRefresh={() => setRefresh(true)}
       />
    </SafeAreaView>
  )
}

export default Profile