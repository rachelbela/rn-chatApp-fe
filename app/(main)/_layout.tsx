import { useColorScheme } from '@/hooks/useColorScheme'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { router, Stack } from 'expo-router'
import React from 'react'
import { Pressable, StyleSheet } from 'react-native'

export default function Layout() {
    const colorSchema = useColorScheme()
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="(drawer)"></Stack.Screen>
            <Stack.Screen name="vip" options={{
                presentation: "modal",
                headerShown: true,
                headerTransparent: true,
                headerBackground: () => <BlurView style={StyleSheet.absoluteFill} />,
                headerRight: () => <Pressable onPress={() => router.back()}>
                    <Ionicons name="close-circle" size={24} color={colorSchema === "dark" ? "white" : "black"} />
                </Pressable>
            }}></Stack.Screen>
        </Stack>
    )
}