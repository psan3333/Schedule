import { subDays, subMonths } from "date-fns";
import { randomUUID } from "expo-crypto";
import { useState } from "react";
import { Text, View } from "react-native";

import { timePeriods } from "@/constants/const";
import { TimePeriod, Todo } from "@/constants/types";

import { useTodosStore } from "@/store/todosStore";

import { useBoxShadow } from "@/hooks/useBoxShadow";
import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";
import { TZDate } from "@date-fns/tz";
import DropDown from "./DropDown";
import TodoHeatbar from "./TodoHeatbar";

const CalendarHeatmap = () => {
    const [period, setPeriod] = useState<TimePeriod>(timePeriods[0]);
    const getTodos = useTodosStore((state) => state.getTodos);
    const shadowStyles = useBoxShadow(9);
    const colors = useThemeColors();
    const currDate = new Date();

    const getPeriodLookup = () => {
        switch (period) {
            case "week":
                return subDays(currDate, 6);
            case "month":
                return subDays(currDate, 29);
            case "3 months":
                return subDays(subMonths(currDate, 2), 29);
            case "year":
                return subMonths(currDate, 11);
        }
    };

    const getBarDims = () => {
        switch (period) {
            case "week":
                return [36, 1];
            default:
                return [14, 7];
        }
    };

    // const periodLookup = getPeriodLookup();
    const [barWidth, columnHeight] = getBarDims();
    const getHeight = (gap: number) => {
        return {
            height: barWidth * columnHeight * ((columnHeight - 1) * gap || 1),
        };
    };

    // const todos = getTodos(periodLookup, currDate);
    const todos: Todo[][] = [
        [
            {
                id: randomUUID(),
                timestamp: subDays(new TZDate(), 1).toString(),
                title: "Wash my hands",
                description:
                    "Everyday I forget to wash my hands and get infected real quick. So, I need to make a habit of washing my hands just right after entering my home",
            },
        ],
        [
            {
                id: randomUUID(),
                timestamp: subDays(new TZDate(), 2).toString(),
                title: "Clean my bookshelf",
                description: "Just little reordering of my books",
            },
        ],
    ];
    const containerHeight = getHeight(
        period === "week" ? layoutStyles.gapSm.gap : layoutStyles.gapMd.gap,
    );
    const containerStyles =
        period === "week"
            ? [layoutStyles.flexRow, layoutStyles.gapSm]
            : [layoutStyles.flexCol, layoutStyles.gapMd];

    return (
        <View
            style={[
                layoutStyles.flexCol,
                layoutStyles.wFull,
                shadowStyles.cardShadow,
                {
                    backgroundColor: colors.surface[1],
                    borderColor: "black",
                    borderWidth: 2,
                    borderRadius: 15,
                    padding: 10,
                },
            ]}
        >
            <View style={[layoutStyles.flexRow, layoutStyles.spaceBetween]}>
                <Text>Select Period</Text>
                <DropDown
                    data={timePeriods}
                    selected={period}
                    setSelected={setPeriod}
                />
            </View>
            <View
                style={[
                    layoutStyles.flexWrap,
                    ...containerStyles,
                    containerHeight,
                ]}
            >
                {todos.map((todos) => (
                    <TodoHeatbar
                        key={todos[0].id}
                        todos={todos}
                        style={{ width: barWidth, height: barWidth }}
                    />
                ))}
            </View>
        </View>
    );
};

export default CalendarHeatmap;
