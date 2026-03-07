import { TZDate } from "@date-fns/tz";
import { addDays, compareAsc, format, isValid, parse, subDays } from "date-fns";
import { randomUUID } from "expo-crypto";
import { create } from 'zustand';

import { TimePeriod, Todo, TodoStoreCache, TodoType } from "@/constants/types";
import { getPeriodLookup } from "@/utils/utils";
import * as SecureStore from 'expo-secure-store';


type TodosStore = {
    // storage format: day -> Todo[] planned/completed on that day
    userDailyTarget: number;
    setDailyTarget: (target: number) => void;

    // TODO: Add cached variants for each query
    cachedTodos: TodoStoreCache;
    plannedTodosStore: Record<string, Todo[]>;
    finishedTodosStore: Record<string, Todo[]>;
    addTodo: (todo: Todo) => void;
    deleteTodo: (todo: Todo) => void;
    setTodoToFinished: (todo: Todo) => void;
    getTodosByDay: (todoType: TodoType, day: string) => Todo[];
    getTodosByPeriod: (todoType: TodoType, period: TimePeriod) => Record<string, Todo[]>[];
    setCache: (store: TodosStore) => void;

    getUserStats: () => [number, number];
    stringifyTodosStore: () => string;
};

const DAY_ID_FORMAT = "yy-MM-dd";

export const useTodosStore = create<TodosStore>((set, get, store) => {
    let storeManagementTools: TodosStore = {
        cachedTodos: {
            week: {
                planned: [],
                finished: [],
            },
            month: {
                planned: [],
                finished: [],
            },
        },
        userDailyTarget: 4,
        plannedTodosStore: {},
        finishedTodosStore: {},
        setCache: (store) => {
            // TODO: Migrate to Redux Toolkit
            store.setState(((state) => ({
                ...state,
                cachedTodos: {
                    week: {
                        planned: state.getTodosByPeriod("planned", "week"),
                        finished: state.getTodosByPeriod("finished", "week"),
                    },
                    month: {
                        planned: state.getTodosByPeriod("planned", "month"),
                        finished: state.getTodosByPeriod("finished", "month"),
                    }
                }
            })));
        },
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
        addTodo: (todo) => {
            store.setState((state) => {
                state.setCache();
            })
            store.setState((state) => {
                const todoTimestamp = format(new TZDate(), DAY_ID_FORMAT);
                return {
                    plannedTodosStore: {
                        ...state.plannedTodosStore,
                        [todoTimestamp]: [...state.plannedTodosStore[todoTimestamp], {
                            ...todo,
                            id: randomUUID(),
                            changedAt: new TZDate().toString(),
                        }],
                    },
                };
            });

        },
        deleteTodo: (todo) => {
            set((state) => {
                const todoTimestamp = format(new TZDate(todo.changedAt), DAY_ID_FORMAT);
                return {
                    plannedTodosStore: {
                        ...state.plannedTodosStore,
                        [todoTimestamp]: state.plannedTodosStore[todoTimestamp].filter(t => t.id !== todo.id),
                    }
                };
            });
        },
        setTodoToFinished: (todo) => set((state) => {
            const todoTimestamp = format(new TZDate(todo.changedAt), DAY_ID_FORMAT);
            state.deleteTodo(todo);
            return {
                finishedTodosStore: {
                    ...state.finishedTodosStore,
                    [todoTimestamp]: [...state.finishedTodosStore[todoTimestamp], {
                        ...todo,
                        changedAt: new TZDate().toString(),
                    }],
                }
            };
        }),
        getTodosByPeriod: (todoType, period) => {
            const { finishedTodosStore, plannedTodosStore } = get();
            let todos = plannedTodosStore;
            if (todoType === "finished") {
                todos = finishedTodosStore;
            }
            let endLookupDate = new TZDate();
            let startLookupDate = getPeriodLookup(endLookupDate, period);

            const todosByDay: Record<string, Todo[]>[] = [];
            startLookupDate = subDays(startLookupDate, startLookupDate.getDay());
            startLookupDate = addDays(startLookupDate, 6 - startLookupDate.getDay());
            for (let timestamp = startLookupDate; compareAsc(timestamp, startLookupDate) <= 0; timestamp = addDays(timestamp, 1)) {
                const dayToCheck = format(timestamp, DAY_ID_FORMAT);
                if (!(dayToCheck in todos)) {
                    todosByDay.push({
                        [dayToCheck]: [],
                    });
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

            return todos[day] || [];
        },
        stringifyTodosStore: () => {
            let { plannedTodosStore, finishedTodosStore, userDailyTarget } = get();
            return JSON.stringify({
                userDailyTarget,
                plannedTodosStore,
                finishedTodosStore
            });
        },
    };

    let storeFromAsyncPhoneStore = SecureStore.getItem("todoStore");
    if (storeFromAsyncPhoneStore) {
        const storeFromJSONString: TodosStore = JSON.parse(storeFromAsyncPhoneStore);
        storeManagementTools = {
            ...storeManagementTools,
            userDailyTarget: storeFromJSONString.userDailyTarget,
            plannedTodosStore: storeFromJSONString.plannedTodosStore,
            finishedTodosStore: storeFromJSONString.finishedTodosStore,
        }
    }

    storeManagementTools.setCache();

    return storeManagementTools;
});
