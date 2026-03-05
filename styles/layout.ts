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
    wHalfLayoutContainer: {
        width: "48%",
    },
    wAuto: {
        width: "auto",
    },
    flexWrap: {
        flexWrap: "wrap",
    },
    gapXs: {
        gap: 2,
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
    mrXs: {
        padding: 4,
    },
    mrSm: {
        padding: 6
    },
    mrMd: {
        padding: 10
    },
    mrLg: {
        padding: 15,
    },
    mrXl: {
        padding: 20,
    },
    borderXs: {
        borderRadius: 4,
    },
    borderSm: {
        borderRadius: 6
    },
    borderMd: {
        borderRadius: 10
    },
    borderLg: {
        borderRadius: 15,
    },
    borderXl: {
        borderRadius: 20,
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
    elementAtBottom: {
        bottom: 0,
    },
    aboveAll: {
        zIndex: 1000,
    },
    zSurface: {
        zIndex: 1,
    },
    borderBox: {
        boxSizing: "border-box",
    },
    contentBox: {
        boxSizing: "content-box",
    }
});