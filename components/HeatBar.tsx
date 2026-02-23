import { TimePeriod } from "@/constants/types";
import React from "react";
import { StyleSheet, View } from "react-native";

// TODO: Finish creating HearBar component with it's parent!!
const HeatBar = ({
    period,
    date,
    count,
}: {
    period: TimePeriod;
    date: Date;
    count: number;
}) => {
    return <View style={[]}></View>;
};

const styles = StyleSheet.create({
    heatBar: {
        width: 18,
        height: 18,
    },
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
export default HeatBar;
