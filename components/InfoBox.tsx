import React from "react"
import { View, Text } from "react-native"

function InfoBox({title, titleStyles, containerStyle, subtitle}) {

    return (
       <View className={containerStyle}>
        <Text className={`text-white text-center font-semibold ${titleStyles}`}>{title}</Text>
        <Text className='text-sm text-gray-100 text-center font-pregular'>{subtitle}</Text>
       </View>
    )
}

export default InfoBox