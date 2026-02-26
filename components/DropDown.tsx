import { useBoxShadow } from "@/hooks/useBoxShadow";
import { useThemeColors } from "@/hooks/useThemeColors";
import { layoutStyles } from "@/styles/layout";

import Feather from "@expo/vector-icons/Feather";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
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

import Paragraph from "./typography/Paragraph";
interface DropDownProps {
    data: string[];
    selected: string;
    setSelected: Dispatch<SetStateAction<any>>;
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

const DropDown = ({ data, selected, setSelected }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const colors = useThemeColors();
    const shadow = useBoxShadow(5);

    const animatedStyles = useAnimatedStyle(() => ({
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

    const dropDownSelectStyle = [
        layoutStyles.flexRow,
        layoutStyles.alignCenter,
        layoutStyles.spaceBetween,
        layoutStyles.pdSm,
        styles.item,
        styles.selectBorder,
        shadow.cardShadow,
    ];

    const dropDownItemsStyle = [
        layoutStyles.absolute,
        layoutStyles.elementBelow,
        styles.scrollStyles,
        shadow.cardShadow,
        styles.dropdownBorder,
    ];

    const itemStyle = [
        ...dropDownSelectStyle.slice(0, dropDownSelectStyle.length - 2),
    ];

    return (
        data.length > 0 && (
            <View>
                <DropDownItem
                    onPress={() => setIsOpen(!isOpen)}
                    style={dropDownSelectStyle}
                >
                    <Paragraph>{selected}</Paragraph>
                    <Animated.View style={animatedStyles}>
                        <Feather
                            name="arrow-right"
                            size={24}
                            color={colors.text.primary}
                        />
                    </Animated.View>
                </DropDownItem>
                {isOpen && (
                    <ScrollView style={dropDownItemsStyle}>
                        {data.map((val, index) => {
                            return (
                                val !== selected && (
                                    <DropDownItem
                                        key={index}
                                        onPress={() => {
                                            setSelected(val);
                                            setIsOpen(false);
                                        }}
                                        style={[
                                            itemStyle,
                                            index > 0 && styles.dropItemBorder,
                                        ]}
                                    >
                                        <Paragraph>{val}</Paragraph>
                                    </DropDownItem>
                                )
                            );
                        })}
                    </ScrollView>
                )}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    item: {
        width: 150,
        height: 48,
    },
    selectBorder: {
        borderWidth: 2,
    },
    dropdownBorder: {
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderBottomWidth: 2,
    },
    dropItemBorder: {
        borderTopWidth: 2,
    },
    scrollStyles: {
        maxHeight: 150,
    },
});

export default DropDown;
