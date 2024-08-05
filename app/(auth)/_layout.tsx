import { Stack } from "expo-router";
import React from "react";
import { StatusBar, Text, View } from "react-native";

function AuthLayout() {
    return (
       <>
         <Stack>
            <Stack.Screen name="sign-in" options={{headerShown: false}}></Stack.Screen>
            <Stack.Screen name="sign-up" options={{headerShown: false}}></Stack.Screen>
         </Stack>

         <StatusBar backgroundColor={'#161622'} barStyle='dark-content'></StatusBar>
       </>
    )
}

export default AuthLayout