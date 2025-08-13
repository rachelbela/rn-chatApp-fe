import { useColorScheme } from '@/hooks/useColorScheme';
import { ChatMessageItem } from '@/types/chat';
import { HapticsSoft } from '@/utils/Haptics';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '../ThemedText';

interface Props {
    item: ChatMessageItem;
}
export default function AIMessage({ item }: Props) {
    const colorScheme = useColorScheme()
    const [show, setShow] = useState(true);
    return (
        <View style={[styles.container, { backgroundColor: colorScheme === "dark" ? "#0f0f0f" : "#ebebeb" }]}>
            {
                item.think && <View>
                    <Pressable style={{ flexDirection: "row", gap: 3, alignItems: "center" }} onPress={() => {
                        HapticsSoft();
                        setShow(!show)
                    }}>
                        <ThemedText type="defaultSemiBold">深度思考</ThemedText>
                        <Feather name="chevron-down" size={20} color={colorScheme === "dark" ? "white" : "dark"} transform={[{ rotate: show ? "0deg" : "180deg" }]} />
                    </Pressable>
                    {show && <Text style={{ color: "gray" }}>{item.think}</Text>}
                </View>

            }
            <ThemedText type="defaultSemiBold">{item.content}</ThemedText>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: 10,
        gap: 8
    },
})