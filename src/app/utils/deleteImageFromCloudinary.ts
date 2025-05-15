import { v2 as cloudinary } from 'cloudinary';

export const deleteImageFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId).catch((error) => {
    throw new Error(`Failed to delete image from Cloudinary: ${error.message}`);
  });
};
