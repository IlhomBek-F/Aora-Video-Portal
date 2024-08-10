import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, TextInput, TouchableOpacity, View } from "react-native";

function SearchInput({initialValue, placeholder = 'Search for a video topic'}) {
   const pathName = usePathname();
   const [query, setQuery] = useState(initialValue ?? '');

    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row
        space-x-4 
        ">
            <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular" 
            placeholder={placeholder}
            placeholderTextColor='#CDCDE0'
            value={query}
            onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity onPress={() => {
                if(!query) {
                    Alert.alert('Missing query', 'Please input something to search results across database');
                    return;
                }

                if(pathName.startsWith('/search')) {
                    router.setParams({query})
                }else {
                    router.push(`/search/${query}`)
                }
            }}>
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput;