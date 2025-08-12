import { useColorScheme } from '@/hooks/useColorScheme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function VoicePressable() {
  const { bottom } = useSafeAreaInsets()
  const colorScheme = useColorScheme()
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Pressable onPress={() => {
        setModalVisible(true);
      }}>
        <MaterialIcons name="keyboard-voice" size={20} color={colorScheme === "dark" ? "white" : "black"} />
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {

        }}
      >
        <BlurView style={{ flex: 1 }}>
          <Pressable style={{ flex: 1 }} onPress={() => {
            setModalVisible(false)
          }}>
            <Pressable
              style={{
                position: "absolute",
                bottom: bottom * 2,
                backgroundColor: "black",
                width: "90%",
                height: 50,
                flexDirection: "row",
                justifyContent: "space-between",
                alignSelf: "center",
                borderRadius: 16,
                paddingHorizontal: 16,
                paddingVertical: 8,
                alignItems: "center"
              }}>
              <Pressable onPress={() => { setModalVisible(false) }}>
                <Text style={{ color: "red" }}>取消</Text>
              </Pressable>
              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "red" }}></View>
                <Text style={{ color: "white" }}>00:01</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
                <Feather name="check" size={16} color="green" />
                <Text style={{ color: "green" }}>完成</Text>
              </View>
            </Pressable>
          </Pressable>

        </BlurView>
      </Modal>
    </>

  )
}