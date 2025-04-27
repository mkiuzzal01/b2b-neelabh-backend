import mongoose from 'mongoose';
import { TAdmin } from '../stakeholder/stakeholder-interface';
import { TUser } from './user-interface';
import config from '../../config';
import { User } from './user-model';
import { Stakeholder } from '../stakeholder/stakeholder-model';
import { TSeller } from '../seller/seller-interface';

export const createStackHolderBD = async (
  password: string,
  payload: TAdmin,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {};
    userData.email = payload.email;
    userData.password = password || (config.default_password as string);
    userData.role = 'admin';

    //find the admission semester:
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error('Failed to create user');
    }

    //create the admin:
    payload.user = newUser[0]._id;
    const newAdmin = await Stakeholder.create([payload], { session });
    if (!newAdmin.length) {
      throw new Error('Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const sellerIntoBD = async (password: string, payload: TSeller) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {};
    userData.email = payload.email;
    userData.password = password || (config.default_password as string);
    userData.role = 'admin';

    //find the admission semester:
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new Error('Failed to create user');
    }

    //create the admin:
    payload.user = newUser[0]._id;
    const newAdmin = await Stakeholder.create([payload], { session });
    if (!newAdmin.length) {
      throw new Error('Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const userService = {
  createStackHolderBD,
  sellerIntoBD,
};
