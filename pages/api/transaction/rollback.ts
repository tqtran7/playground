

import { NextApiRequest, NextApiResponse } from 'next';
import { store, history, prisma } from '@/lib/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    console.log('history length:', history.length);

    // pop history until we reach previous commit block
    let ids = [];
    if (history.length > 0) {
        let action = history.pop();
        ids.push(action.id);
        while (action?.action !== 'start') {
            undoAction(action);
            action = history.pop();
            ids.push(action.id);
        }

        // remove these rows from the database
        await prisma.action.deleteMany({ where: { id: { in: ids }}});
        return res.json({ success: true, store, history });
    }

    return res.status(400).json({ error: 'No transaction to rollback' });
}

function undoAction(action: any) {
    const { key, value } = action;
    console.log(`undoing ${action.action} ${key}:${value}`);
    switch (action.action) {
        case 'set': delete store[key]; break;
        case 'delete': store[key] = value; break;
    }
}
