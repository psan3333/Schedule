import CalendarHeatmap from "@/components/CalendarHeatmap";
import GraphicalStats from "@/components/GraphicalStats";
import TodoListContainer from "@/components/TodoListContainer";
import { layoutStyles } from "@/styles/layout";
import { ScrollView, StyleSheet } from "react-native";

export default function Index() {
    return (
        <ScrollView
            contentContainerStyle={[
                layoutStyles.flexRow,
                layoutStyles.flexWrap,
                layoutStyles.alignCenter,
                layoutStyles.appContainer,
                layoutStyles.pdSm,
                styles.spaceBetweenItems,
            ]}
        >
            <TodoListContainer />
            <CalendarHeatmap />
            <GraphicalStats />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    spaceBetweenItems: {
        gap: 24,
    },
});
