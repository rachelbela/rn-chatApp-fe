import AddSvg from "@/assets/icons/add.svg";
import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticsSoft } from "@/utils/Haptics";
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from 'react';
import { Modal, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";

interface Props {
    showModal: boolean;
    setShowModal: any;
}
export default function PlusModalPressable({ showModal, setShowModal }: Props) {
    const colorScheme = useColorScheme()
    const { bottom } = useSafeAreaInsets()

    return (
        <>
            <Pressable onPress={() => {
                HapticsSoft();
                setShowModal(true);
            }}>
                <AddSvg style={{ width: 24, height: 24 }} color={colorScheme === "dark" ? "white" : "black"} />
            </Pressable>
            <Modal
                visible={showModal}
                animationType="fade"
                transparent={true}
            >
                <BlurView style={{ flex: 1 }}>
                    <Pressable style={{ flex: 1 }} onPress={() => { setShowModal(false) }}>
                        <ScrollView contentContainerStyle={{
                            position: "absolute",
                            bottom: bottom,
                            width: "100%",
                            height: 200,
                            paddingLeft: bottom,
                            gap: 16
                        }}>
                            <Pressable style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                                <AntDesign name="camera" size={32} color={colorScheme === "dark" ? "white" : "black"} />
                                <ThemedText type="defaultSemiBold">相机</ThemedText>
                            </Pressable>
                            <Pressable style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                                <FontAwesome name="picture-o" size={32} color={colorScheme === "dark" ? "white" : "black"} />
                                <ThemedText type="defaultSemiBold">图片</ThemedText>
                            </Pressable>
                            <Pressable style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                                <MaterialCommunityIcons name="movie-play" size={32} color={colorScheme === "dark" ? "white" : "black"} />
                                <ThemedText type="defaultSemiBold">视频</ThemedText>
                            </Pressable>
                            <Pressable style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
                                <Ionicons name="document" size={32} color={colorScheme === "dark" ? "white" : "black"} />
                                <ThemedText type="defaultSemiBold">文档</ThemedText>
                            </Pressable>
                        </ScrollView>
                    </Pressable>
                </BlurView>
            </Modal>

        </>
    )
}