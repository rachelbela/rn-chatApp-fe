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
import { fetch } from 'expo/fetch';
import { useCallback, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, NativeScrollEvent, NativeSyntheticEvent, Platform, View } from "react-native";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

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
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f6dd32',
    role: 'user',
    content: 'markdown渲染'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29ddd723',
    role: 'AI',
    content: `Headings

  # h1 Heading 8-)
  ## h2 Heading
  ### h3 Heading
  #### h4 Heading
  ##### h5 Heading
  ###### h6 Heading


Horizontal Rules

  Some text above
  ___

  Some text in the middle

  ---

  Some text below


Emphasis

  **This is bold text**

  __This is bold text__

  *This is italic text*

  _This is italic text_

  ~~Strikethrough~~


Blockquotes

  > Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.


Lists

  Unordered

  + Sub-lists are made by indenting 2 spaces:
    - Marker character change forces new list start:
      * Ac tristique libero volutpat at
      + Facilisis in pretium nisl aliquet. This is a very long list item that will surely wrap onto the next line.
      - Nulla volutpat aliquam velit
  + Very easy!

  Ordered

  1. Lorem ipsum dolor sit amet
  2. Consectetur adipiscing elit. This is a very long list item that will surely wrap onto the next line.
  3. Integer molestie lorem at massa

  Start numbering with offset:

  57. foo
  58. bar


Code

  Inline \`code\`

  Indented code

      // Some comments
      line 1 of code
      line 2 of code
      line 3 of code


  Block code "fences"

  \`\`\`
  Sample text here...
  \`\`\`

  Syntax highlighting

  \`\`\` js
  var foo = function (bar) {
    return bar++;
  };

  console.log(foo(5));
  \`\`\`


Tables

  | Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  Right aligned columns

  | Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |


Links

  [link text](https://www.google.com)

  [link with title](https://www.google.com "title text!")

  Autoconverted link https://www.google.com (enable linkify to see)

  With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


Typographic Replacements

  Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  "Smartypants, double quotes" and 'single quotes'`
  },
];

export default function Index() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const HeaderHeight = useHeaderHeight()
  const flatListRef = useRef<FlatList>(null);
  const [showScrollToBottomButton, setShowScrollToBottomButton] = useState(false);
  const handleScrollToBottom = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 9999 })
  }, [])
  const [working, setWorking] = useState(false);

  const handleSend = async (prompt: string) => {
    setWorking(true);
    addMessage(prompt);
    const requestMessage = buildRequestMessage(prompt);
    try {
      const resp = await fetch('http://localhost:8787/chat', {
        method: "POST",
        body: JSON.stringify({
          messages: requestMessage
        }),
        headers: { Accept: 'text/event-stream' },
      });
      if (!resp.ok || !resp.body) {
        throw new Error("服务端错误，请重试")
      }
      // @ts-ignore
      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let content = ""
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("流结束了")
          setWorking(false);
          setMessages(prev => {
            const newMesssages = [...prev];
            const lastIndex = newMesssages.length - 1;
            newMesssages[lastIndex] = {
              ...newMesssages[lastIndex],
              loading: false,
            }
            return newMesssages
          })
          break;
        }
        const text = decoder.decode(value, { stream: true })
        content += text
        console.log("流响应", text)
        setMessages(prev => {
          const newMesssages = [...prev];
          const lastIndex = newMesssages.length - 1;
          newMesssages[lastIndex] = {
            ...newMesssages[lastIndex],
            content: content
          }
          return newMesssages
        })
      }
    } catch (e) {
      setWorking(false);
      setMessages(prev => {
        const newMesssages = [...prev];
        const lastIndex = newMesssages.length - 1;
        newMesssages[lastIndex] = {
          ...newMesssages[lastIndex],
          loading: false,
          content: "服务端错误，请重试"
        }
        return newMesssages
      })
    }


  }

  const buildRequestMessage = (prompt: string) => {
    return [...messages.map(item => ({ role: item.role, content: [{ type: "text", text: item.content }] })), {
      role: "user",
      content: [
        {
          type: "text",
          text: prompt
        }
      ]
    }]
  }

  const addMessage = (prompt: string) => {
    const userMessage = { id: uuidv4(), role: "user", content: prompt };
    const AIMessage = { id: uuidv4(), role: "assistant", loading: true };
    setMessages(prev => ([...prev, userMessage, AIMessage]))
  }

  const handleOnScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentSize, contentOffset, layoutMeasurement } = event.nativeEvent;
    const show = contentSize.height - contentOffset.y - layoutMeasurement.height > 50
    if (showScrollToBottomButton !== show) {
      setShowScrollToBottomButton(show)
    }
  }, [showScrollToBottomButton])

  const handleOnContentSizeChange = useCallback(() => {
    if (!showScrollToBottomButton) {
      handleScrollToBottom();
    }
  }, [showScrollToBottomButton, handleScrollToBottom])
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
          onContentSizeChange={handleOnContentSizeChange}
          data={messages}
          renderItem={({ item }) => <ChatMessageItem item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        />
        <View style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          gap: 8
        }}>
          <ScrollToBottomButton showScrollToBottomButton={showScrollToBottomButton} handleScrollToBottom={handleScrollToBottom} />
          <ChatFooter handleSend={handleSend} working={working} />
        </View>
      </View>
    </KeyboardAvoidingView >

  );
}
