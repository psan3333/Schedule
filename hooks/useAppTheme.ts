import { useThemeStore } from "@/store/themeStore";
import * as SecureStore from 'expo-secure-store';
import { useEffect } from "react";
import { useColorScheme } from "react-native";

type AppTheme = "light" | "dark";

// Initializes theme from async store and returns theme color pallete
export const useAppTheme = () => {
    const systemTheme = (useColorScheme() || "light") as AppTheme;
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    useEffect(() => {
        SecureStore.getItemAsync("theme")
            .then((value) => {
                setTheme((value || systemTheme) as AppTheme);
            });
    }, [systemTheme, setTheme]);

    useEffect(() => {
        SecureStore.setItemAsync("theme", theme);
    }, [theme]);
}
