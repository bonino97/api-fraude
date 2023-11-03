import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { logging } from '../utils/logging';
import { sendResponse } from '../utils/sendResponse';

dotenv.config();

const NAMESPACE = 'Middleware';

export const decodeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, `Decode Token Middleware`);

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return sendResponse(res, 401, 'Unauthorized');

  try {
    const decode = jwt.verify(token, dotenv.config().parsed!.JWT_SECRET_KEY!);
    res.locals.jwt = decode;
    next();
  } catch (error) {
    return sendResponse(res, 401, 'Decoding token failed.');
  }
};
