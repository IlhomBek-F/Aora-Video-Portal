import { Link} from "expo-router"
import React from "react"
import { Text, View } from "react-native"

const RootLayout = () => {
    return (
        <View className="justify-center items-center flex-1">
          <Text className="text-black font-pblack">Auro</Text>
          <Link href={'/home'} style={{color: 'blue'}}>Home</Link>
        </View>
    )
}

export default RootLayout