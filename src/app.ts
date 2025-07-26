/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/utils/NotFound';

const app = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://b2b-neelabh.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
app.use(express.json());
app.use(express.text());
app.use(cookieParser());

// Routes
app.use('/api/v1/', router);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.send({ success: true, message: 'Welcome to neelabh b2b!' });
});

// Test route for error handling
app.get('/test', (req: Request, res: Response) => {
  throw new Error('Testing error handling');
});

// Not found route
app.use(notFound);

// Global error handler
app.use(globalErrorHandler);

export default app;
