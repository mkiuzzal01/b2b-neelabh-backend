import { model, Schema } from 'mongoose';
import { TFolder, TPhoto } from './gallery.interface';

export const folderSchema = new Schema<TFolder>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Folder = model<TFolder>('Folder', folderSchema);

export const photoSchema = new Schema<TPhoto>({
  folderId: {
    type: Schema.Types.ObjectId,
  },
  photoName: { type: String, unique: true },
  photo: {
    publicId: { type: String, required: true },
    url: { type: String, required: true },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Photo = model<TPhoto>('Photo', photoSchema);
