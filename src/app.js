import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects';
import serverRoutes from './routes/servers';
import workspaceRoutes from './routes/workspaces';
import agentRoutes from './routes/agent';

const app = express();

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log('Connect to database is successful')).catch(console.log);

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/agents', agentRoutes);
app.use('/projects', projectRoutes);
app.use('/servers', serverRoutes);
app.use('/workspaces', workspaceRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
