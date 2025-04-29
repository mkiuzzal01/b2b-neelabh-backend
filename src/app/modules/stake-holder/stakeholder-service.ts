import { TStakeHolder } from './stakeholder-interface';
import { Stakeholder } from './stakeholder-model';

const updateStakeholderIntoDB = async (
  id: string,
  payload: Partial<TStakeHolder>,
) => {};

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
