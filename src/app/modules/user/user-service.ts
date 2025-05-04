import mongoose from 'mongoose';
import { TUser } from './user-interface';
import config from '../../config';
import { User } from './user-model';
import { Stakeholder } from '../stake-holder/stakeholder-model';
import { TBankAccountInfo, TSeller } from '../seller/seller-interface';
import { TStakeHolder } from '../stake-holder/stakeholder-interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { BankAccountInfo, Seller } from '../seller/seller-model';
import { TRole } from '../../interface/TRole';
import { TProduct } from '../product/product.interface';
import { Product } from '../product/product.model';
import {
  Category,
  MainCategory,
  SubCategory,
} from '../category/category.model';

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

    //crate the user:
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    //create the stakeholder:
    payload.userId = newUser[0]._id;
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
      userId: createdUser._id,
      ...payload.bankAccountInfo,
    };

    const newBankAccount = await BankAccountInfo.create([bankAccountPayload], {
      session,
    });
    if (!newBankAccount.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create bank account');
    }

    const createdBankAccount = newBankAccount[0];

    //create the seller:
    payload.userId = createdUser._id;
    payload.bankAccountInfo = createdBankAccount._id;

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

export const createProductIntoBD = async (payload: TProduct) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isExitsProduct = await Product.findOne({
      productCode: payload.productCode,
    });

    if (isExitsProduct) {
      throw new AppError(status.CONFLICT, 'The products code already exits');
    }

    const isExistMainCategory = await MainCategory.findById({
      _id: payload.categories.mainCategory,
    });

    if (!isExistMainCategory) {
      throw new AppError(status.NOT_FOUND, 'The main category not found');
    }

    const isExistCategory = await Category.findById({
      _id: payload.categories.category,
    });
    if (!isExistCategory) {
      throw new AppError(status.NOT_FOUND, 'The category not found');
    }

    const isExitsSubCategory = await SubCategory.findById({
      _id: payload.categories.subCategory,
    });

    if (!isExitsSubCategory) {
      throw new AppError(status.NOT_FOUND, 'The sub category not found');
    }

    const newProduct = await Product.create([payload], { session });
    if (!newProduct.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create product');
    }

    await session.commitTransaction();
    session.endSession();

    return newProduct[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const userService = {
  createStackHolderBD,
  createSellerIntoBD,
  createProductIntoBD,
};
