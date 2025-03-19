
import { NextApiRequest, NextApiResponse } from 'next';
import { store, history } from '@/lib/store';

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
        if (actions.length) {
            history.push({ action: 'start' });
            actions.forEach(action => processAction(action));
            history.push({ action: 'commit' });
            console.log(history);
        }
        return res.json({ success: true, store, history });
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
            history.push({ action: 'set', key, value });
            store[key] = value;
            break;
        case 'delete':
            if (!key) throw new Error('Delete action missing key');
            history.push({ action: 'delete', key, value: store[key] });
            delete store[key];
            break;
        default:
            throw new Error(`Unknown action: ${action.action}`);
    }
}
