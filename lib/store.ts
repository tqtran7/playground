import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface Action {
  id?: string;
  action: string;
  key?: string;
  value?: any;
}

// In-memory keystore
// Initialize once on server start
export let store: Record<string, any> = {};

// Keep track of actions so we can rollback
export let history: Action[] = [];

export async function populate() {
  try {

    console.log('Populating data from db...');
    const query = { orderBy: { created: "asc" } };
    const results = await prisma.action.findMany(query);
    
    // regenerate the history
    history = results.map((item : any) => { 
        const { id, action, key, value } = item;
        return { id, action, key, value };
    });

    // regenerate the keystore from history
    console.log(history);
    history.forEach(action => {
        const { key, value } = action;
        switch(action.action) {
            case 'set': store[key] = value; break;
            case 'delete': delete store[key]; break;
        }
    });
  } catch (error) {
    console.error("Unable to populate store!");
  }
}

// Auto populate on server-start
populate();
