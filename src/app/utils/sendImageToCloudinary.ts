/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import AppError from '../errors/AppError';
import status from 'http-status';

// configuration:
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = async (
  imageName: string,
  path: any,
): Promise<Record<string, unknown>> => {
  let uploadResult: Record<string, unknown>;
  try {
    uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });
  } catch (error) {
    throw new AppError(status.BAD_REQUEST, error as string);
  }

  //delete the image from local file system:
  fs.unlink(path, (error) => {
    if (error) {
      // console.log(error);
    } else {
      // console.log('file deleted');
    }
  });

  return uploadResult;
};

//this is multer for save file to local folder:
const uploadDir = path.join(process.cwd(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
