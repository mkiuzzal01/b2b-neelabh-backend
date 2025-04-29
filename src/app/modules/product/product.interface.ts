export type TStatus = 'in-stock' | 'out-of-stock' | 'upcoming';
export type TActivity = 'in-stock' | 'market-launch';

export type TProductVariant = {
  name: string;
  sizeWithQuantity: {
    [attribute: string]: number;
  };
};

export type TProduct = {
  productCode: string;
  title: string;
  subTitle?: string;
  variants: TProductVariant[];
  price: number;
  discount: number;
  rating?: number;
  category: string;
  subCategory?: string;
  description: string;
  status: TStatus;
  activity: TActivity;
  isDeleted: boolean;
};
