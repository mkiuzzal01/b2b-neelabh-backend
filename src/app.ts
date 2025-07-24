import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/utils/NotFound';

const app = express();

// Middleware
app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// Routes
app.use('/api/v1/', router);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send({ success: true, message: 'Welcome to neelabh b2b!' });
});

// Test route for error handling
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Simulate async error
    throw new Error('Test error triggered');
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use(globalErrorHandler);

// 404 Not found handler
app.use(notFound);

export default app;
