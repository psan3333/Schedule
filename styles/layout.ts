import { StyleSheet } from "react-native";

export const layoutStyles = StyleSheet.create({
    appContainer: {
        width: "90%",
        marginInline: "auto",
        borderColor: "black",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    justifyCenter: {
        justifyContent: "center",
    },
    spaceBetween: {
        justifyContent: "space-between",
    },
    spaceAround: {
        justifyContent: "space-around",
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
    },
    alignCenter: {
        alignItems: 'center',
    },
    iconXs: {
        height: 10,
        width: 10,
    },
    iconSm: {
        height: 18,
        width: 18,
    },
    iconMd: {
        height: 24,
        width: 24,
    },
    hFull: {
        height: "100%",
    },
    wFull: {
        width: "100%",
    },
    flexWrap: {
        flexWrap: "wrap",
    },
    gapSm: {
        gap: 5,
    },
    gapMd: {
        gap: 15,
    },
    pdXs: {
        padding: 4,
    },
    pdSm: {
        padding: 6
    },
    pdMd: {
        padding: 10
    },
    pdLg: {
        padding: 15,
    },
    pdXl: {
        padding: 20,
    },
    absolute: {
        position: "absolute",
    },
    relative: {
        position: "relative",
    },
    elementBelow: {
        top: "100%",
    },
});