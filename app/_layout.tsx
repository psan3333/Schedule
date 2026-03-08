import Navbar from "@/components/Navbar";
import Paragraph from "@/components/typography/Paragraph";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, Link, usePathname } from "expo-router";
import { Suspense } from "react";
import { ActivityIndicator, Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppSetup } from "@/hooks/useAppSetup";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useThemeStore } from "@/store/themeStore";
import { layoutStyles } from "@/styles/layout";
import { typography } from "@/styles/typography";
import { SQLiteProvider } from "expo-sqlite";

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

    useAppSetup();

    return (
        <Suspense
            fallback={
                <View
                    style={[
                        layoutStyles.flexCol,
                        layoutStyles.centered,
                        layoutStyles.gapMd,
                    ]}
                >
                    <ActivityIndicator
                        size="large"
                        color={themeColors.primary}
                    />
                    <Paragraph style={typography.textMd}>Loading</Paragraph>
                </View>
            }
        >
            <SQLiteProvider databaseName={process.env.DB_NAME!} useSuspense>
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
                                iconName={
                                    iconName as extractIconTypes<IconType>
                                }
                                currPath={currPath}
                                Icon={Icon as IconType}
                            />
                        ))}
                    </View>
                </SafeAreaView>
            </SQLiteProvider>
        </Suspense>
    );
}
