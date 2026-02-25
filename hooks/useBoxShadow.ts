import { Platform, StyleSheet } from "react-native";
import { useThemeColors } from "./useThemeColors";

export const useBoxShadow = (elevation: number) => {
    const colors = useThemeColors();
    const shadowTypes = StyleSheet.create({
        cardShadow: Platform.OS === "ios" ? {
            // IOS only!!! For Anrdoid, use elevation property
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 4,
        } : {
            elevation: elevation,
        },
    });
    return shadowTypes;
}