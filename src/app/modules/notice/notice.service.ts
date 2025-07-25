import status from 'http-status';
import AppError from '../../errors/AppError';
import { TNotice } from './notice.interface';
import { Notice } from './notice.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { noticeSearchableField } from './notice.constant';

const allNoticeFromDB = async (query: Record<string, unknown>) => {
  const noticeQuery = new QueryBuilder(Notice.find(), query)
    .search(noticeSearchableField)
    .fields()
    .sort()
    .paginate()
    .filter();

  const meta = await noticeQuery.countTotal();
  const result = await noticeQuery.modelQuery;
  return { meta, result };
};
const singleNoticeFromDB = async (id: string) => {
  const result = await Notice.findById(id);
  return result;
};
const createNoticeIntoDB = async (payload: Partial<TNotice>) => {
  const result = await Notice.create(payload);
  return result;
};
const updateNoticeIntoDb = async (id: string, payload: Partial<TNotice>) => {
  const isExist = await Notice.findById(id);
  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'This is notice not  found');
  }
  const result = await Notice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteNoticeIntoDB = async (id: string) => {
  await Notice.findByIdAndDelete(id);
  return null;
};

export const noticeService = {
  createNoticeIntoDB,
  updateNoticeIntoDb,
  allNoticeFromDB,
  singleNoticeFromDB,
  deleteNoticeIntoDB,
};
