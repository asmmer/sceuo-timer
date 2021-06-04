import { AppActions, APP_ACTIONS } from "./actions";
import { Themes as Theme } from "common/interfaces";
import StorageSaver from "utils/StorageSaver";

type TTheme = Theme | object;

interface IInitialState {
    theme: TTheme
}

export const THEME_KEY = "theme";

const getCurrentTheme = (): TTheme => {
    return StorageSaver.get(THEME_KEY) || Theme.Light;
}

const initialState: IInitialState = {
    theme: getCurrentTheme()
}

export const appReducer = (state = initialState, { type }: AppActions) => {
    switch (type) {
        case APP_ACTIONS.TOGGLE_THEME: {
            return {
                theme: (state.theme === Theme.Light) ? Theme.Dark : Theme.Light
            }
        }
        default: {
            return state;
        }
    }
}