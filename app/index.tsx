import CalendarHeatmap from "@/components/CalendarHeatmap";
import { useThemeColors } from "@/hooks/useThemeColors";
import { commonStyles } from "@/styles/commonStyles";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
    const colors = useThemeColors();
    return (
        <ScrollView
            contentContainerStyle={[
                commonStyles.flexCol,
                commonStyles.alignCenter,
                commonStyles.appContainer,
                styles.spaceBetweenItems,
                { backgroundColor: colors.surface[1] },
            ]}
        >
            <CalendarHeatmap />
            <CalendarHeatmap />
            <CalendarHeatmap />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    spaceBetweenItems: {
        gap: 24,
    },
});
