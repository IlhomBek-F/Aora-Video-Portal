import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Button({title, handlePress, containerStyle}: {title: string, containerStyle: string, handlePress: () => void;}) {

    return (
            <TouchableOpacity className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyle}`}
             onPress={handlePress}
            >
            <Text className="text-primary font-psemibold text-lg">{title}</Text>
            </TouchableOpacity>
    );
}

export default Button;