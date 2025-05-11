import { z } from 'zod';

export const createFolderZodSchema = z.object({
  name: z.string().min(1, 'Folder name is required'),
});

export const updateFolderZodSchema = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

export const createPhotoZodSchema = z.object({
  folderId: z.string().min(1, 'Folder ID is required'),
  photoName: z.string().optional(),
  photoUrl: z.string().url('Invalid photo URL').min(1, 'Photo URL is required'),
});

export const updatePhotoZodSchema = z.object({
  folderId: z.string().optional(),
  photoName: z.string().optional(),
  photoUrl: z.string().url('Invalid photo URL').optional(),
  isDeleted: z.boolean().optional(),
});
