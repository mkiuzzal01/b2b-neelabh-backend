import status from 'http-status';
import AppError from '../../errors/AppError';
import { TStakeHolder } from './stakeholder-interface';
import { Stakeholder } from './stakeholder-model';

const updateStakeholderIntoDB = async (
  id: string,
  payload: Partial<TStakeHolder>,
) => {
  const isExistUser = await Stakeholder.findById(id);
  if (!isExistUser) {
    throw new AppError(status.NOT_FOUND, 'This user not found');
  }
};

const getAllStakeholdersFromDB = async () => {
  const result = await Stakeholder.find();
  return result;
};

const getSingleStakeholderFromDB = async (id: string) => {
  const result = await Stakeholder.findById(id);
  return result;
};

export const stakeholderService = {
  updateStakeholderIntoDB,
  getAllStakeholdersFromDB,
  getSingleStakeholderFromDB,
};
