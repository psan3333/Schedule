import { Todo } from "@/constants/types";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTodosStore } from "@/store/todosStore";
import { layoutStyles } from "@/styles/layout";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

interface HeatBarProps {
    style: StyleProp<ViewStyle>;
    todos: Todo[];
    dateInDayFormat: string;
}

const TodoHeatbar = ({ style, todos, dateInDayFormat }: HeatBarProps) => {
    const userDailyTarget = useTodosStore((state) => state.userDailyTarget);
    const colors = useThemeColors();
    const router = useRouter();

    const barOpacity = () => {
        const minOpacity = 0.2;
        const maxOpacity = 1.0;
        const userTargetProgress = todos.length / userDailyTarget;
        return {
            opacity: Math.min(
                Math.max(minOpacity, userTargetProgress),
                maxOpacity,
            ),
        };
    };

    const heatBarStyles = useMemo(
        () => ({
            outlineWidth: 2,
            outlineOffset: 1,
            outlineColor: colors.shadow,
            backgroundColor: colors.primary,
        }),
        [colors.primary, colors.shadow],
    );

    return (
        <Pressable
            onPress={() => {
                console.log("pressed", dateInDayFormat);
                router.navigate({
                    pathname: "/todos/[day]",
                    params: { day: dateInDayFormat },
                });
            }}
            style={(state) => [
                state.pressed && { opacity: 0.8 },
                layoutStyles.borderMd,
                style,
                heatBarStyles,
                barOpacity(),
            ]}
        ></Pressable>
    );
};

export default TodoHeatbar;
