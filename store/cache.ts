import { create } from 'zustand';

interface CacheTools {
    setItem: (key: string, value: any) => void;
    getItem: (key: string) => any;
    cacheItems: Record<string, any>;
}

export const useAppCache = create<CacheTools>((set, get) => ({
    setItem: (key, value) => set((state) => ({
        ...state,
        cacheItems: {
            ...state.cacheItems,
            [key]: value,
        }
    })),
    getItem: (key) => {
        const { cacheItems } = get();
        if (key in cacheItems) return cacheItems[key];
        return undefined;
    },
    cacheItems: {}
}));
