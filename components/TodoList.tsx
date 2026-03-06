import { TimePeriod, Todo } from "@/constants/types";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTodosStore } from "@/store/todosStore";
import { layoutStyles } from "@/styles/layout";
import { typography } from "@/styles/typography";
import { getPeriodLookup } from "@/utils/utils";
import { TZDate } from "@date-fns/tz";
import { randomUUID } from "expo-crypto";
import React, { useMemo } from "react";
import { ScrollView, View } from "react-native";
import Paragraph from "./typography/Paragraph";

interface TodoListProps {
    period: TimePeriod;
}

const TodoList: React.FC<TodoListProps> = ({ period = "day" }) => {
    const themeColors = useThemeColors();
    const getTodosByPeriod = useTodosStore((state) => state.getTodosByPeriod);
    const todoListStyles = useMemo(
        () => [
            layoutStyles.pdMd,
            layoutStyles.wFull,
            layoutStyles.borderLg,
            { backgroundColor: themeColors.surface[2] },
        ],
        [themeColors.surface],
    );

    const periodLookup = getPeriodLookup(new TZDate(), period);
    const todos = useMemo(
        () =>
            getTodosByPeriod("planned", periodLookup, new TZDate()).reduce(
                (todosByPeriod, todosByDay) => {
                    const day = Object.keys(todosByDay)[0];
                    return todosByPeriod.concat(...todosByDay[day]);
                },
                [] as Todo[],
            ),
        [getTodosByPeriod, periodLookup],
    );

    const todoItemStyle = useMemo(
        () => [
            layoutStyles.flexRow,
            layoutStyles.wHalfLayoutContainer,
            layoutStyles.spaceBetween,
        ],
        [],
    );

    const todoListItems = useMemo(
        () =>
            todos.map((todo) => (
                <View key={randomUUID()} style={todoItemStyle}>
                    <Paragraph style={typography.textMd}>
                        {todo.title}
                    </Paragraph>
                    <Paragraph style={typography.textSm}>
                        {todo.timestamp}
                    </Paragraph>
                </View>
            )),
        [todoItemStyle, todos],
    );

    return <ScrollView style={todoListStyles}>{todoListItems}</ScrollView>;
};

export default TodoList;
