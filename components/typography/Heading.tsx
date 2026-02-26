import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";
import React from "react";
import { Text, TextStyle } from "react-native";

type HeadingType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Heading = ({
    style,
    headingType,
    ...props
}: {
    style: TextStyle;
    headingType: HeadingType;
}) => {
    const colors = useThemeColors();
    let headingStyle = styles.h1;
    switch (headingType) {
        case "h1":
            headingStyle = styles.h1;
            break;
        case "h2":
            headingStyle = styles.h2;
            break;
        case "h3":
            headingStyle = styles.h3;
            break;
        case "h4":
            headingStyle = styles.h4;
            break;
        case "h5":
            headingStyle = styles.h5;
            break;
        case "h6":
            headingStyle = styles.h6;
            break;
    }

    return (
        <Text
            style={[
                style,
                headingStyle,
                layoutStyles.bold,
                { color: colors.text.primary },
            ]}
            {...props}
        >
            Heading
        </Text>
    );
};

export default Heading;
