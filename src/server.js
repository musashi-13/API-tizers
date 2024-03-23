const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
const username = 'syncdmailparser';
const password = 'mailparser@@';
const dbname = 'mail';
const collectionName = 'event_info';

// Escape special characters in username and password
const escapedUsername = encodeURIComponent(username);
const escapedPassword = encodeURIComponent(password);
const uri = `mongodb+srv://${escapedUsernameusername}:${escapedPasswordpassword}@your-cluster.mongodb.net/${dbname}`;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// MongoDB schema
const eventSchema = new mongoose.Schema({
  description: String
});
const Event = mongoose.model('Event', eventSchema);

// Middleware to parse JSON bodies
app.use(express.json());

// Route to receive text data, send it for NLP processing, and interact with MongoDB
app.post('/process_text', async (req, res) => {
  try {
    const { text } = req.body;

    // Send text data to Python server for NLP processing
    const nlpResponse = await axios.post('http://localhost:5000/process_text', { text });

    // Extract relevant information from NLP response and save to MongoDB
    const { eventName, eventDate, eventVenue, lastDateforSubmission } = nlpResponse.data;
    const event = new Event({
      description: text,
      eventName,
      eventDate,
      eventVenue,
      lastDateforSubmission
    });
    await event.save();

    // Send response to client
    res.json({ success: true, message: 'Text processed and saved to MongoDB' });
  } catch (error) {
    console.error('Error processing text:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Node.js server is running on http://localhost:${PORT}`);
});
