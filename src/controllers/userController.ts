import { Request, Response } from 'express';

import { IUser } from '../interfaces/IUser';
import { User } from '../models/User';
import { sendResponse } from '../utils/sendResponse';
import { logging } from '../utils/logging';

const NAMESPACE = 'User Controller';

export const getAllUsers = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'GetAllUsers Method');
  try {
    const users: IUser[] = await User.find();

    if (users.length === 0) return sendResponse(res, 404, 'No users found');

    return sendResponse(res, 200, 'Users retrieved successfully', { users });
  } catch (error) {
    logging.error(NAMESPACE, 'GetAllUsers Method', error);
    return sendResponse(res, 500, '', error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'GetUserById Method');
  try {
    const userId: string = req.params.id;
    const user: IUser | null = await User.findById(userId);
    if (!user) {
      return sendResponse(res, 404, 'User not found');
    }
    return sendResponse(res, 200, 'User retrieved successfully', { user });
  } catch (error) {
    logging.error(NAMESPACE, 'GetUserById Method', error);
    return sendResponse(res, 500, '', error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'CreateUser Method');
  try {
    const newUser: IUser = new User(req.body);
    await newUser.save();
    return sendResponse(res, 201, 'User created successfully', { newUser });
  } catch (error) {
    logging.error(NAMESPACE, 'CreateUser Method', error);
    return sendResponse(res, 500, '', error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'UpdateUser Method');
  try {
    const { userId } = res.locals.jwt;
    const { user } = req.body;
    const updatedUser: IUser | null = (await User.findByIdAndUpdate(
      userId,
      user,
      { new: true }
    )
      .select('-password -verifyCode -verifyCodeExpires')
      .populate('role')
      .select('name permissions')) as IUser;

    if (!updatedUser) {
      return sendResponse(res, 404, 'User not found');
    }

    return sendResponse(res, 200, 'User updated successfully', updatedUser);
  } catch (error) {
    logging.error(NAMESPACE, 'UpdateUser Method', error);
    return sendResponse(res, 500, '', error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  logging.info(NAMESPACE, 'DeleteUser Method');
  try {
    const userId: string = req.params.id;
    const deletedUser: IUser | null = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return sendResponse(res, 404, 'User not found');
    }
    return sendResponse(res, 200, 'User deleted successfully');
  } catch (error) {
    logging.error(NAMESPACE, 'DeleteUser Method', error);
    return sendResponse(res, 500, '', error);
  }
};
