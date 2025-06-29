/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { TBankAccountInfo, TRole, TUser } from './user.interface';
import config from '../../config';
import { BankAccount, User } from './user.model';
import { Stakeholder } from '../stake-holder/stakeholder.model';
import { TSeller } from '../seller/seller.interface';
import { TStakeHolder } from '../stake-holder/stakeholder.interface';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { Seller } from '../seller/seller.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableField } from './user.constant';

const createStackHolderBD = async (
  password: string,
  role: TRole,
  payload: TStakeHolder,
  creator: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userData: Partial<TUser> = {};
    userData.email = payload.email;
    userData.password = password || (config.default_password as string);
    userData.role = role;

    //crate the user:
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    //create the stakeholder:
    payload.userId = newUser[0]._id as any;
    payload.creator = creator;

    const newAdmin = await Stakeholder.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const createSellerIntoBD = async (
  password: string,
  payload: TSeller,
  creator: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userData: Partial<TUser> = {
      email: payload.email,
      password: password || (config.default_password as string),
      role: 'seller',
    };

    //create the user:
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create user');
    }

    const createdUser = newUser[0];

    //create the bank account:
    const bankAccountPayload: Partial<TBankAccountInfo> = {
      userId: createdUser._id as any,
      ...payload.bankAccountInfo,
    };

    const newBankAccount = await BankAccount.create([bankAccountPayload], {
      session,
    });
    if (!newBankAccount.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create bank account');
    }

    const createdBankAccount = newBankAccount[0];

    //create the seller:
    payload.userId = createdUser._id as any;
    payload.bankAccountInfo = createdBankAccount._id;
    payload.creator = creator;

    const newSeller = await Seller.create([payload], { session });
    if (!newSeller.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create seller');
    }
    await session.commitTransaction();
    session.endSession();
    return newSeller[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateUserIntoDB = async (payload: Partial<TUser>, id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findById(id).session(session);
    if (!existingUser) {
      throw new AppError(status.NOT_FOUND, 'User not found');
    }

    // Update related document based on role
    if (existingUser.role === 'seller') {
      const updatedSeller = await Seller.findOneAndUpdate(
        { userId: id },
        { isDeleted: payload?.isDeleted },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!updatedSeller) {
        throw new AppError(status.NOT_FOUND, 'Seller not found');
      }
    } else {
      const updatedStakeholder = await Stakeholder.findOneAndUpdate(
        { userId: id },
        { isDeleted: payload?.isDeleted },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!updatedStakeholder) {
        throw new AppError(status.NOT_FOUND, 'Stakeholder not found');
      }
    }

    // Update main User document
    const updatedUser = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    });

    await session.commitTransaction();
    return updatedUser;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

//get all user form db:
const allUserFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query).search(
    userSearchableField,
  );

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;
  return { meta, result };
};

// get user from db use by slug:
const singleUserBySlugFromDB = async (slug: string) => {
  const result = await User.findOne({ slug });
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'this user not found');
  }
  return result;
};

const singleUserByIdFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'this user not found');
  }
  return result;
};

// this is service for overview :
const adminDashboardOverviewFromDB = async () => {
  try {
    // Basic counts
    const [totalUsers, totalStakeholders, totalSellers] = await Promise.all([
      User.countDocuments(),
      Stakeholder.countDocuments(),
      Seller.countDocuments(),
    ]);

    // Aggregate product, order, and revenue data
    const [productAgg, orderAgg, revenueAgg] = await Promise.all([
      Seller.aggregate([
        { $group: { _id: null, totalProducts: { $sum: '$productsCount' } } },
      ]),
      Seller.aggregate([
        { $group: { _id: null, totalOrders: { $sum: '$ordersCount' } } },
      ]),
      Seller.aggregate([
        { $group: { _id: null, totalRevenue: { $sum: '$revenue' } } },
      ]),
    ]);

    if (!productAgg.length || !orderAgg.length || !revenueAgg.length) {
      throw new AppError(
        status.BAD_REQUEST,
        'Failed to fetch aggregated overview data.',
      );
    }

    const totalProducts = productAgg[0].totalProducts || 0;
    const totalOrders = orderAgg[0].totalOrders || 0;
    const totalRevenue = revenueAgg[0].totalRevenue || 0;

    // Status-based overview
    const [
      activeUsers,
      inactiveUsers,
      activeStakeholders,
      inactiveStakeholders,
      activeSellers,
      inactiveSellers,
    ] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'inactive' }),
      Stakeholder.countDocuments({ status: 'active' }),
      Stakeholder.countDocuments({ status: 'inactive' }),
      Seller.countDocuments({ status: 'active' }),
      Seller.countDocuments({ status: 'inactive' }),
    ]);

    // Date-based overview
    const [usersByDate, stakeholdersByDate, sellersByDate] = await Promise.all([
      User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Stakeholder.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Seller.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    // Payment method overview
    const [totalBankAccounts, bankAccountsByMethod, bankAccountsByStatus] =
      await Promise.all([
        BankAccount.countDocuments(),
        BankAccount.aggregate([
          { $group: { _id: '$paymentMethod', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
        BankAccount.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]),
      ]);

    // Final response
    return {
      summary: {
        totalUsers,
        totalStakeholders,
        totalSellers,
        totalProducts,
        totalOrders,
        totalRevenue,
      },
      overviewByRole: {
        users: totalUsers,
        stakeholders: totalStakeholders,
        sellers: totalSellers,
        products: totalProducts,
        orders: totalOrders,
        revenue: totalRevenue,
      },
      overviewByStatus: {
        activeUsers,
        inactiveUsers,
        activeStakeholders,
        inactiveStakeholders,
        activeSellers,
        inactiveSellers,
      },
      overviewByDate: {
        totalUsersByDate: usersByDate,
        totalStakeholdersByDate: stakeholdersByDate,
        totalSellersByDate: sellersByDate,
      },
      overviewByPaymentMethod: {
        totalBankAccounts,
        totalBankAccountsByMethod: bankAccountsByMethod,
        totalBankAccountsByStatus: bankAccountsByStatus,
      },
    };
  } catch (error) {
    console.error('Error in adminDashboardOverviewFromDB:', error);
    throw error;
  }
};

const sellerDashboardOverviewFromDB = async (sellerId: string) => {
  const totalProducts = await Seller.countDocuments({ _id: sellerId });
  const totalOrders = await Seller.countDocuments({ _id: sellerId });
  const totalRevenue = await Seller.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(sellerId) } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$revenue' },
      },
    },
  ]);
  return {
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue[0]?.totalRevenue || 0,
  };
};

export const userService = {
  createStackHolderBD,
  createSellerIntoBD,
  updateUserIntoDB,
  allUserFromDB,
  singleUserBySlugFromDB,
  singleUserByIdFromDB,
  adminDashboardOverviewFromDB,
  sellerDashboardOverviewFromDB,
};
