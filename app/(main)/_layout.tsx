import { Stack } from 'expo-router'
import React from 'react'

export default function Layout() {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="(drawer)"></Stack.Screen>
            <Stack.Screen name="vip" options={{
                presentation: "modal"
            }}></Stack.Screen>

        </Stack>
    )
}