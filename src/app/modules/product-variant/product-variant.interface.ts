export interface IVariantValue {
  value: string;
}

export interface IProductVariant {
  name: string;
  values: IVariantValue[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type TProductVariants = IProductVariant[];
