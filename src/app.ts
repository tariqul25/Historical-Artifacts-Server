import express from 'express';
import cors from 'cors';
import { likedRoutes } from './app/modules/likes/likes.route';
import { artifactRoutes } from './app/modules/artifacts/artifacts.route';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', artifactRoutes );
app.use('/api', likedRoutes );

app.get('/', (req, res) => {
  res.send('historical-artifacts is running...');
});

export default app;
