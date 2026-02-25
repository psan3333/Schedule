import { useThemeColors } from "@/hooks/useThemeColors";
import React, { SetStateAction, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface DropDownProps {
    data: string[];
    selected: string;
    setSelected: React.Dispatch<SetStateAction<any>>;
}

const DropDownItem = ({
    value,
    setSelected,
}: Omit<DropDownProps, "data" | "selected"> & {
    value: string;
}) => {
    return (
        <Text
            key={`${Math.random() * 1000000}`}
            style={styles.item}
            onPress={() => setSelected(value)}
        >
            {value}
        </Text>
    );
};

const DropDown = ({ data, selected, setSelected }: DropDownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useThemeColors();

    return (
        data.length > 0 && (
            <View style={styles.item}>
                <Pressable
                    style={({ pressed }) => [
                        styles.item,
                        {
                            backgroundColor: pressed
                                ? theme.button.pressed
                                : theme.button.default,
                        },
                    ]}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text>{selected}</Text>
                </Pressable>
                {isOpen && (
                    <ScrollView>
                        {data.map(
                            (val, index) =>
                                val !== selected && (
                                    <DropDownItem
                                        key={index}
                                        value={selected}
                                        setSelected={setSelected}
                                    />
                                ),
                        )}
                    </ScrollView>
                )}
            </View>
        )
    );
};

const styles = StyleSheet.create({
    item: {
        width: 200,
        height: 54,
        borderStartWidth: 4,
        borderEndWidth: 4,
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
});

export default DropDown;
