import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View , Text} from "react-native";

function Search() {
    const params = useLocalSearchParams();

    return (
        <View>
            <Text>Search</Text>
        </View>
    )
}

export default Search