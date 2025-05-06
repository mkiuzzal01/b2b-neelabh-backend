import { Feedback, Requisition } from './requisition.model';
import { TFeedback, TRequisition } from './requisition.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user-model';
import mongoose from 'mongoose';

const allRequisitionFromDB = async () => {
  const result = await Requisition.find().populate('feedbackId');
  return result;
};
const singleRequisitionFromDB = async (id: string) => {
  const result = await Requisition.findById(id).populate('feedbackId');
  return result;
};
const createRequisitionIntoDB = async (payload: TRequisition) => {
  const isExistUser = await User.findById({ _id: payload.creatorId });

  if (!isExistUser) {
    throw new AppError(status.NOT_FOUND, 'This is user not found');
  }
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
//feedback:

const allFeedbackFromDB = async () => {
  const result = await Feedback.find()
    .populate('creatorId')
    .populate('requisitionId');
  return result;
};
const singleFeedbackFromDB = async (id: string) => {
  const result = await Feedback.findById(id)
    .populate('creatorId')
    .populate('requisitionId');
  return result;
};
const updateFeedbackIntoDB = async (
  id: string,
  payload: Partial<TFeedback>,
) => {
  const isExist = await Feedback.findById(id);
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'This is not found');
  }
  const result = await Feedback.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const createFeedbackIntoDB = async (payload: TFeedback) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isExistRequisition = await Requisition.findById(
      payload.requisitionId,
    ).session(session);
    if (!isExistRequisition) {
      throw new AppError(status.NOT_FOUND, 'Requisition not found');
    }

    const isExistUser = await User.findById(payload.creatorId).session(session);
    if (!isExistUser) {
      throw new AppError(status.NOT_FOUND, 'User not found');
    }

    const feedback = await Feedback.create([payload], { session });
    if (!feedback.length) {
      throw new AppError(
        status.INTERNAL_SERVER_ERROR,
        'Failed to create feedback',
      );
    }

    await Requisition.findByIdAndUpdate(
      payload.requisitionId,
      { feedbackId: feedback[0]._id },
      { new: true, runValidators: true, session },
    );

    await session.commitTransaction();
    session.endSession();

    return feedback[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const deleteFeedbackFromDB = async (id: string) => {
  const result = await Feedback.findByIdAndDelete(id);
  return result;
};

export const feedbackServices = {
  allFeedbackFromDB,
  singleFeedbackFromDB,
  updateFeedbackIntoDB,
  createFeedbackIntoDB,
  deleteFeedbackFromDB,
};
