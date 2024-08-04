import { icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";

const TabIcon = ({icon, color, name, focused}: {icon: string, color: string, name: string, focused: boolean}) => {
    return (
        <View>
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6"/>
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>{name}</Text>
        </View>
    )
}

function TabsLayout() {
    
    const tabBarIcon = ({color, focused}: {color: string, focused: boolean}) => {
      return <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
    }

    return (
        <>
        <Tabs screenOptions={{tabBarShowLabel: false}}>
            <Tabs.Screen name="home" options={{title: 'Home', headerShown: false, tabBarIcon}}></Tabs.Screen>
            <Tabs.Screen name="create" options={{title: 'Create', headerShown: false, tabBarIcon}}></Tabs.Screen>
        </Tabs>
        </>
    )
}

export default TabsLayout