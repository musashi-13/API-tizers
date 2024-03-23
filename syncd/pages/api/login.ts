import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        const { MongoClient } = require('mongodb');
        const uri = `mongodb+srv://syncdmailparser:mailparser%40%40@syncd.sfknoqc.mongodb.net/login`;
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db('login');
            const collection = database.collection('register');
            const existingUser = await collection.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ success: false, message: 'userNotFound' });
            }
            if (existingUser.password !== password) {
                return res.status(400).json({ success: false, message: 'invalidPassword' });
            }
            res.status(201).json({ success: true, message: 'User logged in successfully'});
        } catch (error) {
            console.error('Error checking for data', error);
            res.status(500).json({ success: false, message: 'failLogin' });
        } finally {
            await client.close();
        }
    } else {
            res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
