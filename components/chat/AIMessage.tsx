import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface Props {
    content: string;
}
export default function AIMessage({ content }: Props) {
    const colorScheme = useColorScheme()
    return (
        <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#0f0f0f" : "#ebebeb" }]}>
            <ThemedText type="defaultSemiBold">{content}</ThemedText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
})