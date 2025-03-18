

import { NextApiRequest, NextApiResponse } from 'next';
import { store, setStore, snapshots } from '@/lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    if (snapshots.length > 0) {
        setStore(snapshots.pop());
        return res.json({ success: true, store });
    }

    return res.status(400).json({ error: 'No transaction to rollback' });
}
