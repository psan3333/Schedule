import { Todo } from "@/constants/types";
import { TZDate } from "@date-fns/tz";
import { addDays, compareAsc, format } from "date-fns";
import { randomUUID } from "expo-crypto";
import { create } from 'zustand';

type TodosStore = {
    /*
        storage format:
        [uniqueDay]: Todo[] - store array of Todo for concrete day
    */
    plannedTodos: Record<string, Todo[]>;
    finishedTodos: Record<string, Todo[]>;
    userDailyTarget: number;
    setDailyTarget: (target: number) => void;
    getStats: () => [number, number];
    addTodo: (todo: Todo) => void;
    deleteTodo: (todo: Todo) => void;
    getTodos: (from: Date, to: Date) => Todo[][];
    getFinishedTodos: (from: Date, to: Date) => Todo[][];
    getJSONStats: () => string;
};

export const useTodosStore = create<TodosStore>((set, get) => ({
    plannedTodos: {},
    finishedTodos: {},
    userDailyTarget: 0,
    setDailyTarget: (target) => set({ userDailyTarget: target }),
    getStats: () => {
        // linting was disabled for gathering user stats
        const { plannedTodos, finishedTodos: completedTodos } = get();
        let plannedCnt = 0;
        let completedCnt = 0;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (let _key in plannedTodos) {
            plannedCnt++;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (let _key in completedTodos) {
            completedCnt++;
        }
        return [plannedCnt, completedCnt];
    },
    addTodo: (todo) => set((state) => {
        let currDay = format(new TZDate(), 'MM-dd-yy');
        return {
            plannedTodos: {
                ...state.plannedTodos,
                [currDay]: [...state.plannedTodos[currDay], {
                    ...todo,
                    id: randomUUID(),
                    timestamp: new TZDate().toString(),
                }],
            },
        };
    }),
    deleteTodo: (todo) => set((state) => {
        let todoTimestamp = format(new TZDate(todo.timestamp), 'MM-dd-yy');
        return {
            plannedTodos: {
                ...state.plannedTodos,
                [todoTimestamp]: state.plannedTodos[todoTimestamp].filter(t => t.id !== todo.id),
            }
        };
    }),
    getTodos: (from, to) => {
        let { plannedTodos } = get();
        let todosByDay = [];
        for (let currDate = from; compareAsc(currDate, to) <= 0; currDate = addDays(currDate, 1)) {
            let dayFormat = format(currDate, 'MM-dd-yy');
            todosByDay.push(plannedTodos[dayFormat]);
        }
        return todosByDay;
    },
    getFinishedTodos: (from, to) => {
        let { finishedTodos: completedTodos } = get();
        let todosByDay = [];
        for (let currDate = from; compareAsc(currDate, to) <= 0; currDate = addDays(currDate, 1)) {
            let dayFormat = format(currDate, 'MM-dd-yy');
            if (!(dayFormat in completedTodos)) continue;
            todosByDay.push(completedTodos[dayFormat]);
        }
        return todosByDay;
    },
    getJSONStats: () => JSON.stringify(get())
}));
