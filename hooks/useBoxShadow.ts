import { Platform } from "react-native";
import { useThemeColors } from "./useThemeColors";

export const useBoxShadow = () => {
    const colors = useThemeColors();
    const shadowTypes = {
        cardShadow: {}
    };
    if (Platform.OS === "android" && Platform.Version >= 28) {
        shadowTypes.cardShadow = {
            boxShadow: [
                {
                    offsetX: 0,
                    offsetY: 4,
                    blurRadius: 4,
                    color: colors.shadow
                }
            ]
        };
    } else if (Platform.OS === "android" && Platform.Version < 28) {
        shadowTypes.cardShadow = {
            elevation: 4,
        };
    }

    return shadowTypes;
}