import { TSeller } from './seller-interface';
import { Seller } from './seller-model';

const updateSellerIntoDB = async (sellerId: string, payload: TSeller) => {};
const getAllSellersFromDB = async () => {
  const result = await Seller.find();
  return result;
};

const getSingleSellerFromDB = async (sellerId: string) => {
  const result = await Seller.findById(sellerId);
  return result;
};

export const sellerService = {
  updateSellerIntoDB,
  getAllSellersFromDB,
  getSingleSellerFromDB,
};
