

import { NextApiRequest, NextApiResponse } from 'next';
import { store, snapshots } from '@/lib/store';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    snapshots.push({ ...store });
    return res.json({ success: true, message: 'Transaction started' });
}
