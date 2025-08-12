/*
 * @Author: rachel
 * @Date: 2025-08-07 17:18:16
 * @LastEditTime: 2025-08-07 17:18:41
 * @LastEditors: 
 */
import ImageChatFooter from "@/components/images/ImageChatFooter";
import { ThemedView } from "@/components/ThemedView";
import { useHeaderHeight } from "@react-navigation/elements";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function Index() {
    const height = useHeaderHeight()
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={height}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
                flex: 1,
            }}>
            <ThemedView
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ImageChatFooter />
            </ThemedView>
        </KeyboardAvoidingView>
    );
}
