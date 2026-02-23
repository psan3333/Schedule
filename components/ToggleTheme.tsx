import { useThemeStore } from "@/store/themeStore";
import { commonStyles } from "@/styles/commonStyles";
import PressableImage from "./PressableImage";

const ToggleTheme = () => {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <PressableImage
            onPress={() => toggleTheme()}
            source={{
                uri: theme === "dark" ? "dark-theme.png" : "light-theme.png",
            }}
            style={commonStyles.iconMd}
        />
    );
};

export default ToggleTheme;
