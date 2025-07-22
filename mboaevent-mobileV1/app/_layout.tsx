import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React from 'react';
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
        <AuthFlow />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

function AuthFlow() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Stack>
      <Stack.Screen name="home/index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  ) : (
    <Stack>
      <Stack.Screen name="auth/Onboarding/SplashScreen" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Onboarding/Onboarding02" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Onboarding/Onboarding03" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Onboarding/Onboarding04" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Onboarding/Onboarding5" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Login/Logins" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Login/Register1" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Login/Register2" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Login/Register3" options={{ headerShown: false }} />
      <Stack.Screen name="auth/Login/Register4" options={{ headerShown: false }} />
    </Stack>
  );
}
