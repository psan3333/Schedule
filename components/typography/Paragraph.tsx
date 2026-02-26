import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { typography } from "@/styles/typography";
import React, { ReactNode } from "react";
import { Text, TextStyle } from "react-native";

const Paragraph = ({ children }: { children: ReactNode }) => {
    const colors = useThemeColors();
    const textSize = useMediaQuery({
        queries: [{ query: "maxWidth", value: 512 }],
        style: typography.textXs,
        defaultStyle: typography.textSm,
    }) as TextStyle;
    const textColor = { color: colors.text.primary };
    return (
        <Text style={[textSize, textColor, typography.medium]}>{children}</Text>
    );
};

export default Paragraph;
