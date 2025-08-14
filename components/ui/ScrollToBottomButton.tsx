import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Pressable } from 'react-native';
interface Props {
    showScrollToBottomButton: boolean;
    handleScrollToBottom: () => void;
}
export default function ScrollToBottomButton({ showScrollToBottomButton, handleScrollToBottom }: Props) {
    const colorSchema = useColorScheme()
    return showScrollToBottomButton ? <BlurView style={{ width: 32, height: 32, borderRadius: 16, alignSelf: "center", overflow: "hidden", justifyContent: "center", alignItems: "center" }}>
        <Pressable onPress={handleScrollToBottom}>
            <Ionicons name="arrow-down" size={20} color={colorSchema === "dark" ? "white" : "black"} />
        </Pressable>
    </BlurView> : null
}