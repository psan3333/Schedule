import CalendarHeatmap from "@/components/CalendarHeatmap";
import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
    const colors = useThemeColors();
    return (
        <ScrollView
            contentContainerStyle={[
                layoutStyles.flexCol,
                layoutStyles.alignCenter,
                layoutStyles.appContainer,
                layoutStyles.pdSm,
                styles.spaceBetweenItems,
            ]}
        >
            <CalendarHeatmap />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    spaceBetweenItems: {
        gap: 24,
    },
});
