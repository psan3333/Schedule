import { subDays, subMonths } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { timePeriods } from "@/constants/const";
import { TimePeriod } from "@/constants/types";
import { layoutStyles } from "@/styles/layout";

import { useThemeColors } from "@/hooks/useThemeColors";
import { useTodosStore } from "@/store/todosStore";

import { typography } from "@/styles/typography";
import { TZDate } from "@date-fns/tz";
import DropDown from "./DropDown";
import TodoHeatbar from "./TodoHeatbar";
import Heading from "./typography/Heading";

const CalendarHeatmap = () => {
    const [period, setPeriod] = useState<TimePeriod>(timePeriods[0]);
    const getTodos = useTodosStore((state) => state.getTodosByPeriod);
    const colors = useThemeColors();
    const currDate = useMemo(() => new TZDate(), []);

    const getPeriodLookup = useCallback(() => {
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
    }, [period, currDate]);

    const periodLookup = getPeriodLookup();
    const todos = getTodos("finished", periodLookup, currDate);

    const containerStyles = useMemo(
        () => [
            layoutStyles.wFull,
            layoutStyles.borderMd,
            layoutStyles.flexCol,
            layoutStyles.borderMd,
            layoutStyles.pdMd,
            layoutStyles.gapMd,
            {
                backgroundColor: colors.surface[1],
                outlineWidth: 3,
                outlineColor: colors.shadow,
                outlineOffset: 1,
            },
        ],
        [colors.shadow, colors.surface],
    );
    return (
        <View style={containerStyles}>
            <View
                style={[
                    layoutStyles.flexRow,
                    layoutStyles.spaceBetween,
                    layoutStyles.alignCenter,
                ]}
            >
                <Heading style={typography.textMd}>Select Period</Heading>
                <DropDown
                    data={timePeriods}
                    selected={period}
                    setSelected={setPeriod}
                />
            </View>
            <View
                style={[
                    period === "week"
                        ? [layoutStyles.gapMd, layoutStyles.flexRow]
                        : [layoutStyles.gapSm, layoutStyles.flexCol],
                    layoutStyles.flexWrap,
                    {
                        width:
                            period === "week"
                                ? styles.heatbarLg.width * 7 +
                                  layoutStyles.gapMd.gap * 6 +
                                  4
                                : "auto",
                        height:
                            period !== "week"
                                ? styles.heatbarSm.width * 7 +
                                  layoutStyles.gapSm.gap * 6 +
                                  4
                                : "auto",
                    },
                ]}
            >
                {todos.map((item) => {
                    const day = Object.keys(item)[0];
                    return (
                        <TodoHeatbar
                            key={day}
                            style={
                                period === "week"
                                    ? styles.heatbarLg
                                    : styles.heatbarSm
                            }
                            todos={item[day]}
                            dateInDayFormat={day}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    heatbarLg: {
        height: 36,
        width: 36,
    },
    heatbarSm: {
        height: 16,
        width: 16,
    },
});

export default CalendarHeatmap;
