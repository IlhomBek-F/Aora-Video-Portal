import { Link} from "expo-router"
import React from "react"
import { Text, View } from "react-native"

const RootLayout = () => {
    return (
        <View className="justify-center items-center flex-1">
          <Text className="text-white">Auro</Text>
          <Link href={'/profile'} style={{color: 'blue'}}>Profile</Link>
        </View>
    )
}

export default RootLayout