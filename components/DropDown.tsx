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

import { useBoxShadow } from "@/hooks/useBoxShadow";
import Paragraph from "./typography/Paragraph";
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
        <ScrollView style={dropdownListStyle}>
            {data.map((val, index) => {
                const includeTopBorder = index > 0;
                return (
                    <DropDownItem
                        key={index}
                        onPress={() => onPress(val)}
                        style={[
                            dropdownItemStyle,
                            includeTopBorder && styles.dropItemBorder,
                        ]}
                    >
                        <Paragraph>{val}</Paragraph>
                    </DropDownItem>
                );
            })}
        </ScrollView>
    );
};

const DropDown = ({ data, selected, setSelected }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const colors = useThemeColors();
    const shadowStyles = useBoxShadow();
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
                        styles.selectBorder,
                        shadowStyles.cardShadow,
                    ]}
                >
                    <Paragraph>{selected}</Paragraph>
                    <Animated.View style={arrowStyles}>
                        <Feather
                            name="arrow-right"
                            size={24}
                            color={colors.text.primary}
                        />
                    </Animated.View>
                </DropDownItem>
                {isOpen && (
                    <DropDownList
                        data={data.filter((val) => val !== selected)}
                        onPress={(val: string) => {
                            setSelected(val);
                            setIsOpen(false);
                        }}
                        dropdownListStyle={[
                            layoutStyles.absolute,
                            layoutStyles.elementBelow,
                            layoutStyles.zMax,
                            styles.scrollStyles,
                            styles.dropdownBorder,
                            shadowStyles.cardShadow,
                        ]}
                        dropdownItemStyle={[
                            layoutStyles.flexRow,
                            layoutStyles.alignCenter,
                            layoutStyles.spaceBetween,
                            layoutStyles.pdSm,
                            styles.item,
                        ]}
                    />
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
