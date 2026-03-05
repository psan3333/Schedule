import { useThemeColors } from "@/hooks/useThemeColors";
import { ImageStyle } from "expo-image";
import React, { ReactNode } from "react";
import { GestureResponderEvent, Pressable, StyleProp } from "react-native";

interface ButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    style: StyleProp<ImageStyle>;
    children: ReactNode;
}

const Button = ({ onPress, style, children }: ButtonProps) => {
    const themeColors = useThemeColors();

    return (
        <Pressable
            style={({ pressed }) => [
                style,
                {
                    backgroundColor: pressed
                        ? themeColors.button.pressed
                        : themeColors.button.default,
                },
            ]}
            onPress={onPress}
        >
            {children}
        </Pressable>
    );
};

export default Button;
