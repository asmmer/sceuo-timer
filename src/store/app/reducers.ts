import { APP_ACTIONS } from "./actions";
import { Themes } from "../../components/constants/interfaces";
import StorageSaver from "../../helpers/storage-saver";

interface IInitialState {
    theme: Themes;
}

export const THEME_KEY = "theme";

const getCurrentTheme = (): Themes => {
    let currentTheme: any = StorageSaver.load(THEME_KEY);

    if (currentTheme === null) {
        currentTheme = Themes.Light;

        StorageSaver.save(THEME_KEY, currentTheme);
    }

    return currentTheme;
}

const initialState: IInitialState = {
    theme: getCurrentTheme()
}

export const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case APP_ACTIONS.TOGGLE_THEME: {
            return {
                theme: (state.theme === Themes.Light) ? Themes.Dark : Themes.Light
            }
        }
        default: {
            return state;
        }
    }
}