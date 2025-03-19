

import { NextApiRequest, NextApiResponse } from 'next';
import { store, history } from '@/lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // pop history until we reach previous commit block
    if (history.length > 0) {
        let action = history.pop();
        while (action?.action !== 'start') {
            undoAction(action);
            action = history.pop();
        }

        return res.json({ success: true, store, history });
    }

    return res.status(400).json({ error: 'No transaction to rollback' });
}

function undoAction(action: any) {
    const { key, value } = action;
    switch (action.action) {
        case 'set': delete store[key]; break;
        case 'delete': store[key] = value; break;
    }
}
