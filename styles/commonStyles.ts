import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    appContainer: {
        width: "90%",
        marginInline: "auto",
        borderColor: "black",
        borderWidth: 2
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
    bold: {
        fontWeight: "bold",
    },
    semibold: {
        fontWeight: "semibold",
    },
    fontMedium: {
        fontWeight: "medium",
    },
    iconSm: {
        height: 18,
        width: 36,
    },
    iconMd: {
        height: 36,
        width: 36,
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
});