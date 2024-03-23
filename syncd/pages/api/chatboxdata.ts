import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const uri = 'mongodb+srv://syncdmailparser:mailparser%40%40@syncd.sfknoqc.mongodb.net/events';
        const client = new MongoClient(uri);
        try {
            await client.connect();
            const database = client.db('events');
            const collection = database.collection('event_info');

            // Fetch all data from the collection
            const data = await collection.find({}).toArray();

            // Extract only the data fields from each document
            const jsonData = data.map(({ _id, ...rest }) => rest);
            const currentDate = new Date().toISOString().split('T')[0];

            // Construct additional data object with formatted date
            const additionalData = {
                [currentDate]: new Date().toISOString(),
                // Add more fields as needed
            };
            // Convert data to JSON string
            const jsonString = JSON.stringify(jsonData);

            // Write data to a JSON file in the public folder
            const filePath = path.join(process.cwd(), 'public', 'data.json');
            fs.writeFileSync(filePath, jsonString);

            res.status(200).json({ success: true, message: 'Data written to file' });
        } catch (error) {
            console.error('Error checking for data', error);
            res.status(500).json({ success: false, message: 'failFetch' });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
