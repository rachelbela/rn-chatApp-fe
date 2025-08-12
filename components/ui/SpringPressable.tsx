import React, { PropsWithChildren } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring } from 'react-native-reanimated';

type Props = {
    viewStyle?: ViewStyle;
    style: ViewStyle;
    onPress?: () => void;
} & PropsWithChildren & PressableProps
export default function SpringPressable({ viewStyle, style, onPress, children, ...rest }: Props) {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{
            scale: scale.value
        }],
    }));
    return (
        <Animated.View style={[animatedStyle, viewStyle]}>
            <Pressable
                style={style}
                onPress={
                    () => {
                        scale.value = withSequence(withSpring(0.96), withSpring(1));
                        onPress?.();
                    }
                }
                {...rest}
            >{children}</Pressable>
        </Animated.View>
    )
}