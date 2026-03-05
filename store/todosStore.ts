import { TZDate } from "@date-fns/tz";
import { addDays, compareAsc, format, isValid, parse, subDays } from "date-fns";
import { randomUUID } from "expo-crypto";
import { create } from 'zustand';

import { TimePeriod, Todo } from "@/constants/types";

type TodoType = "planned" | "finished";

type TodosStore = {
    // storage format: day -> Todo[] planned/completed on that day
    userDailyTarget: number;
    setDailyTarget: (target: number) => void;

    cachedTodos: Record<TimePeriod, Record<TodoType, Record<string, Todo[]>[]>>
    plannedTodosStore: Record<string, Todo[]>;
    finishedTodosStore: Record<string, Todo[]>;
    addTodo: (todo: Todo) => void;
    deleteTodo: (todo: Todo) => void;
    setTodoToFinished: (todo: Todo) => void;
    getTodosByDay: (todoType: TodoType, day: string) => Todo[];
    getTodosByPeriod: (todoType: TodoType, from: Date, to: Date) => Record<string, Todo[]>[];

    getUserStats: () => [number, number];
    getJSONFromStore: () => string;
};

const DAY_ID_FORMAT = 'yy-MM-dd';

export const useTodosStore = create<TodosStore>((set, get) => ({
    cachedTodos: {
        'day': {
            "planned": [],
            "finished": [],
        },
        'week': {
            "planned": [],
            "finished": [],
        },
        'month': {
            "planned": [],
            "finished": [],
        },
        'year': {
            "planned": [],
            "finished": [],
        },
    },
    userDailyTarget: 4,
    plannedTodosStore: {},
    finishedTodosStore: {},
    setDailyTarget: (target) => set({ userDailyTarget: target }),
    getUserStats: () => {
        const { plannedTodosStore, finishedTodosStore } = get();
        let plannedCnt = 0;
        let finishedCnt = 0;

        for (let timestamp in plannedTodosStore) {
            plannedCnt += plannedTodosStore[timestamp].length;
        }

        for (let timestamp in finishedTodosStore) {
            finishedCnt += finishedTodosStore[timestamp].length;
        }
        return [plannedCnt, finishedCnt];
    },
    addTodo: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(), DAY_ID_FORMAT);
        return {
            plannedTodosStore: {
                ...state.plannedTodosStore,
                [todoTimestamp]: [...state.plannedTodosStore[todoTimestamp], {
                    ...todo,
                    id: randomUUID(),
                    timestamp: new TZDate().toString(),
                }],
            },
        };
    }),
    deleteTodo: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(todo.timestamp), DAY_ID_FORMAT);
        return {
            plannedTodosStore: {
                ...state.plannedTodosStore,
                [todoTimestamp]: state.plannedTodosStore[todoTimestamp].filter(t => t.id !== todo.id),
            }
        };
    }),
    setTodoToFinished: (todo) => set((state) => {
        const todoTimestamp = format(new TZDate(todo.timestamp), DAY_ID_FORMAT);
        state.deleteTodo(todo);
        return {
            finishedTodosStore: {
                ...state.finishedTodosStore,
                [todoTimestamp]: [...state.finishedTodosStore[todoTimestamp], {
                    ...todo,
                    timestamp: new TZDate().toString(),
                }],
            }
        };
    }),
    getTodosByPeriod: (todoType, from, to) => {
        const { finishedTodosStore, plannedTodosStore } = get();
        let todos = plannedTodosStore;
        if (todoType === "finished") {
            todos = finishedTodosStore;
        }

        const todosByDay: Record<string, Todo[]>[] = [];
        from = subDays(from, from.getDay());
        to = addDays(to, 6 - to.getDay());
        for (let timestamp = from; compareAsc(timestamp, to) <= 0; timestamp = addDays(timestamp, 1)) {
            const dayToCheck = format(timestamp, DAY_ID_FORMAT);
            if (!(dayToCheck in todos)) {
                todosByDay.push({
                    [dayToCheck]: [],
                })
            } else {
                todosByDay.push({
                    [dayToCheck]: todos[dayToCheck],
                });
            }
        }
        return todosByDay;
    },
    getTodosByDay: (todoType, day) => {
        let { finishedTodosStore, plannedTodosStore } = get();
        let todos = plannedTodosStore;
        if (todoType === "finished") {
            todos = finishedTodosStore;
        }

        let parsedDate = parse(day, DAY_ID_FORMAT, new TZDate());

        if (!isValid(parsedDate))
            throw new Error(`todosStore: getTodosByDay - day mush be in '${DAY_ID_FORMAT}' format.`)

        return todos[day];
    },
    getJSONFromStore: () => JSON.stringify(get()),
}));
