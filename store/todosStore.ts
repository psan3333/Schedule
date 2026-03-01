import { Todo } from "@/constants/types";
import { TZDate } from "@date-fns/tz";
import { addDays, compareAsc, format } from "date-fns";
import { randomUUID } from "expo-crypto";
import { create } from 'zustand';

type TodosStore = {
    // storage format: day -> Todo[] planned/completed on that day
    userDailyTarget: number;
    setDailyTarget: (target: number) => void;

    plannedTodos: Record<string, Todo[]>;
    addTodo: (todo: Todo) => void;
    deleteTodo: (todo: Todo) => void;
    getTodosByPeriod: (from: Date, to: Date) => Record<string, Todo[]>;
    setTodoToFinished: (todo: Todo) => void;

    finishedTodos: Record<string, Todo[]>;
    getFinishedTodosByPeriod: (from: Date, to: Date) => Record<string, Todo[]>;

    getStats: () => [number, number];
    getJSONStore: () => string;
};

export const useTodosStore = create<TodosStore>((set, get) => ({
    userDailyTarget: 4,
    plannedTodos: {},
    finishedTodos: {},
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
        const todoTimestamp = format(new TZDate(), 'MM-dd-yy');
        return {
            plannedTodos: {
                ...state.plannedTodos,
                [todoTimestamp]: [...state.plannedTodos[todoTimestamp], {
                    ...todo,
                    id: randomUUID(),
                    timestamp: new TZDate().toString(),
                }],
            },
        };
    }),
    deleteTodo: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(todo.timestamp), 'MM-dd-yy');
        return {
            plannedTodos: {
                ...state.plannedTodos,
                [todoTimestamp]: state.plannedTodos[todoTimestamp].filter(t => t.id !== todo.id),
            }
        };
    }),
    setTodoToFinished: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(todo.timestamp), 'MM-dd-yy');
        state.deleteTodo(todo);
        return {
            finishedTodos: {
                ...state.finishedTodos,
                [todoTimestamp]: [...state.finishedTodos[todoTimestamp], {
                    ...todo,
                    timestamp: new TZDate().toString(),
                }],
            }
        };
    }),
    getTodosByPeriod: (from, to) => {
        const { plannedTodos } = get();
        const todosByDay: Record<string, Todo[]> = {};
        for (let timestamp = from; compareAsc(timestamp, to) <= 0; timestamp = addDays(timestamp, 1)) {
            const dayToCheck = format(timestamp, 'MM-dd-yy');
            if (!(dayToCheck in plannedTodos)) {
                todosByDay[dayToCheck] = [];
            } else {
                todosByDay[dayToCheck] = plannedTodos[dayToCheck];
            }
        }
        return todosByDay;
    },
    getFinishedTodosByPeriod: (from, to) => {
        let { finishedTodos } = get();
        let todosByDay: Record<string, Todo[]> = {};
        for (let currDate = from; compareAsc(currDate, to) <= 0; currDate = addDays(currDate, 1)) {
            let dayFormat = format(currDate, 'MM-dd-yy');
            if (!(dayFormat in finishedTodos)) {
                todosByDay[dayFormat] = [];
            } else {
                todosByDay[dayFormat] = finishedTodos[dayFormat];
            }
        }
        return todosByDay;
    },
    getJSONStore: () => JSON.stringify(get())
}));
