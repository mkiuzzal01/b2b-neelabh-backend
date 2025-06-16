/* eslint-disable @typescript-eslint/no-explicit-any */
import status from 'http-status';
import AppError from '../../errors/AppError';
import { TFolder, TPhoto } from './gallery.interface';
import { Folder, Photo } from './gallery.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { UploadApiResponse } from 'cloudinary';
import { deleteImageFromCloudinary } from '../../utils/deleteImageFromCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';
import { photoSearchableFields } from './gallery.constant';

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

const allPhotoFromDB = async (query: Record<string, unknown>) => {
  const imageQuery = new QueryBuilder(Photo.find(), query)
    .search(photoSearchableFields)
    .fields()
    .filter()
    .paginate()
    .sort();
  const meta = await imageQuery.countTotal();
  const result = await imageQuery.modelQuery;
  return { meta, result };
};

const singlePhotoFromDB = async (id: string) => {
  const isExistPhoto = await Photo.findById(id);
  if (!isExistPhoto) {
    throw new AppError(status.NOT_FOUND, 'The photo not found');
  }
  return isExistPhoto;
};

const createPhotoIntoDB = async (
  payload: TPhoto,
  files: Express.Multer.File[],
) => {
  const isExistFolder = await Folder.findById(payload.folderId);
  if (!isExistFolder) {
    throw new AppError(status.NOT_FOUND, 'The folder not found');
  }

  const docs = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const name = payload.photoName[i] || file.originalname;

    const { secure_url, public_id } = (await sendImageToCloudinary(
      name,
      file.path,
    )) as UploadApiResponse;

    docs.push({
      folderId: payload.folderId,
      photoName: name,
      photo: {
        publicId: public_id,
        url: secure_url,
      },
    });
  }

  const result = await Photo.insertMany(docs);
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
