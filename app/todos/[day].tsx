import { useAppCache } from "@/store/cache";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TodoDescPage = () => {
    const { day } = useLocalSearchParams<{ day: string }>();
    console.log(day);
    const getTodosByDay = useAppCache((state) => state.getTodosByDay);

    const notCompletedTodos = getTodosByDay("planned", day);
    const finishedTodos = getTodosByDay("finished", day);
    return (
        <View>
            <Text>TodoPage</Text>
        </View>
    );
};

export default TodoDescPage;
