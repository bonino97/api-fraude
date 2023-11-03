import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import setupRoutes from './routes';

import { checkPendingTasks } from './cron/checkPendingTasks';
import { swaggerOptions } from './utils/swagger';

// Initialize environment variables
dotenv.config();

const app: Express = express();
const specs = swaggerJsdoc(swaggerOptions);

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.DATABASE_URL || '')
  .then(() => {
    console.info(`✔ Database connected successfully to ${process.env.TENANT}`);

    // initTenant(mongoose, 'HireAModel');
    // initRoles(mongoose);
    // initWorkflow(mongoose);
  })
  .catch((err) => console.error(`✖ Couldn't connect to database:`, err));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Init Routes
setupRoutes(app);

// Error Handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error encountered: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Start Server
const port: string | number = process.env.PORT || 4001;
app.listen(port, () => {
  console.info(`✔ Server operational → PORT ${port}`);
});

// Check cron jobs
// checkPendingTasks();
