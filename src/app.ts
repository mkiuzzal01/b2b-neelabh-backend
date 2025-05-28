import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/utils/NotFound';

const app = express();
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.text());

// All application routes:
app.use('/api/v1/', router);

// Home route:
app.get('/', (req: Request, res: Response) => {
  res.send({ success: true, message: 'Welcome to neelabh b2b!' });
});

// Test route:
app.get('/test', (req: Request, res: Response) => {
  Promise.reject();
  res.send(req);
});

//global error handler:
app.use(globalErrorHandler);

//not found error handler:
app.use(notFound);

export default app;
