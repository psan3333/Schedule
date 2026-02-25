import { useTodosStore } from "@/store/todosStore";

export const useUserActivityData = () => {
    const getTodoStats = useTodosStore((state) => state.getStats);
    const userDailyTarget = useTodosStore((state) => state.userDailyTarget);
    const [plannedTodos, completedTodos] = getTodoStats();
};