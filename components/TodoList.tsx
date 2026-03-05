import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";
import React, { useMemo } from "react";
import { ScrollView, Text } from "react-native";

const TodoList = () => {
    const themeColors = useThemeColors();
    const todoListStyles = useMemo(
        () => [
            layoutStyles.pdMd,
            layoutStyles.wFull,
            layoutStyles.borderLg,
            { backgroundColor: themeColors.surface[2] },
        ],
        [themeColors.surface],
    );

    return (
        <ScrollView style={todoListStyles}>
            <Text>TodoList</Text>
        </ScrollView>
    );
};

export default TodoList;
