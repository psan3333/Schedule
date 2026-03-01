import { Todo } from "@/constants/types";
import { useTodosStore } from "@/store/todosStore";
import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface HeatBarProps {
    style: StyleProp<ViewStyle>;
    todos: Todo[];
}

const TodoHeatbar = ({ style, todos }: HeatBarProps) => {
    const userDailyTarget = useTodosStore((state) => state.userDailyTarget);
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
    return <View style={[style, barOpacity()]}></View>;
};

export default TodoHeatbar;
