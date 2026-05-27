import { Product } from "./product";

export interface Wishlist {
    _id: string;
    memberId: string;
    productId: string;
    productData?: Product;
    createdAt: Date;
    updatedAt: Date;
}
