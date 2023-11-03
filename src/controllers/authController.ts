import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

import { User } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { sendResponse } from '../utils/sendResponse';
import { Role } from '../models/Role';
import { logging } from '../utils/logging';
import { ROLES_ENUM } from '../enums/roles.enum';

dotenv.config();

const NAMESPACE = 'Auth Controller';

// Registrar un nuevo usuario
export const signUp = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'SignUp Method');
  const { firstName, lastName, dni, email, password, termsAndConditions } =
    req.body;

  const role = await Role.findOne({ name: ROLES_ENUM.SUPER_ADMIN }); // Assuming you want to assign the CLIENT role to all new users

  const existingUser: IUser | null = await User.findOne({ dni });

  if (existingUser) return sendResponse(res, 400, 'Email already in use');

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    dni,
    password: hashedPassword,
    termsAndConditions,
    isVerified: true, // ToDo: Remove - Assuming you want to skip the email verification step
    verifyCode: uuidv4(),
    verifyCodeExpires: new Date(Date.now() + 3600000),
    role,
  });

  try {
    await newUser.save();
    // Enviar email de confirmacion de cuenta.
    return sendResponse(res, 201, 'User created successfully', newUser);
  } catch (error) {
    logging.error(NAMESPACE, 'SignUp Method', error);
    return sendResponse(res, 500, '', error);
  }
};

// Iniciar sesión
export const signIn = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'SignIn Method');
  try {
    const { dni, email, password } = req.body;

    console.log(req.body);

    const user = await User.findOne({ dni });

    if (!user) return sendResponse(res, 404, 'User not found');

    if (!user.isVerified)
      return sendResponse(
        res,
        403,
        'Email not verified. Please verify your email first.'
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, 400, 'Invalid credentials');

    const accessToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '240h',
      }
    );

    const userWithRole = await User.findById(user.id)
      .select('-password -verifyCode -verifyCodeExpires')
      .populate('role')
      .select('name');

    return sendResponse(res, 200, 'Logged in successfully', {
      accessToken,
      user: userWithRole,
    });
  } catch (error) {
    logging.error(NAMESPACE, 'SignIn Method', error);
    return sendResponse(res, 500, '', error);
  }
};

// Obtener el Usuario actual con el token
export const signInUsingToken = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'SignInUsingToken Method');
  try {
    const accessToken = req.headers.authorization?.split(' ')[1] ?? '';

    if (!accessToken) return sendResponse(res, 401, 'Unauthorized');

    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY as string
    );
    const userId = (decodedToken as any).userId;
    const user = await User.findById(userId)
      .select('-password -verifyCode -verifyCodeExpires')
      .populate('role')
      .select('name');

    if (!user) return sendResponse(res, 404, 'User not found');

    return sendResponse(res, 200, 'User found', {
      accessToken,
      user,
    });
  } catch (error) {
    logging.error(NAMESPACE, 'SignInUsingToken Method', error);
    return sendResponse(res, 500, '', error);
  }
};

// Solicitar restablecimiento de contraseña
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    logging.info(NAMESPACE, 'ForgotPassword Method');
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    user.verifyCode = uuidv4();
    user.verifyCodeExpires = new Date(Date.now() + 3600000);

    await user.save();

    return sendResponse(res, 200, 'Password reset token generated', {
      token: user.verifyCode,
    });
  } catch (error) {
    logging.error(NAMESPACE, 'ForgotPassword Method', error);
    return sendResponse(res, 500, '', error);
  }
};

// Restablecer contraseña
export const resetPassword = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'ResetPassword Method');
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      verifyCode: token,
      verifyCodeExpires: { $gt: Date.now() },
    });

    if (!user) {
      return sendResponse(res, 400, 'Token is invalid or has expired');
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.verifyCode = null;
    user.verifyCodeExpires = null;

    await user.save();

    return sendResponse(res, 200, 'Password reset successfully');
  } catch (error) {
    logging.error(NAMESPACE, 'ResetPassword Method', error);
    return sendResponse(res, 500, '', error);
  }
};

// Verificar correo electrónico:
export const verifyEmail = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'VerifyEmail Method');
  const { token } = req.body;

  try {
    const user = await User.findOne({ verifyCode: token });

    if (!user) {
      return sendResponse(res, 400, 'Invalid verification token');
    }

    if (user.verifyCodeExpires && user.verifyCodeExpires < new Date()) {
      return sendResponse(res, 400, 'Verification token has expired');
    }

    user.isVerified = true;
    user.verifyCode = null;
    user.verifyCodeExpires = null;

    await user.save();

    return sendResponse(res, 200, 'Email verified successfully');
  } catch (error) {
    logging.error(NAMESPACE, 'VerifyEmail Method', error);
    return sendResponse(res, 500, '', error);
  }
};

export const me = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'Me Method');
  try {
    const accessToken = req.headers.authorization?.split(' ')[1] ?? '';

    if (!accessToken) return sendResponse(res, 401, 'Unauthorized');

    const decodedToken = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY as string
    );

    const userId = (decodedToken as any).userId;
    const user = await User.findById(userId)
      .select('-password -verifyCode -verifyCodeExpires')
      .populate('role')
      .select('name');

    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }

    return sendResponse(res, 200, 'User found', user);
  } catch (error) {
    logging.error(NAMESPACE, 'Me Method', error);
    return sendResponse(res, 500, '', error);
  }
};
