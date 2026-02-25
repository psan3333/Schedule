
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
            default: "hsl(156, 91%, 40%)",
            pressed: "hsl(156, 91%, 55%)",
            disabled: "hsla(0, 0%, 75%, 0.7)",
        },
        shadow: "hsla(0, 0%, 0%, 0.5)",
        error: "hsl(0, 63%, 64%)",
        success: "hsl(156, 91%, 37%)",
        warning: "hsl(49, 55%, 54%)",
    },
    dark: {
        background: "hsl(157, 0%, 82%)",
        surface: {
            0: "hsl(157, 0%, 96%)",
            1: "hsl(157, 0%, 100%)",
        },
        text: {
            primary: "hsla(120, 100%, 8%, 0.9)",
            secondary: "hsla(120, 100%, 8%, 0.5)",
            disabled: "hsla(0, 0%, 8%, 0.3)"
        },
        button: {
            default: "hsl(156, 91%, 40%)",
            pressed: "hsl(156, 91%, 55%)",
            disabled: "hsla(0, 0%, 75%, 0.7)",
        },
        shadow: "hsl(0, 0%, 75%, 0.25)",
        error: "hsl(0, 63%, 64%)",
        success: "hsl(156, 91%, 37%)",
        warning: "hsl(49, 55%, 54%)",
    },
}