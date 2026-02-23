import { useThemeStore } from "@/store/themeStore";
import { commonStyles } from "@/styles/commonStyles";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import PressableImage from "./PressableImage";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
    const router = useRouter();
    const theme = useThemeStore((state) => state.theme);

    return (
        <View style={[commonStyles.flexRow, commonStyles.spaceBetween]}>
            <View>
                <ToggleTheme />
                <PressableImage
                    source={{
                        uri:
                            theme === "dark"
                                ? "profile-dark.png"
                                : "profile-light.png",
                    }}
                    onPress={() => router.push("/profile")}
                    style={commonStyles.iconMd}
                />
            </View>
        </View>
    );
};

export default Navbar;
