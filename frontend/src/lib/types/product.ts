import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";
import { SkinType } from "../enums/member.enum";

export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    productBrand?: string;
    productSkinType?: SkinType[];
    productIngredients?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string;
    productSkinType?: SkinType;
}
