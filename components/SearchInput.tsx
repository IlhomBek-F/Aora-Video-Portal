import { icons } from "@/constants";
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";



function SearchInput({onChange}) {


    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row
        space-x-4 
        ">
            <TextInput className="text-base mt-0.5 text-white flex-1 font-pregular" 
            placeholder="Search for a video topic"
            placeholderTextColor='#7b7b8b'
            onChangeText={onChange}
            />

            <TouchableOpacity >
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput;