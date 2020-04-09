export default class StorageSaver {
    public static save = (key: string, value: object): void => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static load = (key: string): object | null => {
        const loadingData = localStorage.getItem(key);

        if (loadingData) {
            return JSON.parse(loadingData);
        }

        return null;
    }

    public static clear = (): void => {
        localStorage.clear();
    }
}