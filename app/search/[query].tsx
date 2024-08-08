import EmptyState from "@/components/EmptyState";
import SearchInput from "@/components/SearchInput";
import VideoCard from "@/components/VideoCard";
import useAppwrite from "@/hooks/useAppwrite";
import { searchPost } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View , Text, SafeAreaView, FlatList} from "react-native";

function Search() {
    const {query} = useLocalSearchParams();
    const {data, refetch} = useAppwrite(() => searchPost(query as string));
    const [refreshing, setRefresh] = useState(false);

    useEffect(() => {
         refetch().finally(() => setRefresh(false));
    }, [query, refreshing]);

    return (
        <SafeAreaView className="bg-primary text-white h-full">
         <FlatList data={data} 
         key={1}
         keyExtractor={(item: any) => item?.$id}
         renderItem={({item}) => <VideoCard item={item} key={item.$id}/>}
         ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
                <Text className="font-pmedium text-sm text-gray-100">Search results</Text>
                <Text className="text-2xl font-semibold text-white">{query}</Text>
                <View>
                <SearchInput initialValue={query}/>
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

export default Search