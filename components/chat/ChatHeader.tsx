import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ChatHeader() {
    const themeColor = useColorScheme();
    return (
        <View style={[styles.container, { backgroundColor: themeColor === "dark" ? "#0f0f0f" : "#f5f5f5" }]}>
            <Pressable
                onPress={() => {
                    router.push("/vip")
                }}>
                <View style={styles.button}>
                    <Text style={styles.text}>获取vip</Text>
                    <FontAwesome name="star" size={16} color="#5954A5" />
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#5954A5"
    }
})