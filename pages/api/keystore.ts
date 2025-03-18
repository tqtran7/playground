
import { NextApiRequest, NextApiResponse } from 'next';
import { store } from '@/lib/store';

function POST(req: NextApiRequest, res: NextApiResponse) {
    const key = req.query.key as string;
    const { value } = req.body;
    if (!key || value === undefined) {
        return res.status(400).json({ error: 'Key and value are required' });
    }
    store[key] = value;
    return res.json({ success: true });
}

function GET(req: NextApiRequest, res: NextApiResponse) {
    const key = req.query.key as string;
    if (!key) return res.status(400).json({ error: 'Key is required' });
    return store[key] ? 
        res.json({ key, value: store[key] }) : 
        res.status(404).json({ error: 'Key not found' });
}

function DELETE(req: NextApiRequest, res: NextApiResponse) {
    const key = req.query.key as string;
    if (!key) return res.status(400).send({ error: 'Key is required' });
    delete store[key];
    return res.json({ success: true });
}

function ERROR(req: NextApiRequest, res: NextApiResponse) {
    return res.status(405).end(`Method Not Allowed`);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST': return POST(req, res);
        case 'GET': return GET(req, res);
        case 'DELETE': return DELETE(req, res);
        default: return ERROR(req, res);
    }
}
