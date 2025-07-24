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
exports.productService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("./product.model");
const category_model_1 = require("../category/category.model");
const mongoose_1 = __importDefault(require("mongoose"));
const product_variant_model_1 = require("../product-variant/product-variant.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_constant_1 = require("./product.constant");
const createProductIntoBD = (payload, creatorId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        return yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const { productCode, categories, variants, totalQuantity } = payload;
            // Validate required fields
            if (!variants || variants.length === 0) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'At least one variant is required');
            }
            // Check if product code exists
            const existingProduct = yield product_model_1.Product.findOne({ productCode }).session(session);
            if (existingProduct) {
                throw new AppError_1.default(http_status_1.default.CONFLICT, 'Product code already exists');
            }
            // Validate categories
            const [mainCat, cat, subCat] = yield Promise.all([
                category_model_1.MainCategory.findById(categories.mainCategory).session(session),
                category_model_1.Category.findById(categories.category).session(session),
                category_model_1.SubCategory.findById(categories.subCategory).session(session),
            ]);
            if (!mainCat) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main category not found');
            }
            if (!cat) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
            }
            if (!subCat) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Sub-category not found');
            }
            // Calculate sum of all variant quantities
            const calculatedTotalQuantity = variants.reduce((sum, variant) => {
                return (sum +
                    variant.attributes.reduce((acc, attr) => {
                        const qty = Number(attr.quantity);
                        if (isNaN(qty) || qty < 0) {
                            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Invalid quantity "${attr.quantity}" in variant "${variant.name}"`);
                        }
                        return acc + qty;
                    }, 0));
            }, 0);
            // Validate total quantity matches sum of variants
            if (totalQuantity !== undefined &&
                totalQuantity !== calculatedTotalQuantity) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Total quantity (${totalQuantity}) does not match sum of variant quantities (${calculatedTotalQuantity})`);
            }
            // Update or create product variants
            const bulkVariantOps = variants.map((variant) => ({
                updateOne: {
                    filter: { name: variant.name.toLowerCase() },
                    update: {
                        $setOnInsert: { name: variant.name.toLowerCase() },
                        $addToSet: {
                            attributes: {
                                $each: variant.attributes.map((a) => ({
                                    value: a.value.toLowerCase(),
                                })),
                            },
                        },
                    },
                    upsert: true,
                },
            }));
            if (bulkVariantOps.length > 0) {
                yield product_variant_model_1.ProductVariant.bulkWrite(bulkVariantOps, { session });
            }
            // Create the product with calculated total quantity
            const product = new product_model_1.Product(Object.assign(Object.assign({}, payload), { totalQuantity: calculatedTotalQuantity, creatorId: new mongoose_1.default.Types.ObjectId(creatorId) }));
            yield product.save({ session });
            return product;
        }));
    }
    finally {
        session.endSession();
    }
});
const updateProductIntoBD = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        return yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            const existingProduct = yield product_model_1.Product.findById(id).session(session);
            if (!existingProduct) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
            }
            // Validate categories if they're being updated
            if (payload.categories) {
                const [mainCat, cat, subCat] = yield Promise.all([
                    category_model_1.MainCategory.findById(payload.categories.mainCategory).session(session),
                    category_model_1.Category.findById(payload.categories.category).session(session),
                    category_model_1.SubCategory.findById(payload.categories.subCategory).session(session),
                ]);
                if (!mainCat) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main category not found');
                }
                if (!cat) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Category not found');
                }
                if (!subCat) {
                    throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Sub-category not found');
                }
            }
            // Validate variants and quantities if they're being updated
            if (payload.variants) {
                const calculatedTotalQuantity = payload.variants.reduce((sum, variant) => {
                    return (sum +
                        variant.attributes.reduce((acc, attr) => {
                            const qty = Number(attr.quantity);
                            if (isNaN(qty) || qty < 0) {
                                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Invalid quantity "${attr.quantity}" in variant "${variant.name}"`);
                            }
                            return acc + qty;
                        }, 0));
                }, 0);
                // If totalQuantity is provided, validate it matches the sum
                if (payload.totalQuantity !== undefined &&
                    payload.totalQuantity !== calculatedTotalQuantity) {
                    throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Total quantity (${payload.totalQuantity}) does not match sum of variant quantities (${calculatedTotalQuantity})`);
                }
                // Update the totalQuantity in payload to ensure consistency
                payload.totalQuantity = calculatedTotalQuantity;
                // Update product variants
                const bulkVariantOps = payload.variants.map((variant) => ({
                    updateOne: {
                        filter: { name: variant.name.toLowerCase() },
                        update: {
                            $setOnInsert: { name: variant.name.toLowerCase() },
                            $addToSet: {
                                attributes: {
                                    $each: variant.attributes.map((a) => ({
                                        value: a.value.toLowerCase(),
                                    })),
                                },
                            },
                        },
                        upsert: true,
                    },
                }));
                if (bulkVariantOps.length > 0) {
                    yield product_variant_model_1.ProductVariant.bulkWrite(bulkVariantOps, { session });
                }
            }
            const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, payload, {
                new: true,
                runValidators: true,
                session,
            });
            return updatedProduct;
        }));
    }
    finally {
        session.endSession();
    }
});
const allProductFromBD = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.Product.find().populate([
        { path: 'categories.mainCategory' },
        { path: 'categories.category' },
        { path: 'categories.subCategory' },
    ]), query)
        .search(product_constant_1.productSearchableField)
        .fields()
        .filter()
        .paginate()
        .sort();
    const meta = yield productQuery.countTotal();
    const result = yield productQuery.modelQuery;
    return { meta, result };
});
const singleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id).populate([
        { path: 'categories.mainCategory' },
        { path: 'categories.category' },
        { path: 'categories.subCategory' },
        { path: 'Photo' },
    ]);
    return result;
});
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.Product.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
        runValidators: true,
    });
    return null;
});
exports.productService = {
    createProductIntoBD,
    updateProductIntoBD,
    allProductFromBD,
    singleProductFromDB,
    deleteProductFromDB,
};
