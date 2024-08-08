import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

import React from 'react';
import { UserProvider } from '@/lib/context/userContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [fontsLoaded, error] = useFonts({
     "Poppins-Black": require('../assets/fonts/Poppins-Black.ttf'),
     "Poppins-Bold": require('../assets/fonts/Poppins-Bold.ttf'),
     "Poppins-ExtraBold": require('../assets/fonts/Poppins-ExtraBold.ttf'),
     "Poppins-EtraLight": require('../assets/fonts/Poppins-ExtraLight.ttf'),
     "Poppins-Light": require('../assets/fonts/Poppins-Light.ttf'),
     "Poppins-Medium": require('../assets/fonts/Poppins-Medium.ttf'),
     "Poppins-Regular": require('../assets/fonts/Poppins-Regular.ttf'),
     "Poppins-Semibold": require('../assets/fonts/Poppins-SemiBold.ttf'),
  })

  useEffect(() => {
    if(error) throw error;

    if(fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, error])
  
  if(!fontsLoaded && !error) {
    return null;
  }

  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
