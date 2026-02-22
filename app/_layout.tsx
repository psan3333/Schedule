import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";

export default function RootLayout() {
    useAppTheme();

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}
