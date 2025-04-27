import { model, Schema } from 'mongoose';
import { TUser } from './user-interface';
import { profileStatus } from './user-constant';

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: profileStatus,
      default: 'active',
    },
    password: {
      type: String,
      required: true,
    },
    isPasswordChanged: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// userSchema.pre('save', async function (next)=>{
//   if(!this.is)
// })

export const User = model<TUser>('User', userSchema);
