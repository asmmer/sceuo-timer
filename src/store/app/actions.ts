export enum APP_ACTIONS {
    TOGGLE_THEME
}

export const toggleTheme = (): ToggleThemeAction => ({
    type: APP_ACTIONS.TOGGLE_THEME
});

export interface ToggleThemeAction {
    type: typeof APP_ACTIONS.TOGGLE_THEME;
}

export type AppActions = ToggleThemeAction;