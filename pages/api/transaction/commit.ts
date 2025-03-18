
import { NextApiRequest, NextApiResponse } from 'next';
import { store, snapshots } from '@/lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { actions } = req.body;

    if (!Array.isArray(actions)) {
        return res.status(400).json({ error: 'Actions must be an array' });
    }

    try {
        // Take a snapshot after each commit
        // If any action fails validation, they all fail
        actions.forEach(action => processAction(action));
        snapshots.push({ ...store });
        return res.json({ success: true, store });
    } 
    
    catch (error: any) {
        return res.status(400).json({ error: error.message });
    }
}

function processAction(action: any) {
    const { key, value } = action;
    switch (action.action) {
        case 'set':
            if (!key || !value) throw new Error('Set action missing key and value');
            store[key] = value;
            break;
        case 'delete':
            if (!key) throw new Error('Delete action missing key');
            delete store[key];
            break;
        default:
            throw new Error(`Unknown action: ${action.action}`);
    }
}
