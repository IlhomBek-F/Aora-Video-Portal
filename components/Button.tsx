import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Button({title, handlePress, containerStyle, loading}: {title: string, containerStyle: string, handlePress: () => void; loading?: boolean}) {

    return (
            <TouchableOpacity className={`bg-secondary-100 rounded-xl min-h-[62px] justify-center items-center ${containerStyle}`}
             onPress={handlePress}
             loading={loading}
            >
            <Text className="text-primary font-psemibold text-lg">{title}</Text>
            </TouchableOpacity>
    );
}

export default Button;