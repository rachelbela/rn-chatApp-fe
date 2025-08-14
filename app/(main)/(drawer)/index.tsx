/*
 * @Author: rachel
 * @Date: 2025-08-07 17:18:16
 * @LastEditTime: 2025-08-07 17:36:18
 * @LastEditors: Please set LastEditors
 */
import ChatFooter from "@/components/chat/ChatFooter";
import ChatMessageItem from "@/components/chat/ChatMessageItem";
import ScrollToBottomButton from "@/components/ui/ScrollToBottomButton";
import { ChatMessage } from "@/types/chat";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";

const DATA: ChatMessage[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    role: 'user',
    content: 'User Message'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    role: 'AI',
    content: 'AI Message',
    think: "sfdjsakfjdsalfkdsajfldakj"
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    role: 'user',
    content: '小米股票'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bass',
    role: 'AI',
    tool: "get_stock_price",
    content: '小米集团是一家以手机、智能硬件和OT平台为核心的互联网公司。公司的产品按照产品功能、形态及模式，大体上可以划分为智能手机、OT和生活消费产品、互联网服务产品'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6dd3',
    role: 'user',
    content: '北京天气'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29ddd72',
    role: 'AI',
    tool: "get_local_weather",
    content: '北京今起至下周一最高气温将维持在20°C以上，今天（3月19日）晴朗继续，白天最高气温升至20°C。但夜间最低气温仅5°C，昼夜温差大，注意调整着装。'
  },
];

export default function Index() {
  const HeaderHeight = useHeaderHeight()
  const flatListRef = useRef<FlatList>(null);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
  const handleScrollToBottom = () => {
    flatListRef.current?.scrollToOffset({ offset: 9999 })
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          ref={flatListRef}
          contentContainerStyle={{
            paddingTop: HeaderHeight,
            paddingBottom: HeaderHeight * 1.5,
            paddingLeft: 20,
            paddingRight: 18,
            gap: 24
          }}
          onContentSizeChange={() => {
            if (!showScrollToBottomButton) {
              handleScrollToBottom();
            }
          }}
          data={DATA}
          renderItem={({ item }) => <ChatMessageItem item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          onScroll={event => {
            const { contentSize, contentOffset, layoutMeasurement } = event.nativeEvent;
            if (contentSize.height - contentOffset.y - layoutMeasurement.height > 1) {
              setShowScrollToBottomButton(true)
            } else {
              setShowScrollToBottomButton(false)

            }
          }}
        />
        <View style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          gap: 8
        }}>
          <ScrollToBottomButton showScrollToBottomButton={showScrollToBottomButton} handleScrollToBottom={handleScrollToBottom} />
          <ChatFooter />
        </View>
      </View>
    </KeyboardAvoidingView >

  );
}
