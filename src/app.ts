// import express from 'express';
// import cors from 'cors';
// import movieRoutes from './routes/movieRoutes';
// import reviewRoutes from './routes/reviewRoutes';

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api', movieRoutes);
// app.use('/api', reviewRoutes);

// export default app;


import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import movieRoutes from './routes/moviewRoutes';
import reviewRoutes from './routes/reviewRoutes';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// Routes
app.use('/api', movieRoutes);
app.use('/api', reviewRoutes);

// Error Handling
app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  });

export default app;
