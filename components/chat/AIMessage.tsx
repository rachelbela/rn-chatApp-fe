import { useColorScheme } from '@/hooks/useColorScheme';
import { ChatMessage } from '@/types/chat';
import { HapticsSoft } from '@/utils/Haptics';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import CodeHighlighter from 'react-native-code-highlighter';
import Markdown from 'react-native-markdown-display';
import { RFValue } from "react-native-responsive-fontsize";
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ThemedText } from '../ThemedText';

interface Props {
    item: ChatMessage;
}
export default function AIMessage({ item }: Props) {
    const colorScheme = useColorScheme()
    const [show, setShow] = useState(true);
    const onLinkPress = (url: string) => {
        if (url) {
            HapticsSoft();
            console.log("onlinkPress")
            Alert.alert("提示", "是否打开链接？", [{ text: "取消", style: "cancel" }, {
                text: "确定", style: "default", onPress: async () => {
                    await WebBrowser.openBrowserAsync('https://expo.dev');
                }
            }])
            // some custom logic
            return false;
        }

        // return true to open with `Linking.openURL
        // return false to handle it yourself
        return true
    }
    const rules = {
        // @ts-ignore
        link: (node, children) => {
            return (
                <Text key={node.key} style={{ color: "#007bff" }} onPress={() => onLinkPress(node.attributes.href)}>
                    {children}
                </Text>
            );
        },
        // @ts-ignore
        table: (node, children, parent, styles) => (
            <View key={node.key} style={[styles._VIEW_SAFE_table, { borderColor: colorScheme === "dark" ? "white" : "black", borderRadius: 8 }]}>
                {children}
            </View>
        ),
        // @ts-ignore
        tr: (node, children, parent, styles) => (
            <View key={node.key} style={[styles._VIEW_SAFE_tr, { borderColor: colorScheme === "dark" ? "white" : "black" }]}>
                {children}
            </View>
        ),
        // @ts-ignore
        textgroup: (node, children, parent, styles) => (
            <ThemedText key={node.key} style={styles.textgroup}>
                {children}
            </ThemedText>
        ),
        // @ts-ignore
        blockquote: (node, children, parent, styles) => (
            <View key={node.key} style={[styles._VIEW_SAFE_blockquote, {
                backgroundColor: colorScheme === "dark" ? "#292C33" : "#FAFAFA",
                borderTopRightRadius: 8,
                borderBottomRightRadius: 8
            }]}>
                {children}
            </View>
        ),
        // Code
        // @ts-ignore
        code_inline: (node, children, parent, styles, inheritedStyles = {}) => (
            <ThemedText key={node.key} style={{ fontWeight: "bold" }}>
                {node.content}
            </ThemedText>
        ),
        // @ts-ignore
        code_block: (node, children, parent, styles, inheritedStyles = {}) => {
            // we trim new lines off the end of code blocks because the parser sends an extra one.
            let { content } = node;

            if (
                typeof node.content === 'string' &&
                node.content.charAt(node.content.length - 1) === '\n'
            ) {
                content = node.content.substring(0, node.content.length - 1);
            }

            return (
                <CodeHighlighter
                    hljsStyle={colorScheme === "dark" ? atomOneDark : atomOneLight}
                    containerStyle={{
                        width: "100%",

                    }}
                    customStyle={{
                        padding: 8,
                        borderRadius: 8,
                        backgroundColor: colorScheme === "dark" ? "#292C33" : "#FAFAFA"

                    }}
                    language={node.sourceInfo}
                >
                    {content}
                </CodeHighlighter>
            );
        },
        // @ts-ignore
        fence: (node, children, parent, styles, inheritedStyles = {}) => {
            // we trim new lines off the end of code blocks because the parser sends an extra one.
            let { content } = node;

            if (
                typeof node.content === 'string' &&
                node.content.charAt(node.content.length - 1) === '\n'
            ) {
                content = node.content.substring(0, node.content.length - 1);
            }
            console.log("node", node)
            return (
                <CodeHighlighter
                    hljsStyle={colorScheme === "dark" ? atomOneDark : atomOneLight}
                    containerStyle={{
                        width: "100%",

                    }}
                    customStyle={{
                        padding: 8,
                        borderRadius: 8,
                        backgroundColor: colorScheme === "dark" ? "#292C33" : "#FAFAFA"

                    }}
                    language={node.sourceInfo}
                >
                    {content}
                </CodeHighlighter>
            );
        },
    };

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
            {
                item.tool === "get_local_weather" && <View style={styles.weatherContainer}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "white", fontSize: RFValue(13), fontWeight: "bold" }}>北京市</Text>
                        <View style={{ flexDirection: "column", alignItems: "center", gap: 3 }}>
                            <MaterialIcons name="sunny" size={20} color="#F8D84A" />
                            <Text style={{ color: "white", fontWeight: "bold" }}>晴</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: RFValue(18), fontWeight: "bold", color: "white" }}>17°C</Text>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={{ color: "white", fontSize: RFValue(10) }}>最</Text>
                                    <Text style={{ color: "white", fontSize: RFValue(10), }}>高</Text>
                                </View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: RFValue(13) }}>17°C</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 3 }}>
                                <View style={{ flexDirection: "column" }}>
                                    <Text style={{ color: "white", fontSize: RFValue(10), }}>最</Text>
                                    <Text style={{ color: "white", fontSize: RFValue(10), }}>低</Text>
                                </View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: RFValue(13) }}>5°C</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>17时</Text>
                            <MaterialIcons name="sunny" size={20} color="#F8D84A" />
                            <Text style={{ color: "white", fontWeight: "bold" }}>17°C</Text>
                        </View>
                        <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>18时</Text>
                            <MaterialIcons name="sunny" size={20} color="#F8D84A" />
                            <Text style={{ color: "white", fontWeight: "bold" }}>15°C</Text>
                        </View>
                        <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>19时</Text>
                            <Feather name="sunset" size={20} color="#F8D84A" />
                            <Text style={{ color: "white", fontWeight: "bold" }}>13°C</Text>
                        </View>
                        <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>20时</Text>
                            <Ionicons name="moon-sharp" size={20} color="white" />
                            <Text style={{ color: "white", fontWeight: "bold" }}>13°C</Text>
                        </View>
                        <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>21时</Text>
                            <Ionicons name="cloudy-night" size={20} color="white" />
                            <Text style={{ color: "white", fontWeight: "bold" }}>11°C</Text>
                        </View>
                        <View style={{ flexDirection: "column", gap: 8, alignItems: "center" }}>
                            <Text style={{ color: "white" }}>22时</Text>
                            <Ionicons name="cloudy-night" size={20} color="white" />
                            <Text style={{ color: "white", fontWeight: "bold" }}>10°C</Text>
                        </View>
                    </View>
                </View>
            }
            <ThemedText type="defaultSemiBold">
                <Markdown rules={rules} debugPrintTree>
                    {item.content}
                </Markdown>
            </ThemedText>
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
    },
    weatherContainer: {
        paddingVertical: 16,
        paddingHorizontal: 8,
        borderRadius: 12,
        backgroundColor: "#4D8DBA",
        gap: 10
    }
})