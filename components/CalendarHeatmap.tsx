import { subDays, subMonths } from "date-fns";
import { randomUUID } from "expo-crypto";
import { useState } from "react";
import { Text, View } from "react-native";

import { timePeriods } from "@/constants/const";
import { TimePeriod, Todo } from "@/constants/types";

import { useTodosStore } from "@/store/todosStore";
import { commonStyles } from "@/styles/commonStyles";

import { useBoxShadow } from "@/hooks/useBoxShadow";
import { useThemeColors } from "@/hooks/useThemeColors";
import { TZDate } from "@date-fns/tz";
import DropDown from "./DropDown";
import TodoHeatbar from "./TodoHeatbar";

const CalendarHeatmap = () => {
    const [period, setPeriod] = useState<TimePeriod>(timePeriods[0]);
    const getTodos = useTodosStore((state) => state.getTodos);
    const shadowStyles = useBoxShadow(10);
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
        period === "week" ? commonStyles.gapSm.gap : commonStyles.gapMd.gap,
    );
    const layoutStyles =
        period === "week"
            ? [commonStyles.flexRow, commonStyles.gapSm]
            : [commonStyles.flexCol, commonStyles.gapMd];

    return (
        <View
            style={[
                commonStyles.flexCol,
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
            <View style={[commonStyles.flexRow, commonStyles.spaceBetween]}>
                <Text>Select Period</Text>
                <DropDown
                    data={timePeriods}
                    selected={period}
                    setSelected={setPeriod}
                />
            </View>
            <View
                style={[
                    commonStyles.flexWrap,
                    ...layoutStyles,
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
