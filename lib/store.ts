
export interface Action {
    action: string;
    key?: string;
    value?: any;
}

// In-memory keystore
// Initialize once on server start
export let store: Record<string, any> = {};

// Keep track of actions so we can rollback
export let history : Action[] = [];
