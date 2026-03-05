import { useBoxShadow } from "@/hooks/useBoxShadow";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useThemeStore } from "@/store/themeStore";
import { layoutStyles } from "@/styles/layout";
import { typography } from "@/styles/typography";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { View } from "react-native";
import Button from "./pressable/Button";
import TodoList from "./TodoList";
import Heading from "./typography/Heading";
import Paragraph from "./typography/Paragraph";

const TodoListContainer = () => {
    const [assets, error] = useAssets([
        require("@/assets/icons/plus-light.png"),
        require("@/assets/icons/plus-dark.png"),
    ]);
    const theme = useThemeStore((state) => state.theme);
    const themeColors = useThemeColors();
    const shadowStyles = useBoxShadow();

    const todoListStyles = useMemo(
        () => [
            layoutStyles.flexCol,
            layoutStyles.wFull,
            layoutStyles.alignCenter,
            layoutStyles.gapMd,
            layoutStyles.pdMd,
            layoutStyles.borderMd,
            shadowStyles.componentShadow,
        ],
        [shadowStyles.componentShadow],
    );

    const todoListToolbarStyles = useMemo(
        () => [
            layoutStyles.wFull,
            layoutStyles.flexRow,
            layoutStyles.spaceBetween,
            layoutStyles.alignCenter,
            layoutStyles.mrMd,
            layoutStyles.borderLg,
            shadowStyles.cardShadow,
            { backgroundColor: themeColors.surface[2] },
        ],
        [shadowStyles.cardShadow, themeColors.surface],
    );

    return (
        <View style={todoListStyles}>
            <View style={todoListToolbarStyles}>
                <Heading style={typography.textMd}>Planned TODOs</Heading>
                <Button
                    style={[
                        layoutStyles.flexRow,
                        layoutStyles.gapMd,
                        layoutStyles.alignCenter,
                        layoutStyles.pdMd,
                        layoutStyles.borderLg,
                        shadowStyles.cardShadow,
                    ]}
                    onPress={() => console.log("Open Modal")}
                >
                    <Paragraph style={typography.textSm}>Add New</Paragraph>
                    {assets && !error ? (
                        <Image
                            source={theme === "light" ? assets[0] : assets[1]}
                            style={layoutStyles.iconMd}
                        />
                    ) : null}
                </Button>
            </View>
            <TodoList />
        </View>
    );
};

export default TodoListContainer;
