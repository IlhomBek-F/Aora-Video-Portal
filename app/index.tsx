import Button from "@/components/Button"
import { images } from "@/constants"
import { router} from "expo-router"
import React from "react"
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native"

const RootLayout = () => {
    return (
      <SafeAreaView className="bg-primary">
          <ScrollView contentContainerStyle={{height: '100%'}}>
              <View className="w-full min-h-[85vh] px-4 justify-center items-center">
                    <Image source={images.logo} className="w-[130px] h-[84px]" resizeMode="contain"/>
                    <Image source={images.cards} className="max-w--[380px] w-full h-[300px]" resizeMode="contain"/>

                    <View className="relative mt-5">
                         <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities  
                           <Text className="text-secondary-200"> Aora</Text>
                         </Text>

                         <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-8" resizeMode="contain"/>
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>
                    <Button title="Continue with Email" handlePress={() => router.push('/sign-in')} containerStyle='w-full mt-7'/>
              </View>
          </ScrollView>
      </SafeAreaView>
    )
}

export default RootLayout