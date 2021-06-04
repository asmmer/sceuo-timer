import rootReducer from 'store/reducers';

export type TRootState = ReturnType<typeof rootReducer>

/**
 * Themes for application.
 */
 export enum Themes {
    Light = 'light',
    Dark = 'dark'
}