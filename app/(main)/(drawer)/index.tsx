/*
 * @Author: rachel
 * @Date: 2025-08-07 17:18:16
 * @LastEditTime: 2025-08-07 17:36:18
 * @LastEditors: Please set LastEditors
 */
import AIMessage from "@/components/chat/AIMessage";
import ChatFooter from "@/components/chat/ChatFooter";
import UserMessage from "@/components/chat/UserMessage";
import { useHeaderHeight } from "@react-navigation/elements";
import { FlatList, View } from "react-native";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    role: 'user',
    content: 'User Message'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    role: 'AI',
    content: 'AI Message'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    role: 'user',
    content: 'User Message'
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bass',
    role: 'user',
    content: 'User Message'
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
type ItemProps = { id: string, role: string; content: string; };

const Item = ({ item }: { item: ItemProps }) => (
  item.role === "user" ? <UserMessage content={item.content} /> : <AIMessage content={item.content} />
);
export default function Index() {
  const HeaderHeight = useHeaderHeight()
  return (
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
        }}
        data={DATA}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <ChatFooter />
    </View>
  );
}
