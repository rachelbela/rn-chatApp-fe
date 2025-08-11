import { DarkTheme, DefaultTheme, ThemeProvider, } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

export default function Layout() {
    const colorScheme = useColorScheme();
    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name='(main)'></Stack.Screen>
            </Stack>
        </ThemeProvider>
    )
}