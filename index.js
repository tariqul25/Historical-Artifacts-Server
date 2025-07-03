const express = require('express');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
var admin = require("firebase-admin");
const app = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

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
        const likedArtifactsCollection = client.db('artifactsdb').collection('likedArtifacts');

        // jwt middlewares
        const verifyJWT = async (req, res, next) => {
            const authHeader = req?.headers?.authorization
            if (!authHeader) {
                return res.status(401).send({ message: 'Unauthorized Access!' })
            }

            const token = authHeader?.split(' ')[1]

            try {
                const decoded = await admin.auth().verifyIdToken(token)
                req.decoded = decoded
                next()
            } catch (err) {
                return res.status(401).send({ message: 'Unauthorized Access!' })
            }
        }

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

        app.get('/api/allartifacts', async (req, res) => {
            const result = await artifactsCollection.find().toArray();
            res.send(result);
        });

        app.get('/api/allartifacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await artifactsCollection.findOne(query);
            res.send(result);
        });

        // Like/unlike toggle route
        app.patch('/api/like/:id', async (req, res) => {
            const id = req.params.id;
            const { userEmail } = req.body;

            if (!userEmail) {
                return res.status(400).send({ error: 'User email is required for liking/unliking' });
            }

            try {
                // Check if user already liked this artifact
                const alreadyLiked = await likedArtifactsCollection.findOne({
                    artifactId: new ObjectId(id),
                    userEmail: userEmail
                });

                let result;
                if (alreadyLiked) {
                    // Unlike: Delete from likedArtifacts collection
                    await likedArtifactsCollection.deleteOne({
                        artifactId: new ObjectId(id),
                        userEmail: userEmail
                    });

                    // Decrement liked count in artifacts collection
                    result = await artifactsCollection.updateOne(
                        { _id: new ObjectId(id) },
                        { $inc: { liked: -1 } }
                    );

                    res.send({ liked: false, modifiedCount: result.modifiedCount });
                } else {
                    // Like: Insert into likedArtifacts collection
                    await likedArtifactsCollection.insertOne({
                        artifactId: new ObjectId(id),
                        userEmail,
                        likedAt: new Date()
                    });

                    // Increment liked count in artifacts collection
                    result = await artifactsCollection.updateOne(
                        { _id: new ObjectId(id) },
                        { $inc: { liked: 1 } }
                    );

                    res.send({ liked: true, modifiedCount: result.modifiedCount });
                }
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Server error during like toggle' });
            }
        });

        // Add this in your Express server code inside run()
        app.get('/api/likedartifacts/check/:artifactId/:userEmail', async (req, res) => {
            const { artifactId, userEmail } = req.params;
            try {
                const likedDoc = await likedArtifactsCollection.findOne({
                    artifactId: new ObjectId(artifactId),
                    userEmail,
                });
                res.send({ liked: !!likedDoc });
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Server error while checking liked status' });
            }
        });


        // Unlike route
        app.patch('/api/unlike/:id', async (req, res) => {
            const id = req.params.id;
            const { userEmail } = req.body;

            if (!userEmail) {
                return res.status(400).send({ error: 'User email is required for unliking' });
            }

            try {
                const likedDoc = await likedArtifactsCollection.findOne({
                    artifactId: new ObjectId(id),
                    userEmail: userEmail
                });

                if (!likedDoc) {
                    return res.send({ message: 'Already unliked', modifiedCount: 0 });
                }

                await likedArtifactsCollection.deleteOne({
                    artifactId: new ObjectId(id),
                    userEmail: userEmail
                });

                const result = await artifactsCollection.updateOne(
                    { _id: new ObjectId(id), liked: { $gt: 0 } },
                    { $inc: { liked: -1 } }
                );

                res.send({ message: 'Successfully unliked', modifiedCount: result.modifiedCount });
            } catch (err) {
                console.error(err);
                res.status(500).send({ error: 'Server error during unlike' });
            }
        });




        // Get all liked artifacts by user email
       app.get('/api/likedartifacts/user/:email', async (req, res) => {
            const email = req.params.email;

            try {
                //  all liked artifact IDs by this user
                const likedDocs = await likedArtifactsCollection.find({ userEmail: email }).toArray();
                const likedArtifactIds = likedDocs.map(doc => doc.artifactId);

                //  Fetch full artifact details using those IDs
                const query = { _id: { $in: likedArtifactIds } };
                const likedArtifacts = await artifactsCollection.find(query).toArray();

                res.send(likedArtifacts);
            } catch (error) {
                console.error(error);
                res.status(500).send({ error: 'Failed to fetch liked artifacts' });
            }
        });


        // sort by highest to lower liked
        app.get('/api/mostliked', async (req, res) => {
            const result = await artifactsCollection.find().sort({ liked: -1 }).limit(6).toArray();
            res.send(result);
        });

        app.get('/api/updateartifacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await artifactsCollection.findOne(query);
            res.send(result);
        });

        app.post('/api/shareartifacts', async (req, res) => {
            const newArtifacts = req.body;
            const result = await artifactsCollection.insertOne(newArtifacts);
            res.send(result);
        });

        app.put('/api/updateartifacts/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedArtifacts = req.body;

            const updatedDoc = {
                $set: updatedArtifacts
            };

            const options = { upsert: true };

            const result = await artifactsCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        app.delete('/api/shareartifacts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await artifactsCollection.deleteOne(query);
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