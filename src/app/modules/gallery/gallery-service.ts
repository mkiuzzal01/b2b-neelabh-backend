/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { TFolder, TPhoto } from './gallery-interface';
import { Folder, Photo } from './gallery-model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { UploadApiResponse } from 'cloudinary';
import { deleteImageFromCloudinary } from '../../utils/deleteImageFromCloudinary';

//this is for folder:
const allFolderFromDB = async () => {
  const result = await Folder.find();
  return result;
};

const singleFolderFromDB = async (id: string) => {
  const result = await Folder.findById(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }
  return result;
};

const createFolderIntoDB = async (payload: TFolder) => {
  const result = await Folder.create(payload);
  return result;
};

const updateFolderIntoDB = async (payload: Partial<TFolder>, id: string) => {
  const result = await Folder.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }

  return result;
};

const deleteFolderFromDB = async (id: string) => {
  const result = await Folder.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }
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
  return isExistPhoto;
};

const createPhotoIntoDB = async (payload: TPhoto, file: any) => {
  const isExistFolder = await Folder.findById(payload.folderId);
  if (!isExistFolder) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }

  //upload image to cloudinary :
  const { path } = file;
  const imageName = `${payload.photoName}`;
  const { secure_url, public_id } = (await sendImageToCloudinary(
    imageName,
    path,
  )) as UploadApiResponse;

  payload.photo = {
    publicId: public_id as string,
    url: secure_url as string,
  };

  const result = await Photo.create(payload);
  return result;
};

const updatePhotoIntoDB = async (payload: Partial<TPhoto>, id: string) => {
  const result = await Photo.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, 'The photo not found');
  }

  return result;
};

const deletePhotoFromDB = async (id: string) => {
  const result = await Photo.findById(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'The photo not found');
  }

  //delete image from cloudinary:
  await deleteImageFromCloudinary(result.photo.publicId);
  //then delete the database:
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
