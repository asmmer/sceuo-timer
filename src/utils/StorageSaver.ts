export default class StorageSaver {
    static save = (key: string, value: unknown): void => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get = (key: string): object | null => {
        const loadingData = localStorage.getItem(key);

        if (loadingData) {
            return JSON.parse(loadingData);
        }

        return null;
    }

    static clear = (): void => {
        localStorage.clear();
    }
}