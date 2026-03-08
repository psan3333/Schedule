import { Todo } from "@/constants/types";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useAppCache } from "@/store/cache";
import { layoutStyles } from "@/styles/layout";
import { TZDate } from "@date-fns/tz";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import Paragraph from "./typography/Paragraph";

interface HeatBarProps {
    style: StyleProp<ViewStyle>;
    todos: Todo[];
    dateInDayFormat: string;
}

const TodoHeatbar = ({ style, todos, dateInDayFormat }: HeatBarProps) => {
    const userDailyTarget = useAppCache((state) => state.userDailyTarget);
    const themeColors = useThemeColors();
    const router = useRouter();

    const barStyles = () => {
        const minOpacity = 0.1;
        const maxOpacity = 1.0;
        const userTargetProgress = todos.length / userDailyTarget;
        return {
            backgroundColor: themeColors.primary,
            opacity: Math.min(
                Math.max(minOpacity, userTargetProgress),
                maxOpacity,
            ),
            top: 0,
        };
    };

    const todosDayDate = new TZDate(dateInDayFormat);

    return (
        <Pressable
            onPress={() =>
                router.push({
                    pathname: "/todos/[day]",
                    params: { day: dateInDayFormat },
                })
            }
            style={[layoutStyles.centered, style]}
        >
            <View
                style={[
                    layoutStyles.absolute,
                    barStyles(),
                    layoutStyles.borderMd,
                    style,
                ]}
            ></View>
            <Paragraph
                style={{
                    color:
                        new TZDate().getMonth() === todosDayDate.getMonth()
                            ? themeColors.text.primary
                            : themeColors.text.secondary,
                }}
            >
                {todosDayDate.getDate()}
            </Paragraph>
        </Pressable>
    );
};

export default TodoHeatbar;
