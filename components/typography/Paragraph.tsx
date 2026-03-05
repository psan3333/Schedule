import { useThemeColors } from "@/hooks/useThemeColors";
import { typography } from "@/styles/typography";
import React, { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

const Paragraph = ({
    children,
    style,
}: {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}) => {
    const themeColors = useThemeColors();
    const textColor = { color: themeColors.text.primary };
    return (
        <Text style={[typography.medium, textColor, style]}>{children}</Text>
    );
};

export default Paragraph;
