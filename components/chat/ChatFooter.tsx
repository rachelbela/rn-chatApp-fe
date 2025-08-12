import AddSvg from "@/assets/icons/add.svg";
import UpSvg from "@/assets/icons/up.svg";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VoicePressable from "./VoicePressable";

export default function ChatFooter() {
    const { bottom } = useSafeAreaInsets()
    const colorScheme = useColorScheme()

    return (
        <BlurView style={[styles.container, { paddingBottom: bottom, }]}>
            <View style={styles.firstRow}>
                <AddSvg style={{ width: 24, height: 24 }} color={colorScheme === "dark" ? "white" : "black"} />
                <TextInput
                    placeholderTextColor={"gray"}
                    placeholder='send'
                    multiline
                    autoCorrect={false}
                    autoCapitalize="none"
                    style={[styles.input, {
                        color: colorScheme === "dark" ? "white" : "black"
                    }]}
                />
                <UpSvg style={{ width: 24, height: 24 }} color={colorScheme === "dark" ? "white" : "black"} />
            </View>
            <View style={styles.secondRow}>
                <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color={colorScheme === "dark" ? "white" : "black"} />
                <MaterialCommunityIcons name="web" size={20} color={colorScheme === "dark" ? "white" : "black"} />
                <VoicePressable />
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingHorizontal: 8,
        paddingTop: 8,
        flexDirection: "column",
        gap: 8
    },
    firstRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    secondRow: {
        flexDirection: "row",
        gap: 8,
        marginLeft: 32
    },
    input: {
        flex: 1,
        borderColor: "#ebebeb",
        borderWidth: 1,
        borderStyle: "solid",
        maxHeight: 100,
        minHeight: 40,
        paddingHorizontal: 8,
        borderRadius: 10,
        fontSize: 13,
        fontWeight: "bold"
    }
})