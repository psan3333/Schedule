import { Platform } from "react-native";
import { useThemeColors } from "./useThemeColors";

export const useBoxShadow = () => {
    const themeColors = useThemeColors();
    const shadowTypes = {
        cardShadow: {},
        componentShadow: {
            backgroundColor: themeColors.surface[1],
            outlineWidth: 2,
            outlineColor: themeColors.outline,
            outlineOffset: 1,
        }
    };
    if (Platform.OS === "android" && Platform.Version >= 28) {
        shadowTypes.cardShadow = {
            boxShadow: [
                {
                    offsetX: 0,
                    offsetY: 4,
                    blurRadius: 4,
                    color: themeColors.outline
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