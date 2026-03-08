import { useThemeColors } from "@/hooks/useThemeColors";
import { typography } from "@/styles/typography";
import React, { ReactNode, useMemo } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

const Heading = ({
    children,
    style,
}: {
    children: ReactNode;
    style?: StyleProp<TextStyle>;
}) => {
    const themeColors = useThemeColors();
    const textColor = useMemo(
        (): TextStyle => ({ color: themeColors.text.primary }),
        [themeColors.text.primary],
    );
    return <Text style={[typography.bold, textColor, style]}>{children}</Text>;
};

export default Heading;
