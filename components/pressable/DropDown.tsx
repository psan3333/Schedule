import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";

import Feather from "@expo/vector-icons/Feather";
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from "react-native";
import Animated, {
    Easing,
    ReduceMotion,
    useAnimatedStyle,
    withTiming,
} from "react-native-reanimated";

import { typography } from "@/styles/typography";
import Paragraph from "../typography/Paragraph";
interface DropDownProps {
    data: string[];
    selected: string;
    setSelected: Dispatch<SetStateAction<any>>;
}

interface DropDownListProps {
    data: string[];
    onPress: (val: string) => void;
    dropdownListStyle: StyleProp<ViewStyle>;
    dropdownItemStyle: StyleProp<ViewStyle>;
}

const DropDownItem = ({
    onPress,
    children,
    style,
}: {
    onPress: () => void;
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}) => {
    const theme = useThemeColors();
    return (
        <Pressable
            style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? theme.button.pressed
                        : theme.button.default,
                },
                style,
            ]}
            onPress={() => onPress()}
        >
            {children}
        </Pressable>
    );
};

const DropDownList = ({
    data,
    onPress,
    dropdownListStyle,
    dropdownItemStyle,
}: DropDownListProps) => {
    return (
        <ScrollView style={[layoutStyles.aboveAll, dropdownListStyle]}>
            {data.map((val, index) => {
                const includeTopBorder = index > 0;
                return (
                    <DropDownItem
                        key={index}
                        onPress={() => onPress(val)}
                        style={[
                            dropdownItemStyle,
                            includeTopBorder && styles.dropdownItemDelimiter,
                        ]}
                    >
                        <Paragraph style={typography.textSm}>{val}</Paragraph>
                    </DropDownItem>
                );
            })}
        </ScrollView>
    );
};

const DropDown = ({ data, selected, setSelected }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const themeColors = useThemeColors();
    const arrowStyles = useAnimatedStyle(() => ({
        transform: [
            {
                rotateZ: withTiming(isOpen ? "90deg" : "0deg", {
                    duration: 200,
                    easing: Easing.inOut(
                        Easing.bezierFn(0.76, -0.17, 0.8, 0.47),
                    ),
                    reduceMotion: ReduceMotion.System,
                }),
            },
        ],
    }));

    const options = useMemo(
        () => (
            <DropDownList
                data={data.filter((val) => val !== selected)}
                onPress={(val: string) => {
                    setSelected(val);
                    setIsOpen(false);
                }}
                dropdownListStyle={[
                    layoutStyles.absolute,
                    layoutStyles.elementBelow,
                    styles.scrollStyles,
                    styles.dropdownListBorder,
                    { borderColor: themeColors.border },
                ]}
                dropdownItemStyle={[
                    layoutStyles.flexRow,
                    layoutStyles.alignCenter,
                    layoutStyles.spaceBetween,
                    layoutStyles.pdSm,
                    styles.item,
                    { borderColor: themeColors.border },
                ]}
            />
        ),
        [themeColors.border, data, selected, setSelected],
    );

    return (
        data.length > 0 && (
            <View>
                <DropDownItem
                    onPress={() => setIsOpen(!isOpen)}
                    style={[
                        layoutStyles.flexRow,
                        layoutStyles.alignCenter,
                        layoutStyles.spaceBetween,
                        layoutStyles.pdSm,
                        styles.item,
                        styles.selectBox,
                        { borderColor: themeColors.border },
                    ]}
                >
                    <Paragraph style={typography.textSm}>{selected}</Paragraph>
                    <Animated.View style={arrowStyles}>
                        <Feather
                            name="arrow-right"
                            size={24}
                            color={themeColors.text.primary}
                        />
                    </Animated.View>
                </DropDownItem>
                {isOpen && options}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    item: {
        width: 150,
        height: 48,
    },
    selectBox: {
        borderWidth: 2,
    },
    dropdownListBorder: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
    },
    dropdownItemDelimiter: {
        borderTopWidth: 2,
    },
    scrollStyles: {
        maxHeight: 150,
    },
});

export default DropDown;
