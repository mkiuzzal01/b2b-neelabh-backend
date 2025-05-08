/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TBankAccountInfo, TRole, TUser } from './user-interface';
import config from '../../config';
import { BankAccount, User } from './user-model';
import { Stakeholder } from '../stake-holder/stakeholder-model';
import { TSeller } from '../seller/seller-interface';
import { TStakeHolder } from '../stake-holder/stakeholder-interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Seller } from '../seller/seller-model';

const createStackHolderBD = async (
  password: string,
  role: TRole,
  payload: TStakeHolder,
  creator: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {};
    userData.email = payload.email;
    userData.password = password || (config.default_password as string);
    userData.role = role;

    //crate the user:
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    //create the stakeholder:
    payload.userId = newUser[0]._id as any;
    payload.creatorId = creator;

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

const createSellerIntoBD = async (
  password: string,
  payload: TSeller,
  creator: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {
      email: payload.email,
      password: password || (config.default_password as string),
      role: 'seller',
    };

    //create the user:
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    const createdUser = newUser[0];

    //create the bank account:
    const bankAccountPayload: Partial<TBankAccountInfo> = {
      userId: createdUser._id as any,
      ...payload.bankAccountInfo,
    };

    const newBankAccount = await BankAccount.create([bankAccountPayload], {
      session,
    });
    if (!newBankAccount.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create bank account');
    }

    const createdBankAccount = newBankAccount[0];

    //create the seller:
    payload.userId = createdUser._id as any;
    payload.bankAccountInfo = createdBankAccount._id;
    payload.creatorId = creator;

    const newSeller = await Seller.create([payload], { session });
    if (!newSeller.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create seller');
    }

    await session.commitTransaction();
    session.endSession();

    return newSeller[0];
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
