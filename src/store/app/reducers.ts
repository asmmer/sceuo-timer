import { APP_ACTIONS } from "./actions";
import { Themes as Theme } from "../../components/constants/interfaces";
import StorageSaver from "../../utils/StorageSaver";

interface IInitialState {
    theme: Theme | object;
}

export const THEME_KEY = "theme";

const getCurrentTheme = (): Theme | object => {
    return StorageSaver.get(THEME_KEY) || Theme.Light;
}

const initialState: IInitialState = {
    theme: getCurrentTheme()
}

export const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
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