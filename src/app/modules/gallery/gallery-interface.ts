import { Types } from 'mongoose';

export type TFolder = {
  name: string;
  isDeleted: boolean;
};

export type TPhoto = {
  folderId: Types.ObjectId;
  photoName: string;
  photoUrl: string;
  isDeleted: boolean;
};
