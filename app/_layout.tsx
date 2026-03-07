import Navbar from "@/components/Navbar";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, Link, Slot, usePathname } from "expo-router";
import { Suspense } from "react";
import { Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Paragraph from "@/components/typography/Paragraph";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useThemeStore } from "@/store/themeStore";
import { layoutStyles } from "@/styles/layout";

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

type IconType = typeof Feather & typeof MaterialIcons;
type extractIconTypes<Type> = Type extends Icon<infer X, infer Y> ? X : never;

const tabRoutes = [
    {
        route: "/",
        text: "Home",
        iconName: "home",
        Icon: Feather,
    },
    {
        route: "/todos",
        text: "Your TODO",
        iconName: "check-square",
        Icon: Feather,
    },
];

const DB_NAME = "todo";

function TabBarButton({
    text,
    route,
    currPath,
    iconName,
    Icon,
}: {
    text: string;
    route: string;
    currPath: string;
    iconName: extractIconTypes<IconType>;
    Icon: IconType;
}) {
    const theme = useThemeColors();

    return (
        <Link href={route as Href} style={layoutStyles.centered} asChild>
            <Pressable>
                <Icon
                    name={iconName}
                    style={[
                        currPath === route
                            ? { color: theme.primary }
                            : { color: theme.text.disabled },
                    ]}
                    size={24}
                />
                <Paragraph
                    style={
                        currPath === route
                            ? { color: theme.primary }
                            : { color: theme.text.disabled }
                    }
                >
                    {text}
                </Paragraph>
            </Pressable>
        </Link>
    );
}

export default function RootLayout() {
    const currPath = usePathname();
    const themeColors = useThemeColors();
    const theme = useThemeStore((state) => state.theme);
    useAppTheme();
    // local db
    const expo = openDatabaseSync(process.env.DB_URL!);
    const db = drizzle(expo);
    return (
        <Suspense>
            <SafeAreaView
                style={[
                    layoutStyles.flexCol,
                    layoutStyles.hFull,
                    layoutStyles.spaceBetween,
                    { backgroundColor: themeColors.surface[0] },
                ]}
            >
                <StatusBar
                    animated={true}
                    barStyle={`${theme === "dark" ? "light" : "dark"}-content`}
                    backgroundColor={themeColors.surface[0]}
                />
                <Navbar />
                <Slot />
                <View
                    style={[
                        layoutStyles.flexRow,
                        layoutStyles.spaceAround,
                        layoutStyles.alignCenter,
                    ]}
                >
                    {tabRoutes.map(({ route, text, iconName, Icon }) => (
                        <TabBarButton
                            key={`${Math.random() * 100000000}`}
                            text={text}
                            route={route}
                            iconName={iconName as extractIconTypes<IconType>}
                            currPath={currPath}
                            Icon={Icon as IconType}
                        />
                    ))}
                </View>
            </SafeAreaView>
        </Suspense>
    );
}
