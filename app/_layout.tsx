import { Icon } from "@expo/vector-icons/build/createIconSet";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Href, Link, usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Navbar from "@/components/Navbar";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";

type IconType = typeof Feather & typeof MaterialIcons;
type extractIconType<Type> = Type extends Icon<infer X, infer Y> ? X : never;

const tabRoutes = [
    {
        route: "/",
        name: "index",
        text: "Home",
        iconName: "home",
        Icon: Feather,
    },
    {
        route: "/todos",
        name: "todos/index",
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
    iconName: extractIconType<IconType>;
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
                <Text
                    style={[
                        styles.tabItemText,
                        currPath === route
                            ? { color: theme.primary }
                            : { color: theme.text.disabled },
                    ]}
                >
                    {text}
                </Text>
            </Pressable>
        </Link>
    );
}

export default function RootLayout() {
    const currPath = usePathname();
    const colors = useThemeColors();
    useAppTheme();
    return (
        <SafeAreaView
            style={[
                layoutStyles.flexCol,
                layoutStyles.justifyCenter,
                layoutStyles.hFull,
                { backgroundColor: colors.surface[0] },
            ]}
        >
            <Tabs>
                <Navbar />
                <TabSlot />
                <TabList
                    style={[
                        layoutStyles.flexRow,
                        layoutStyles.spaceAround,
                        layoutStyles.alignCenter,
                    ]}
                >
                    {tabRoutes.map(({ route, name, text, iconName, Icon }) => (
                        <TabTrigger
                            key={`${Math.random() * 100000000}`}
                            name={name}
                            href={route as Href}
                        >
                            <TabBarButton
                                text={text}
                                route={route}
                                iconName={iconName as extractIconType<IconType>}
                                currPath={currPath}
                                Icon={Icon as IconType}
                            />
                        </TabTrigger>
                    ))}
                </TabList>
            </Tabs>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tabItemText: {
        fontSize: 12,
        fontWeight: 500,
    },
});
