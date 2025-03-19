

import { NextApiRequest, NextApiResponse } from 'next';
import { store, history } from '@/lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'GET') {
        return res.json({ store, history });
    }

    return res.status(400).json({ error: 'Not allowed' });
}
