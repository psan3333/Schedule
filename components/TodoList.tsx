import { TimePeriod } from "@/constants/types";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useTodosStore } from "@/store/todosStore";
import { layoutStyles } from "@/styles/layout";
import { getPeriodLookup } from "@/utils/utils";
import { TZDate } from "@date-fns/tz";
import React, { useMemo } from "react";
import { ScrollView, Text } from "react-native";

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
    const todos = getTodosByPeriod("finished", periodLookup, new TZDate());

    return (
        <ScrollView style={todoListStyles}>
            <Text>TodoList</Text>
        </ScrollView>
    );
};

export default TodoList;
