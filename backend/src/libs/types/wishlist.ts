import {Types} from "mongoose";
type ObjectId = Types.ObjectId;

export interface Wishlist {
    _id: ObjectId;
    memberId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface WishlistInput {
    memberId: ObjectId;
    productId: ObjectId;
}
