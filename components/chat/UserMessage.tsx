import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface Props {
    content: string;
}
export default function UserMessage({ content }: Props) {
    const colorScheme = useColorScheme()
    return (
        <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#0f0f0f" : "#f5f5f5" }]}>
            <ThemedText type="defaultSemiBold">{content}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        paddingVertical: 10,
        paddingHorizontal: 8,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    item: {
        color: "black", fontSize: 18, fontWeight: 'semibold'
    }
})