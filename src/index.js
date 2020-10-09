import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import productRoutes from './api/routes/products';
import orderRoutes from './api/routes/orders';

const app = express();

mongoose.connect(`mongodb+srv://admin:${process.env.MONGO_ATLAS_PW}@cluster0.damdt.mongodb.net/<dbname>?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log('Connect to database is successful'));

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

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// app.get('/:id', (req, res) =>{
//     console.log(req.params);
//     res.status = 200;
//     res.json({
//         asd: 'asd',
//         poqweqwe: 'qqqqq',
//     });
// })

export default app;
