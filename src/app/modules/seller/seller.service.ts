/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { Seller } from './seller.model';
import { TSeller } from './seller.interface';
import { BankAccount } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { sellerSearchableField } from './seller.constant';
import { Stakeholder } from '../stake-holder/stakeholder.model';

const allSellersFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(
    Seller.find().populate('userId').populate('bankAccountInfo'),
    query,
  )
    .search(sellerSearchableField)
    .fields()
    .filter()
    .paginate()
    .sort();

  const meta = await queryBuilder.countTotal();
  const result = await queryBuilder.modelQuery;
  return { meta, result };
};

const singleSellerFromDB = async (id: string) => {
  const seller = await Seller.findOne({ userId: id })
    .populate('creator', 'email role status')
    .populate('userId', 'email role status')
    .populate('bankAccountInfo')
    .lean();

  if (!seller) {
    throw new AppError(status.NOT_FOUND, 'Seller not found');
  }

  const creatorProfile = await Stakeholder.findOne({
    userId: seller.creator as string,
  })
    .select('name email phone')
    .lean();
  const result = { ...seller, creatorProfile };
  return result;
};

const updateSellerIntoDB = async (id: string, payload: Partial<TSeller>) => {
  const existingSeller = await Seller.findOne({ userId: id });
  if (!existingSeller) {
    throw new AppError(status.NOT_FOUND, 'This seller not found');
  }

  const updateFields: any = {};

  if (payload?.name) {
    if (existingSeller?.name?.firstName)
      updateFields['name.firstName'] = payload?.name?.firstName;

    if (existingSeller?.name?.middleName)
      updateFields['name.middleName'] = payload?.name?.middleName;

    if (existingSeller?.name?.lastName)
      updateFields['name.lastName'] = payload?.name?.lastName;
  }

  if (existingSeller?.phone) {
    updateFields['phone'] = payload?.phone;
  }

  if (existingSeller?.address?.presentAddress) {
    updateFields['address.presentAddress'] = payload?.address?.presentAddress;
  }

  if (existingSeller?.profileImage) {
    updateFields['profileImageUrl'] = payload?.profileImage;
  }

  const updatedSeller = await Seller.findOneAndUpdate(
    { userId: id },
    updateFields,
    {
      new: true,
      runValidators: true,
    },
  );

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
  allSellersFromDB,
  singleSellerFromDB,
  updateSellerIntoDB,
  deleteSellerFromDB,
};
