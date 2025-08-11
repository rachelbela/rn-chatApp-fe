/*
 * @Author: rachel
 * @Date: 2025-08-07 17:18:16
 * @LastEditTime: 2025-08-08 14:24:12
 * @LastEditors: Please set LastEditors
 */
import ChatHeader from '@/components/chat/ChatHeader';
import DrawerMenuButton from '@/components/ui/DrawerMenuButton';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Drawer } from 'expo-router/drawer';
import { Dimensions, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');
export default function Layout() {
  const colorScheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={({ navigation }) => ({
          drawerInactiveTintColor: colorScheme === "dark" ? "white" : 'black',
          drawerActiveTintColor: colorScheme === "dark" ? "white" : 'black',
          drawerActiveBackgroundColor: colorScheme === "dark" ? 'black' : '#f5f5f5',
          drawerItemStyle: {
            borderRadius: 16
          },
          drawerHideStatusBarOnOpen: true,
          drawerStyle: {
            width: width * 0.8,
          },
          overlayColor: "rgba(0,0,0,0.3)",
          headerLeft: () => <DrawerMenuButton onPress={() => navigation.openDrawer()} />,
          headerLeftContainerStyle: { paddingLeft: 20 },
          headerShadowVisible: false,
        })}>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: (props: {
              color: string;
              focused: boolean;
            }) => <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                {props.focused ? <FontAwesome name="home" size={24} color={props.color} /> : <Ionicons name="home-outline" size={24} color={props.color} />}
                <Text style={{ color: props.color }}>Home</Text>
              </View>,
            headerTitle: ChatHeader,
            headerTransparent: true,
            headerBackground: () => <BlurView style={StyleSheet.absoluteFill}></BlurView>
          }}

        />
        <Drawer.Screen
          name="image" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: (props: {
              color: string;
              focused: boolean;
            }) => <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                {props.focused ? <Ionicons name="images" size={24} color={props.color} /> : <Ionicons name="images-outline" size={24} color={props.color} />}
                <Text style={{ color: props.color }}>Images</Text>
              </View>,
            title: 'Image',
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
