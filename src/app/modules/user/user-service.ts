import mongoose from 'mongoose';
import { TUser } from './user-interface';
import config from '../../config';
import { User } from './user-model';
import { Stakeholder } from '../stakeholder/stakeholder-model';
import { TSeller } from '../seller/seller-interface';
import { TStakeHolder } from '../stakeholder/stakeholder-interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Seller } from '../seller/seller-model';
import { TRole } from '../../interface/TRole';

export const createStackHolderBD = async (
  password: string,
  role: TRole,
  payload: TStakeHolder,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {};
    userData.email = payload.email;
    userData.password = password || (config.default_password as string);
    userData.role = role;

    //find the admission semester:
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    //create the admin:
    payload.user = newUser[0]._id;
    const newAdmin = await Stakeholder.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
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

export const createSellerIntoBD = async (
  password: string,
  payload: TSeller,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {};
    userData.email = payload.email;
    userData.password = password || (config.default_password as string);
    userData.role = 'seller';

    //find the admission semester:
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    //create the admin:
    payload.user = newUser[0]._id;
    const newSeller = await Seller.create([payload], { session });
    if (!newSeller.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newSeller;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const userService = {
  createStackHolderBD,
  createSellerIntoBD,
};
