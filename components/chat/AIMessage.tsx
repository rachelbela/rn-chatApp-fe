import { useColorScheme } from '@/hooks/useColorScheme';
import { ChatMessage } from '@/types/chat';
import { HapticsSoft } from '@/utils/Haptics';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { ThemedText } from '../ThemedText';

interface Props {
    item: ChatMessage;
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
            {
                item.tool === "get_stock_price" && <View style={[styles.stockContainer, colorScheme === "dark" && {
                    shadowColor: "white",
                    shadowOffset: {
                        width: 0,
                        height: 4
                    },
                    shadowRadius: 8,
                    shadowOpacity: 0.26,
                    elevation: 5,
                }]}>
                    <Text style={{ color: "white", fontSize: RFValue(13) }}>小米集团-W</Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ color: "gray", fontSize: RFValue(12) }}>交易中</Text>
                        <Text style={{ color: "gray", fontSize: RFValue(12) }}>{new Date().toLocaleString()}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ flex: 1, color: "red" }}>57.650</Text>
                        <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
                            <Text style={{ color: "gray", fontSize: RFValue(12) }}>最高</Text>
                            <Text style={{ color: "red", fontSize: RFValue(12) }}>57.950</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 3 }}>
                            <Text style={{ color: "gray", fontSize: RFValue(12) }}>今开</Text>
                            <Text style={{ color: "red", fontSize: RFValue(12) }}>57.950</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, flexDirection: "row", gap: 2 }}>
                            <Text style={{ color: "red", fontSize: RFValue(12) }}>+1.850</Text>
                            <Text style={{ color: "red", fontSize: RFValue(12) }}>+3.32%</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", gap: 3 }}>
                            <Text style={{ color: "gray", fontSize: RFValue(12) }}>最高</Text>
                            <Text style={{ color: "green", fontSize: RFValue(12) }}>56.150</Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 3 }}>
                            <Text style={{ color: "gray", fontSize: RFValue(12) }}>昨开</Text>
                            <Text style={{ color: "green", fontSize: RFValue(12) }}>56.150</Text>
                        </View>
                    </View>
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
        gap: 8,
    },
    stockContainer: {
        backgroundColor: "black",
        borderRadius: 12,
        flexDirection: "column",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,

        marginBottom: 8
    }
})