import { images } from "@/constants";
import React from "react";
import {Text, Image, View} from "react-native";
import Button from "./Button";
import { router } from "expo-router";

function EmptyState({title, subtitle}) {

    return (
        <View className="justify-center items-center px-44">
            <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain"/>
            <Text className="font-psemibold text-[15px] text-center text-white w-80">{title}</Text>
            <Text className="font-medium text-center text-sm text-gray-100 w-48">{subtitle}</Text>

            <Button title="Create video" handlePress={() => router.push('/create')} containerStyle="w-48 m-5"/>
        </View>
    )
}

export default EmptyState;