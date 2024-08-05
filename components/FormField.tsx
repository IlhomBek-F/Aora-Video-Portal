import { icons } from "@/constants";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

function FormField({title, value, styles, handleChange, placeholder}: {title: string, value: string,placeholder: string, 
     styles: string, handleChange: (e: any) => void}) {

        const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${styles}`}>
            <Text className="text-base text-gray-100">{title}</Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-red-200 rounded-2xl focus:border-secondary items-center">
               <TextInput className="flex-1 text-white font-psemibold" value={value} placeholderTextColor='#7b7b8b'
               onChangeText={handleChange}
               secureTextEntry={title === 'Password' && !showPassword}
               />

               {title === 'Password' && <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={!showPassword ? icons.eye : icons.eyeHide} />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default FormField