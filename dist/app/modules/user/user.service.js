"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const stakeholder_model_1 = require("../stake-holder/stakeholder.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const seller_model_1 = require("../seller/seller.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_constant_1 = require("./user.constant");
const createStackHolderBD = (password, role, payload, creator) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const userData = {};
        userData.email = payload.email;
        userData.password = password || config_1.default.default_password;
        userData.role = role;
        //crate the user:
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        //create the stakeholder:
        payload.userId = newUser[0]._id;
        payload.creator = creator;
        const newAdmin = yield stakeholder_model_1.Stakeholder.create([payload], { session });
        if (!newAdmin.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create admin');
        }
        yield session.commitTransaction();
        session.endSession();
        return newAdmin;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const createSellerIntoBD = (password, payload, creator) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const userData = {
            email: payload.email,
            password: password || config_1.default.default_password,
            role: 'seller',
        };
        //create the user:
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        const createdUser = newUser[0];
        //create the bank account:
        const bankAccountPayload = Object.assign({ userId: createdUser._id }, payload.bankAccountInfo);
        const newBankAccount = yield user_model_1.BankAccount.create([bankAccountPayload], {
            session,
        });
        if (!newBankAccount.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create bank account');
        }
        const createdBankAccount = newBankAccount[0];
        //create the seller:
        payload.userId = createdUser._id;
        payload.bankAccountInfo = createdBankAccount._id;
        payload.creator = creator;
        const newSeller = yield seller_model_1.Seller.create([payload], { session });
        if (!newSeller.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create seller');
        }
        yield session.commitTransaction();
        session.endSession();
        return newSeller[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const updateUserIntoDB = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const existingUser = yield user_model_1.User.findById(id).session(session);
        if (!existingUser) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
        }
        // Update related document based on role
        if (existingUser.role === 'seller') {
            const updatedSeller = yield seller_model_1.Seller.findOneAndUpdate({ userId: id }, { isDeleted: payload === null || payload === void 0 ? void 0 : payload.isDeleted }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!updatedSeller) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Seller not found');
            }
        }
        else {
            const updatedStakeholder = yield stakeholder_model_1.Stakeholder.findOneAndUpdate({ userId: id }, { isDeleted: payload === null || payload === void 0 ? void 0 : payload.isDeleted }, {
                new: true,
                runValidators: true,
                session,
            });
            if (!updatedStakeholder) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Stakeholder not found');
            }
        }
        // Update main User document
        const updatedUser = yield user_model_1.User.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
            session,
        });
        yield session.commitTransaction();
        return updatedUser;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
//get all user form db:
const allUserFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(user_constant_1.userSearchableField)
        .filter()
        .paginate();
    const meta = yield userQuery.countTotal();
    const result = yield userQuery.modelQuery;
    return { meta, result };
});
// get user from db use by slug:
const singleUserBySlugFromDB = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ slug });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this user not found');
    }
    return result;
});
const singleUserByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'this user not found');
    }
    return result;
});
// this is service for overview :
const adminDashboardOverviewFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Basic counts
        const [totalUsers, totalStakeholders, totalSellers] = yield Promise.all([
            user_model_1.User.countDocuments(),
            stakeholder_model_1.Stakeholder.countDocuments(),
            seller_model_1.Seller.countDocuments(),
        ]);
        // Aggregate product, order, and revenue data
        const [productAgg, orderAgg, revenueAgg] = yield Promise.all([
            seller_model_1.Seller.aggregate([
                { $group: { _id: null, totalProducts: { $sum: '$productsCount' } } },
            ]),
            seller_model_1.Seller.aggregate([
                { $group: { _id: null, totalOrders: { $sum: '$ordersCount' } } },
            ]),
            seller_model_1.Seller.aggregate([
                { $group: { _id: null, totalRevenue: { $sum: '$revenue' } } },
            ]),
        ]);
        if (!productAgg.length || !orderAgg.length || !revenueAgg.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to fetch aggregated overview data.');
        }
        const totalProducts = productAgg[0].totalProducts || 0;
        const totalOrders = orderAgg[0].totalOrders || 0;
        const totalRevenue = revenueAgg[0].totalRevenue || 0;
        // Status-based overview
        const [activeUsers, inactiveUsers, activeStakeholders, inactiveStakeholders, activeSellers, inactiveSellers,] = yield Promise.all([
            user_model_1.User.countDocuments({ status: 'active' }),
            user_model_1.User.countDocuments({ status: 'inactive' }),
            stakeholder_model_1.Stakeholder.countDocuments({ status: 'active' }),
            stakeholder_model_1.Stakeholder.countDocuments({ status: 'inactive' }),
            seller_model_1.Seller.countDocuments({ status: 'active' }),
            seller_model_1.Seller.countDocuments({ status: 'inactive' }),
        ]);
        // Date-based overview
        const [usersByDate, stakeholdersByDate, sellersByDate] = yield Promise.all([
            user_model_1.User.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]),
            stakeholder_model_1.Stakeholder.aggregate([
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { _id: 1 } },
            ]),
            seller_model_1.Seller.aggregate([
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
        const [totalBankAccounts, bankAccountsByMethod, bankAccountsByStatus] = yield Promise.all([
            user_model_1.BankAccount.countDocuments(),
            user_model_1.BankAccount.aggregate([
                { $group: { _id: '$paymentMethod', count: { $sum: 1 } } },
                { $sort: { count: -1 } },
            ]),
            user_model_1.BankAccount.aggregate([
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
    }
    catch (error) {
        console.error('Error in adminDashboardOverviewFromDB:', error);
        throw error;
    }
});
const sellerDashboardOverviewFromDB = (sellerId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const totalProducts = yield seller_model_1.Seller.countDocuments({ _id: sellerId });
    const totalOrders = yield seller_model_1.Seller.countDocuments({ _id: sellerId });
    const totalRevenue = yield seller_model_1.Seller.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(sellerId) } },
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
        totalRevenue: ((_a = totalRevenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0,
    };
});
exports.userService = {
    createStackHolderBD,
    createSellerIntoBD,
    updateUserIntoDB,
    allUserFromDB,
    singleUserBySlugFromDB,
    singleUserByIdFromDB,
    adminDashboardOverviewFromDB,
    sellerDashboardOverviewFromDB,
};
