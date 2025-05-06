import { Requisition } from './requisition.model';
import { TRequisition } from './requisition.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';

const allRequisitionFromDB = async () => {
  const result = await Requisition.find();
  return result;
};
const singleRequisitionFromDB = async (id: string) => {
  const result = await Requisition.findById(id);
  return result;
};
const createRequisitionIntoDB = async (payload: Partial<TRequisition>) => {
  const result = await Requisition.create(payload);
  return result;
};
const updateRequisitionIntoDB = async (
  id: string,
  payload: Partial<TRequisition>,
) => {
  const isExist = await Requisition.findById(id);
  if (!isExist) {
    throw new AppError(status.OK, 'This requisition not found');
  }
  const result = await Requisition.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteRequisitionFrom = async (id: string) => {
  const result = await Requisition.findByIdAndDelete(id);
  return result;
};

export const requisitionService = {
  createRequisitionIntoDB,
  updateRequisitionIntoDB,
  allRequisitionFromDB,
  singleRequisitionFromDB,
  deleteRequisitionFrom,
};
