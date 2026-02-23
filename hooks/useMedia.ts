import { useMediaQuery } from "./useMediaQuery";

export const useMedia = () => {
    let medias = {
        lg: useMediaQuery([{ query: "minWidth", value: 1024 }]),
        md: useMediaQuery([{ query: "minWidth", value: 768 }]),
        sm: useMediaQuery([{ query: "minWidth", value: 512 }]),
    };

    return medias;
}