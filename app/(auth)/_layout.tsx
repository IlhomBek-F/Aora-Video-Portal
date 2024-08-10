import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

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