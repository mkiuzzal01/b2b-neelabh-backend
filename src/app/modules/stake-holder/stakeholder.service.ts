/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { TStakeHolder } from './stakeholder.interface';
import { Stakeholder } from './stakeholder.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { searchableFields } from './stakeholder.constant';

const allStakeholdersFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(
    Stakeholder.find().populate('userId'),
    query,
  )
    .search(searchableFields)
    .fields()
    .filter()
    .paginate()
    .sort();

  const meta = await queryBuilder.countTotal();
  const result = await queryBuilder.modelQuery;
  return { meta, result };
};

const singleStakeholderFromDB = async (id: string) => {
  const result = await Stakeholder.findOne({ userId: id })
    .populate('creator')
    .populate('userId');
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'This is stake holder not found');
  }
  return result;
};

const updateStakeholderIntoDB = async (
  id: string,
  payload: Partial<TStakeHolder>,
) => {
  const isExistUser = await Stakeholder.findById(id);
  if (!isExistUser) {
    throw new AppError(status.NOT_FOUND, 'This stake holder not found');
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

  if (payload.profileImage) {
    updateFields['profileImageUrl'] = payload.profileImage;
  }

  const result = await Stakeholder.findByIdAndUpdate(id, updateFields, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteStakeHolderFromDB = async (id: string) => {
  const isExistStakeHolder = await Stakeholder.findById(id);
  if (!isExistStakeHolder) {
    throw new AppError(status.NOT_FOUND, 'this stake holder not found');
  }

  await Stakeholder.findByIdAndUpdate(
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

export const stakeholderService = {
  allStakeholdersFromDB,
  singleStakeholderFromDB,
  updateStakeholderIntoDB,
  deleteStakeHolderFromDB,
};
