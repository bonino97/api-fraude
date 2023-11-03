import express from 'express';
import {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  verifyEmail,
  signInUsingToken,
  me,
} from '../controllers/authController';
import { decodeToken } from '../middlewares/decodeToken';

const router = express.Router();

router.get('/me', decodeToken, me);
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-in-using-token', signInUsingToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

export default router;
