
// In-memory keystore

export let store: Record<string, any> = {};
export let snapshots: Record<string, any>[] = [];
export function setStore(newStore: Record<string, any> | undefined) {
    if (newStore) {
        store = {};
        store = newStore;
    }
}
