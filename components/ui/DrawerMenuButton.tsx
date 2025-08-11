import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, useColorScheme } from 'react-native';

interface Props {
    onPress: () => void;
}
export default function DrawerMenuButton({ onPress }: Props) {
    const colorScheme = useColorScheme();
    return (
        <Pressable hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }} onPress={onPress}>
            <Ionicons name="menu-outline" size={24} color={colorScheme === "dark" ? "white" : 'black'} />
        </Pressable>
    )
}