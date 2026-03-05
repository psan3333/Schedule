import { Image, ImageSource, ImageStyle } from "expo-image";
import React from "react";
import { GestureResponderEvent, Pressable, StyleProp } from "react-native";

interface PressableImageProps {
    source: ImageSource;
    onPress: (event: GestureResponderEvent) => void;
    style: StyleProp<ImageStyle>;
}

const PressableImage = ({ source, onPress, style }: PressableImageProps) => {
    return (
        <Pressable onPress={onPress}>
            <Image source={source} style={style} />
        </Pressable>
    );
};

export default PressableImage;
