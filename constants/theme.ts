
// Intuition behind naming:
// background: color for main screen background
// surface: for UI layers on top of background
// primary: main brand color
// secondary: importance level lower than primary

export const Colors = {
    light: {
        surface: {
            0: "hsl(157, 0%, 84%)",
            1: "hsl(157, 0%, 88%)",
            2: "hsl(157, 0%, 92%)",
        },
        text: {
            primary: "hsla(120, 100%, 8%, 0.9)",
            secondary: "hsla(120, 100%, 8%, 0.5)",
            disabled: "hsla(0, 0%, 8%, 0.3)"
        },
        button: {
            default: "hsl(156, 0%, 90%)",
            pressed: "hsl(156, 0%, 80%)",
            disabled: "hsla(156, 0%, 75%, 0.7)",
        },
        primary: "hsl(156, 91%, 37%)",
        shadow: "hsla(0, 0%, 0%, 0.5)",
        error: "hsl(0, 63%, 64%)",
        success: "hsl(156, 91%, 37%)",
        warning: "hsl(49, 55%, 54%)",
    },
    dark: {
        surface: {
            0: "hsl(157, 0%, 84%)",
            1: "hsl(157, 0%, 88%)",
            2: "hsl(157, 0%, 92%)",
        },
        text: {
            primary: "hsla(120, 100%, 8%, 0.9)",
            secondary: "hsla(120, 100%, 8%, 0.5)",
            disabled: "hsla(0, 0%, 8%, 0.3)"
        },
        button: {
            default: "hsl(156, 0%, 90%)",
            pressed: "hsl(156, 0%, 80%)",
            disabled: "hsla(156, 0%, 75%, 0.7)",
        },
        primary: "hsl(143, 92%, 29%)",
        shadow: "hsla(0, 0%, 0%, 0.5)",
        error: "hsl(0, 63%, 64%)",
        success: "hsl(156, 91%, 37%)",
        warning: "hsl(49, 55%, 54%)",
    },
}