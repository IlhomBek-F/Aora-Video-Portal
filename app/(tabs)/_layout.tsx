import { icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import { View, Text, Image } from "react-native";

const TabIcon = ({icon, color, name, focused}: {icon: string, color: string, name: string, focused: boolean}) => {
    return (
        <View className="flex justify-center items-center ">
            <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6"/>
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color}}>{name}</Text>
        </View>
    )
}

function TabsLayout() {
    
    return (
        <>
        <Tabs screenOptions={{tabBarShowLabel: false, tabBarActiveTintColor: '#ffa001', tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
                backgroundColor: '#161622',
                borderTopWidth: 1,
                borderTopColor: '#232533',
                height: 84
            }
        }}>
            <Tabs.Screen name="home" options={{title: 'Home', headerShown: false, tabBarIcon: ({color, focused}) => {
                return <TabIcon color={color} icon={icons.home} focused={focused} name="Home" />
            }}}></Tabs.Screen>
            <Tabs.Screen name="bookMark" options={{title: 'BookMark', headerShown: false, tabBarIcon: ({color, focused}) => {
                return <TabIcon name="Book Mark" icon={icons.bookmark} focused={focused} color={color} />
            }}}></Tabs.Screen>
            <Tabs.Screen name="create" options={{title: 'Create', headerShown: false, tabBarIcon: ({color, focused}) => {
                return <TabIcon color={color} icon={icons.plus} focused={focused} name="Create" />
            }}}></Tabs.Screen>
            <Tabs.Screen name="profile" options={{title: 'Profile', headerShown: false, tabBarIcon: ({color, focused}) => {
                return <TabIcon name="Profile" icon={icons.profile} focused={focused} color={color} />
            }}}></Tabs.Screen>
        </Tabs>
        </>
    )
}

export default TabsLayout