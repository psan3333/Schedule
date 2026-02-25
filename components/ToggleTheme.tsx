import { useThemeStore } from "@/store/themeStore";
import { commonStyles } from "@/styles/commonStyles";
import { useAssets } from "expo-asset";
import PressableImage from "./PressableImage";

const ToggleTheme = () => {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const [assets, error] = useAssets([
        require("@/assets/icons/light-theme.png"),
        require("@/assets/icons/dark-theme.png"),
    ]);

    return assets && !error ? (
        <PressableImage
            onPress={() => toggleTheme()}
            source={theme === "dark" ? assets[0] : assets[1]}
            style={commonStyles.iconMd}
        />
    ) : null;
};

export default ToggleTheme;
