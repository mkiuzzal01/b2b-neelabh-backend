/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { TStakeHolder } from './stakeholder-interface';
import { Stakeholder } from './stakeholder-model';

const getAllStakeholdersFromDB = async () => {
  const result = await Stakeholder.find().populate('userId');
  return result;
};

const getSingleStakeholderFromDB = async (id: string) => {
  const result = await Stakeholder.findById(id).populate('userId');
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

  if (payload.profileImageUrl) {
    updateFields['profileImageUrl'] = payload.profileImageUrl;
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
  getAllStakeholdersFromDB,
  getSingleStakeholderFromDB,
  updateStakeholderIntoDB,
  deleteStakeHolderFromDB,
};
