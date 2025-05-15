import { Types } from 'mongoose';
import { TImage } from '../../interface/TImage';

export type TFolder = {
  name: string;
  isDeleted: boolean;
};

export type TPhoto = {
  folderId: Types.ObjectId;
  photoName: string;
  photo: TImage;
  isDeleted: boolean;
};
