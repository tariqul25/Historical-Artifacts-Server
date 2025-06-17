const express = require('express');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pw0hmwl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
         const artifactsCollection = client.db('artifactsdb').collection('artifacts');

          app.get('/api/shareartifacts', async (req, res) => {
            const result = await artifactsCollection.find().toArray();
            res.send(result);
        });

        app.get('/api/shareartifacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await artifactsCollection.findOne(query);
            res.send(result);
        });

        // get artifacts by user email
        app.get('/api/shareartifacts/email/:email', async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const result = await artifactsCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/api/shareartifacts', async (req, res) => {
            console.log('data in the server', req.body);
            const newArtifacts = req.body;
            const result = await artifactsCollection.insertOne(newArtifacts);
            res.send(result);
        });
        
        // Test ping
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('historical-artifacts is running...')
});

app.listen(port, () => {
    console.log(`server is running from port: ${port}`);
});
