import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useColorScheme } from '@/hooks/useColorScheme'
import { FontAwesome5, FontAwesome6, MaterialCommunityIcons, Octicons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import React from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Vip() {
    const HeaderHeight = useHeaderHeight()
    const { bottom } = useSafeAreaInsets()
    const colorSchema = useColorScheme()
    return (
        <ThemedView style={{
            flex: 1
        }}>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: HeaderHeight,
                    gap: 32,
                }}
            >
                <ThemedView style={{ gap: 8, justifyContent: "center", alignItems: "center", paddingTop: 40 }}>
                    <Octicons name="north-star" size={24} color={colorSchema === "dark" ? "white" : "black"} />
                    <ThemedText type="defaultSemiBold" >获取 Seas Pro与 AI</ThemedText>
                    <Text style={{ color: "#5e5e5e" }}>解锁强大的每日AI助手</Text>
                </ThemedView>
                <ThemedView style={{ gap: 20, flexDirection: "column", paddingLeft: 16 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <FontAwesome6 name="bolt-lightning" size={24} color="#62BAF1" />
                        <View style={{ gap: 8 }}>
                            <Text style={{
                                color: "#62BAF1", fontSize: 15, fontWeight: "bold"
                            }}>高级功能</Text>
                            <Text style={{ color: "#5e5e5e", fontSize: 12 }}>访问最新的Seas和更好的服务</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <FontAwesome5 name="hand-holding-heart" size={18} color="#B7271E" />
                        <View style={{ gap: 8 }}>
                            <Text style={{ color: "#B7271E", fontSize: 15, fontWeight: "bold" }}>优先访问</Text>
                            <Text style={{ color: "#5e5e5e", fontSize: 12 }}>Seas任何功能随时访向为您服劳</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <FontAwesome6 name="wand-magic-sparkles" size={18} color="#B56936" />
                        <View style={{ gap: 8 }}>
                            <Text style={{ color: "#B56936", fontSize: 15, fontWeight: "bold" }}>快速可靠</Text>
                            <Text style={{ color: "#5e5e5e", fontSize: 12 }}>快速而可靠的技术随时等候为怎服多</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <MaterialCommunityIcons name="star-four-points" size={18} color="#4F81EE" />
                        <View style={{ gap: 8 }}>
                            <Text style={{ color: "#4F81EE", fontSize: 15, fontWeight: "bold" }}>建立优质</Text>
                            <Text style={{ color: "#5e5e5e", fontSize: 12 }}>在各种任务范国内表现出色因您而在</Text>
                        </View>
                    </View>
                </ThemedView>
                <ThemedView style={{ flexDirection: "row", gap: 8, paddingHorizontal: 16 }}>
                    <View style={{ flex: 1, gap: 4, padding: 8, borderRadius: 12, backgroundColor: colorSchema === "dark" ? "#1B1B1E" : "#EFEFEF", }}>
                        <FontAwesome6 name="wand-magic-sparkles" size={18} color="#5080E6" />
                        <ThemedText>年会员</ThemedText>
                        <ThemedText>300每年</ThemedText>
                        <Text style={{ color: "#5e5e5e", fontSize: 14 }}>大多数用户选择每年订阅</Text>

                    </View>
                    <View style={{ flex: 1, padding: 8, borderRadius: 12, backgroundColor: colorSchema === "dark" ? "#1B1B1E" : "#EFEFEF", gap: 8, borderWidth: 1, borderColor: "#3F4559", borderStyle: "solid" }}>
                        <FontAwesome6 name="bolt-lightning" size={18} color={colorSchema === "dark" ? "white" : "black"} />
                        <ThemedText>月会员</ThemedText>
                        <ThemedText>30每月</ThemedText>
                        <Text style={{ color: "#5e5e5e", fontSize: 14 }}>适合有专业需求的个人</Text>
                    </View>
                </ThemedView>
            </ScrollView>
            <Pressable
                onPress={() => {
                    console.log("click")
                }}
                style={{
                    position: "absolute",
                    bottom: 0,
                    backgroundColor: "#357AF7",
                    width: "90%",
                    height: 46,
                    marginBottom: bottom,
                    alignSelf: "center",
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Text style={{ color: "white", fontSize: 18 }}>加入Saaas</Text>
            </Pressable>
        </ThemedView>
    )
}