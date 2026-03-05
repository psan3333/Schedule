import React from "react";
import { View, ViewProps } from "react-native";

const GridRow = (props: ViewProps) => {
    return <View {...props}>{props.children}</View>;
};

export default GridRow;
