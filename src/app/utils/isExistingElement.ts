import { FilterQuery, Model } from 'mongoose';

/* eslint-disable @typescript-eslint/no-explicit-any */
const isExistingElement = async <T>(
  model: Model<T>,
  key: keyof T,
  value: any,
): Promise<boolean> => {
  const filter: FilterQuery<T> = { [key]: value } as FilterQuery<T>;

  const result = await model.findOne(filter);
  return !!result;
};

export default isExistingElement;
