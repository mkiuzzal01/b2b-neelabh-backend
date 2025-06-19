import { model, Schema } from 'mongoose';
import { gender } from './stakeholder-constant';
import validator from 'validator';
import { TStakeHolder, TStakeHolderName } from './stakeholder-interface';
import slugify from 'slugify';

const stakeholderNameSchema = new Schema<TStakeHolderName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, 'First name can not more then 20 characters'],
    validate: {
      validator: function (value) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const stakeholderSchema = new Schema<TStakeHolder>(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      unique: true,
      ref: 'User',
    },
    name: stakeholderNameSchema,
    slug: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    nid: { type: String, unique: true, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
      type: String,
      enum: {
        values: gender,
        message: '{VALUE} is not valid',
      },
      required: true,
    },
    dateOfJoining: { type: Date, required: true },
    address: {
      presentAddress: { type: String, required: true },
      permanentAddress: { type: String, required: true },
    },
    profileImage: {
      publicId: { type: String },
      url: { type: String },
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

stakeholderSchema.virtual('fullName').get(function (this: TStakeHolder) {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

stakeholderSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    const fullName = `${this.name.firstName} ${this.name.middleName || ''} ${this.name.lastName}`;
    this.slug = slugify(fullName.trim(), { lower: true, strict: true });
  }
  next();
});

export const Stakeholder = model<TStakeHolder>(
  'Stakeholder',
  stakeholderSchema,
);
