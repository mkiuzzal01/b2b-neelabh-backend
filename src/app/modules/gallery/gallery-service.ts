import status from 'http-status';
import AppError from '../../errors/AppError';
import { TFolder, TPhoto } from './gallery-interface';
import { Folder, Photo } from './gallery-model';

//this is for folder:
const allFolderFromDB = async () => {
  const result = await Folder.find();
  return result;
};

const singleFolderFromDB = async (id: string) => {
  const isExistFolder = await Folder.findById(id);
  if (!isExistFolder) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }
  const result = await Folder.findById(id);
  return result;
};

const createFolderIntoDB = async (payload: TFolder) => {
  const result = await Folder.create(payload);
  return result;
};

const updateFolderIntoDB = async (payload: Partial<TFolder>, id: string) => {
  const isExistFolder = await Folder.findById(id);
  if (!isExistFolder) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }
  const result = await Folder.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteFolderFromDB = async (id: string) => {
  const isExistFolder = await Folder.findById(id);
  if (!isExistFolder) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }
  await Folder.findByIdAndDelete(id);
  return null;
};

//this is for image:
const allPhotoFromDB = async () => {
  const result = await Photo.find();
  return result;
};

const singlePhotoFromDB = async (id: string) => {
  const isExistPhoto = await Photo.findById(id);
  if (!isExistPhoto) {
    throw new AppError(status.NOT_FOUND, 'The photo not found');
  }
  const result = await Photo.findById(id);
  return result;
};
const createPhotoIntoDB = async (payload: TPhoto) => {
  const isExistFolder = await Folder.findById(payload.folderId);
  if (!isExistFolder) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }
  const result = await Photo.create(payload);
  return result;
};

const updatePhotoIntoDB = async (payload: Partial<TPhoto>, id: string) => {
  const isExistPhoto = await Photo.findById(id);
  if (!isExistPhoto) {
    throw new AppError(status.NOT_FOUND, 'The photo not found');
  }
  const result = await Photo.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deletePhotoFromDB = async (id: string) => {
  const isExistPhoto = await Photo.findById(id);
  if (!isExistPhoto) {
    throw new AppError(status.NOT_FOUND, 'The photo not found');
  }
  await Photo.findByIdAndDelete(id);
  return null;
};

export const galleryService = {
  allFolderFromDB,
  singleFolderFromDB,
  createFolderIntoDB,
  updateFolderIntoDB,
  deleteFolderFromDB,
  //this is photo service:
  createPhotoIntoDB,
  updatePhotoIntoDB,
  deletePhotoFromDB,
  allPhotoFromDB,
  singlePhotoFromDB,
};
