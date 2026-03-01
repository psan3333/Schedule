import { useBoxShadow } from "@/hooks/useBoxShadow";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useThemeStore } from "@/store/themeStore";
import { layoutStyles } from "@/styles/layout";
import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import PressableImage from "./PressableImage";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
    const router = useRouter();
    const theme = useThemeStore((state) => state.theme);
    const colors = useThemeColors();
    const [assets, error] = useAssets([
        require("@/assets/icons/light-theme.png"),
        require("@/assets/icons/dark-theme.png"),
    ]);
    const shadowStyles = useBoxShadow();

    return (
        <View
            style={[
                layoutStyles.flexRow,
                layoutStyles.spaceBetween,
                layoutStyles.alignCenter,
                shadowStyles.cardShadow,
                navStyles.container,
                { backgroundColor: colors.surface[1] },
            ]}
        >
            <ToggleTheme />
            {assets && !error ? (
                <PressableImage
                    source={theme === "dark" ? assets[0] : assets[1]}
                    onPress={() => router.push("/profile")}
                    style={layoutStyles.iconMd}
                />
            ) : null}
        </View>
    );
};

const navStyles = StyleSheet.create({
    container: {
        height: 64,
        paddingInline: 24,
        marginBottom: 24,
    },
});

export default Navbar;
