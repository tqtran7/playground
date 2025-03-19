

import { NextApiRequest, NextApiResponse } from 'next';
import { store, history, populate } from '@/lib/store';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        if (history.length === 0) await populate();
        return res.json({ store, history });
    }

    return res.status(400).json({ error: 'Not allowed' });
}
