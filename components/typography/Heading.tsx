import { useThemeColors } from "@/hooks/useThemeColors";
import { typography } from "@/styles/typography";
import React, { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

const Heading = ({
    children,
    style,
}: {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}) => {
    const colors = useThemeColors();
    const textColor = { color: colors.text.primary };
    return (
        <Text style={[typography.semibold, textColor, style]}>{children}</Text>
    );
};

export default Heading;
