import {Types} from "mongoose";
type ObjectId = Types.ObjectId;
import { ReviewStatus } from "../enums/review.enum";

export interface Review {
    _id: ObjectId;
    reviewRating: number;
    reviewText: string;
    reviewImages?: string[];
    reviewStatus: ReviewStatus;
    memberId: ObjectId;
    productId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewInput {
    reviewRating: number;
    reviewText: string;
    reviewImages?: string[];
    memberId?: ObjectId;
    productId: ObjectId;
}

export interface ReviewInquiry {
    page: number;
    limit: number;
    productId: ObjectId;
}

export interface ReviewUpdateInput {
    _id: ObjectId;
    reviewStatus?: ReviewStatus;
    reviewRating?: number;
    reviewText?: string;
}
