/*
 * @Author: rachel
 * @Date: 2025-08-07 17:18:16
 * @LastEditTime: 2025-08-07 17:18:41
 * @LastEditors: 
 */
import ImageChatFooter from "@/components/images/ImageChatFooter";
import { ThemedView } from "@/components/ThemedView";

export default function Index() {
    return (
        <ThemedView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <ImageChatFooter />
        </ThemedView>
    );
}
