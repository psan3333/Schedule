import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    appContainer: {
        height: "100%",
        width: "90%",
        marginInline: "auto",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    jusfityCenter: {
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
        width: "auto",
    },
    iconMd: {
        height: 36,
        width: "auto",
    }
});

export const gap = (px: number) => {
    return {
        gap: px,
    };
};