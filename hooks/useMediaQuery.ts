import { useWindowDimensions } from "react-native";

type MediaQueryType = "minWidth" | "maxWidth" | "minHeight" | "maxHeight";
type MediaQuery = Record<MediaQueryType, number>;

export const useMediaQuery = (query: MediaQuery) => {
    const { width, height } = useWindowDimensions();

    const checkIfQuerySatisfies = (key: MediaQueryType, value: number) => {
        switch (key) {
            case "minWidth":
                return value >= width;
            case "maxWidth":
                return value <= width;
            case "minHeight":
                return value >= height;
            case "maxHeight":
                return value <= height;
            default:
                throw new Error("useMediaQuery: Wrong ");
        }
    }

    let result: boolean = true;
    for (let key in query) {
        // key is guarantied to have QueryType from hook parameter type
        result &&= checkIfQuerySatisfies(key as MediaQueryType, query[key as MediaQueryType]);
    }

    return result;
}