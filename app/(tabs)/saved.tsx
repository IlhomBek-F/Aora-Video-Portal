import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import React from "react";
import { SafeAreaView, Text, View, FlatList } from "react-native";

function BookMark() {

    return (
       <SafeAreaView className="bg-primary h-full">
         <FlatList data={[]}
             keyExtractor={({item}) => item.$id}
             renderItem={({item}) => <VideoCard item={item}/>}
             ListHeaderComponent={
                <View className="px-4">
                   <Text className="text-white text-2xl font-semibold mb-5">Saved Videos</Text>
                   <SearchInput initialValue='' placeholder="Search your saved videos" />
                </View>
             }
             ListEmptyComponent={<EmptyState title='No saved videos found' />}
         />
       </SafeAreaView>
    )
}

export default BookMark