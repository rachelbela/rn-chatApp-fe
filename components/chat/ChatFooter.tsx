import AddSvg from "@/assets/icons/add.svg";
import UpSvg from "@/assets/icons/up.svg";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HapticsMedium } from "@/utils/Haptics";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import VoicePressable from "./VoicePressable";

export default function ChatFooter() {
    const { bottom } = useSafeAreaInsets()
    const colorScheme = useColorScheme()
    const [thinkFlag, setThinkFlag] = useState(false);
    const [webFlag, setWebFlag] = useState(false)
    const thinkAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(thinkFlag ? 1.1 : 1, { mass: 10 }) }]
    }))
    const webAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withSpring(webFlag ? 1.1 : 1, { mass: 10 }) }]
    }))

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
                <Animated.View style={[thinkAnimatedStyle]}>
                    <Pressable onPress={() => {
                        HapticsMedium();
                        setThinkFlag(!thinkFlag)
                    }}>
                        {!thinkFlag ? <MaterialCommunityIcons name="lightbulb-on-outline" size={24} color={colorScheme === "dark" ? "white" : "black"} /> : <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
                            <MaterialCommunityIcons name="lightbulb-on" size={24} color="#18a9ed" />
                            <Text style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: colorScheme === "dark" ? "white" : "dark"
                            }}>深度思考</Text>
                        </View>}
                    </Pressable>
                </Animated.View>
                <Animated.View style={[webAnimatedStyle]}>
                    <Pressable onPress={() => {
                        HapticsMedium();
                        setWebFlag(!webFlag)
                    }}>
                        {!webFlag ? <MaterialCommunityIcons name="web" size={24} color={colorScheme === "dark" ? "white" : "black"} /> : <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
                            <MaterialCommunityIcons name="web" size={24} color="#18a9ed" />
                            <Text style={{
                                fontSize: 12,
                                fontWeight: "bold",
                                color: colorScheme === "dark" ? "white" : "dark"
                            }}>联网搜索</Text>
                        </View>}
                    </Pressable>
                </Animated.View>
                <VoicePressable />
            </View>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
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
        gap: 16,
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