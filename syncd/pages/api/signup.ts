import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;
        console.log(email+' '+password)
        const { MongoClient } = require('mongodb');

        const uri = `mongodb+srv://syncdmailparser:mailparser%40%40@syncd.sfknoqc.mongodb.net/login`;
        const client = new MongoClient(uri);
        try {
            await client.connect();

            const database = client.db('login');
            const collection = database.collection('register');
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!email || !password || !emailRegex.test(email)) {
            return res.status(400).json({ message: 'invalidCredentials' });
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#^$!%*?&])[A-Za-z\d@#^$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: 'weakPassword' });
            }
            const existingUser = await collection.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'userExists' });
            }

            const result = await collection.insertOne({ email, password });
            
            res.status(201).json({ success: true, message: 'User created successfully', userId: result.insertedId });
        } catch (error) {
            console.error('Error inserting user data:', error);
            res.status(500).json({ success: false, message: 'failCreate' });
        } finally {
            await client.close();
        }
    } else {
            res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
