import { icons } from "@/constants";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image, KeyboardTypeOptions } from "react-native";

function FormField({title, value, styles, handleChange, placeholder, keyBoardType}: {title: string, value: string,placeholder: string, 
     styles: string, handleChange: (e: any) => void, keyBoardType?: KeyboardTypeOptions}) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${styles}`}>
            <Text className="text-base text-gray-100">{title}</Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-red-200 rounded-2xl focus:border-secondary items-center flex-row">
               <TextInput className="flex-1 text-white font-psemibold " 
               value={value} 
               placeholder={placeholder} 
               placeholderTextColor='#7b7b8b'
               onChangeText={handleChange}
               keyboardType={keyBoardType}
               secureTextEntry={title === 'Password' && !showPassword}
               />

               {title === 'Password' && <TouchableOpacity className="w-1 absolute right-10" onPress={() => setShowPassword((prev) => !prev)}>
                   <Image source={showPassword ? icons.eye : icons.eyeHide} resizeMode="contain" className="w-7" />
                </TouchableOpacity>}
            </View>
        </View>
    )
}

export default FormField