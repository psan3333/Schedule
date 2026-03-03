import Navbar from "@/components/Navbar";
import { Icon } from "@expo/vector-icons/build/createIconSet";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, Link, Slot, usePathname } from "expo-router";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Paragraph from "@/components/typography/Paragraph";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";

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
    const colors = useThemeColors();
    useAppTheme();
    return (
        <SafeAreaView
            style={[
                layoutStyles.flexCol,
                layoutStyles.hFull,
                layoutStyles.spaceBetween,
                { backgroundColor: colors.surface[0] },
            ]}
        >
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
    );
}
