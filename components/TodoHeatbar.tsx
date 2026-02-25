import { Todo } from "@/constants/types";
import { useTodosStore } from "@/store/todosStore";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface HeatBarProps {
    style: StyleProp<ViewStyle>;
    todos: Todo[];
}

const TodoHeatbar = ({ style, todos }: HeatBarProps) => {
    const userDailyTarget = useTodosStore((state) => state.userDailyTarget);
    const selectStyle = () => {
        if (todos.length / userDailyTarget < 0.5) return styles.noneCompleted;
        if (todos.length / userDailyTarget < 0.8)
            return styles.completed30Percent;
        if (todos.length / userDailyTarget < 1.0) return styles.mostlyCompleted;
        else return styles.allTasksCompleted;
    };
    return <View style={[style, selectStyle()]}></View>;
};

const styles = StyleSheet.create({
    oneWeekHeatBap: {
        width: 36,
        height: 36,
    },
    noneCompleted: {
        opacity: 0.2,
    },
    completed30Percent: {
        opacity: 0.5,
    },
    mostlyCompleted: {
        opacity: 0.8,
    },
    allTasksCompleted: {
        opacity: 1.0,
    },
});
export default TodoHeatbar;
