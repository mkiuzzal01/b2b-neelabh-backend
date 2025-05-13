/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { Seller } from './seller-model';
import { TSeller } from './seller-interface';
import { BankAccount } from '../user/user-model';

const getAllSellersFromDB = async () => {
  const result = await Seller.find()
    .populate('userId')
    .populate('bankAccountInfo');
  return result;
};

const getSingleSellerFromDB = async (id: string) => {
  const result = await Seller.findById(id)
    .populate('userId')
    .populate('bankAccountInfo');
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'This is seller not found');
  }
  return result;
};

const updateSellerIntoDB = async (id: string, payload: Partial<TSeller>) => {
  const existingSeller = await Seller.findById(id);
  if (!existingSeller) {
    throw new AppError(status.NOT_FOUND, 'This seller not found');
  }

  const updateFields: any = {};

  if (payload.name) {
    if (payload.name.firstName)
      updateFields['name.firstName'] = payload.name.firstName;

    if (payload.name.middleName)
      updateFields['name.middleName'] = payload.name.middleName;

    if (payload.name.lastName)
      updateFields['name.lastName'] = payload.name.lastName;
  }

  if (payload.phone) {
    updateFields['phone'] = payload.phone;
  }

  if (payload.address?.presentAddress) {
    updateFields['address.presentAddress'] = payload.address.presentAddress;
  }

  if (payload.profileImageUrl) {
    updateFields['profileImageUrl'] = payload.profileImageUrl;
  }

  const updatedSeller = await Seller.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  return updatedSeller;
};

const deleteSellerFromDB = async (id: string) => {
  const isExistStakeHolder = await Seller.findById(id);
  if (!isExistStakeHolder) {
    throw new AppError(status.NOT_FOUND, 'this stake holder not found');
  }

  await BankAccount.findOneAndUpdate(
    { userId: isExistStakeHolder.userId },
    {
      status: 'deactivate',
    },
    {
      new: true,
      runValidators: true,
    },
  );

  await Seller.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return null;
};

export const sellerService = {
  updateSellerIntoDB,
  getAllSellersFromDB,
  getSingleSellerFromDB,
  deleteSellerFromDB,
};
