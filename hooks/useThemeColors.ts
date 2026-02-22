import { Colors } from "@/constants/theme";
import { useThemeStore } from "@/store/themeStore";

export const useThemeColors = () => {
    const theme = useThemeStore((state) => state.theme);
    return Colors[theme];
}
