import { useThemeStore } from "@/store/themeStore";
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import db from "@/db";
import migrations from "@/drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import * as NavigationBar from 'expo-navigation-bar';
import * as ScreenOrientation from "expo-screen-orientation";
import * as SecureStore from 'expo-secure-store';

type AppTheme = "light" | "dark";

// Initializes theme from async store and returns theme color pallete
export const useAppSetup = () => {
    const systemTheme = (useColorScheme() || "light") as AppTheme;
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);
    const { success, error } = useMigrations(db, migrations);

    if (error) throw error;

    useDrizzleStudio(db.$client);

    useEffect(() => {
        SecureStore.getItemAsync("theme")
            .then((value) => {
                setTheme((value || systemTheme) as AppTheme);
            });
    }, [systemTheme, setTheme]);

    useEffect(() => {
        SecureStore.setItemAsync("theme", theme);
        NavigationBar.setStyle(theme);
    }, [theme]);

    useEffect(() => {
        if (!success) return;


    }, [success]);

    useEffect(() => {
        const unlockScreenOerientation = async () => {
            await ScreenOrientation.unlockAsync()
        }
        unlockScreenOerientation();
    }, []);
}
