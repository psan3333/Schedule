import { useBoxShadow } from "@/hooks/useBoxShadow";
import { useThemeStore } from "@/store/themeStore";
import { commonStyles } from "@/styles/commonStyles";
import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import PressableImage from "./PressableImage";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
    const router = useRouter();
    const theme = useThemeStore((state) => state.theme);
    const [assets, error] = useAssets([
        require("@/assets/icons/light-theme.png"),
        require("@/assets/icons/dark-theme.png"),
    ]);
    const shadowStyles = useBoxShadow(1);
    console.log(shadowStyles);

    return (
        <View
            style={[
                commonStyles.flexRow,
                commonStyles.spaceBetween,
                commonStyles.alignCenter,
                shadowStyles.cardShadow,
                navStyles.container,
            ]}
        >
            <ToggleTheme />
            {assets && !error ? (
                <PressableImage
                    source={theme === "dark" ? assets[0] : assets[1]}
                    onPress={() => router.push("/profile")}
                    style={commonStyles.iconMd}
                />
            ) : null}
        </View>
    );
};

const navStyles = StyleSheet.create({
    container: {
        height: 64,
        paddingInline: 24,
    },
});

export default Navbar;
