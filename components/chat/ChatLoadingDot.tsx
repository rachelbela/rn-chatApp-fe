import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export default function ChatLoadingDot() {
    const scale = useSharedValue(1)
    const colorScheme = useColorScheme()
    React.useEffect(() => {
        scale.value = withRepeat(withTiming(scale.value * 1.5, { duration: 1000 }), -1, true);
    }, []);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    return (
        <Animated.View style={[animatedStyle]}>
            <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: colorScheme === "dark" ? "white" : "black" }}></View>
        </Animated.View>
    )
}