import { useThemeColors } from "@/hooks/useThemeColors";
import { typography } from "@/styles/typography";
import React, { ReactNode, useMemo } from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

const Paragraph = ({
    children,
    style,
    ...props
}: {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
    props?: TextProps;
}) => {
    const themeColors = useThemeColors();
    const textColor = useMemo(
        (): TextStyle => ({ color: themeColors.text.primary }),
        [themeColors.text.primary],
    );
    return (
        <Text style={[typography.medium, textColor, style]} {...props}>
            {children}
        </Text>
    );
};

export default Paragraph;
