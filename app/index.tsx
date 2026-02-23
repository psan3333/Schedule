import CalendarHeatmap from "@/components/CalendarHeatmap";
import { commonStyles, gap } from "@/styles/commonStyles";
import { ScrollView } from "react-native";

export default function Index() {
    return (
        <ScrollView style={[commonStyles.flexCol, gap(12)]}>
            <CalendarHeatmap />
        </ScrollView>
    );
}
