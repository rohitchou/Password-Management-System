// server.js

const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passop';
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

async function startServer() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection('passwords');

    // Get all passwords
    app.get('/', async (req, res) => {
      try {
        const results = await collection.find({}).toArray();
        res.json(results);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch passwords', details: err.message });
      }
    });

    // Save a new password
    app.post('/', async (req, res) => {
      try {
        const password = req.body;
        const result = await collection.insertOne(password);
        res.json({ success: true, result });
      } catch (err) {
        res.status(500).json({ error: 'Failed to save password', details: err.message });
      }
    });

    // Delete a password
    app.delete('/', async (req, res) => {
      try {
        const password = req.body;
        const result = await collection.deleteOne(password);
        res.json({ success: true, result });
      } catch (err) {
        res.status(500).json({ error: 'Failed to delete password', details: err.message });
      }
    });

    // Start the server
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message);
  }
}

startServer();