import { Icon } from "@expo/vector-icons/build/createIconSet";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { Href, Link, usePathname } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Navbar from "@/components/Navbar";
import { useThemeColors } from "@/hooks/useThemeColors";
import { commonStyles } from "@/styles/commonStyles";

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
        <Link href={route as Href} style={commonStyles.flexCol} asChild>
            <Pressable>
                <Icon
                    name={iconName}
                    style={[
                        currPath === route
                            ? { color: theme.button.default }
                            : { color: theme.button.disabled },
                    ]}
                    size={24}
                />
                <Text
                    style={[
                        styles.tabItemText,
                        currPath === route
                            ? { color: theme.button.default }
                            : { color: theme.button.disabled },
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
    return (
        <SafeAreaView style={commonStyles.appContainer}>
            <Tabs>
                <Navbar />
                <TabSlot />
                <TabList
                    style={[
                        commonStyles.flexRow,
                        commonStyles.spaceAround,
                        commonStyles.alignCenter,
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
        opacity: 0.6,
        fontWeight: 300,
    },
});
