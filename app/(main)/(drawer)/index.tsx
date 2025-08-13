/*
 * @Author: rachel
 * @Date: 2025-08-07 17:18:16
 * @LastEditTime: 2025-08-07 17:36:18
 * @LastEditors: Please set LastEditors
 */
import ChatFooter from "@/components/chat/ChatFooter";
import ChatMessageItem from "@/components/chat/ChatMessageItem";
import { ChatMessage } from "@/types/chat";
import { useHeaderHeight } from "@react-navigation/elements";
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
    role: 'AI',
    content: 'AI Message'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29ddd72',
    role: 'user',
    content: 'User Message'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abbs28ba',
    role: 'user',
    content: 'User Message'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbsd91aa97f63',
    role: 'AI',
    content: 'AI Message'
  },
  {
    id: '58694a0f-3da1-471f-bd96-14s5571e29d72',
    role: 'user',
    content: 'User Message'
  },
  {
    id: 'bd7acbea-c1b1-46c2-saed5-3ad53abb28ba',
    role: 'user',
    content: 'User Message'
  },
  {
    id: '3ac68afc-c605-48d3s-a4f8-fbd91aa97f63',
    role: 'AI',
    content: 'AI Message'
  },
  {
    id: '58694a0f-3da1-471fs-bd96-145571e29d72',
    role: 'user',
    content: 'User Message'
  },
  {
    id: 'bd7sacbea-c1b1-46c2-aed5-3ad53abb28ba',
    role: 'user',
    content: 'User Message'
  },
  {
    id: '3ac6s8afc-c605-48d3-a4f8-fbd91aa97f63',
    role: 'AI',
    content: 'AI Message'
  },
  {
    id: '58694as0f-3da1-471f-bd96-145571e29d72',
    role: 'user',
    content: 'User Message'
  },
];

export default function Index() {
  const HeaderHeight = useHeaderHeight()
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
          contentContainerStyle={{
            paddingTop: HeaderHeight,
            paddingBottom: HeaderHeight * 1.5,
            paddingLeft: 20,
            paddingRight: 18,
            gap: 24
          }}
          data={DATA}
          renderItem={({ item }) => <ChatMessageItem item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        <ChatFooter />
      </View>
    </KeyboardAvoidingView >

  );
}
