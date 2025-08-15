import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from '../contexts/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'TitilliumWeb-Bold': require('../assets/component/font/TitilliumWeb-Bold.ttf'),
    'TitilliumWeb-Regular': require('../assets/component/font/TitilliumWeb-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <InitialLayout />
        {/* <StatusBar style="auto" /> */}
      </ThemeProvider>
    </AuthProvider>
  );
}

function InitialLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === null) {
      // Auth state is still loading
      return;
    }

    const inAuthGroup = segments[0] === 'auth';

    if (isAuthenticated && inAuthGroup) {
      // If the user is authenticated and somehow lands in the auth group,
      // redirect them to the main app screen.
      router.replace('/home/accueil');
    } else if (!isAuthenticated && !inAuthGroup) {
      // If the user is not authenticated and is not in the auth group,
      // redirect them to the login screen.
      router.replace('/auth/Onboarding/SplashScreen');
    }
  }, [isAuthenticated]);

  return (
      <Stack>
        {/* Let Expo Router handle the routes based on file structure */}
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
  );
}
