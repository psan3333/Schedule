import { useAppCache } from "@/store/cache";

export const useUserActivityData = () => {
    const getTodoStats = useAppCache((state) => state.getUserStats);
    const userDailyTarget = useAppCache((state) => state.userDailyTarget);
    const [plannedTodos, completedTodos] = getTodoStats();
};