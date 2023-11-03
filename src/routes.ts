import { Express } from 'express';
import UserRoutes from './routes/userRoutes';
import AuthRoutes from './routes/authRoutes';

const setupRoutes = (app: Express) => {
  app.use('/api/auth', AuthRoutes);
  app.use('/api/users', UserRoutes);

  app.use('/api/*', (req, res) => {
    res.status(404).send('Not Found');
  });
};

export default setupRoutes;
