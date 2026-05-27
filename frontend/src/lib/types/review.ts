import { ReviewStatus } from "../enums/review.enum";
import { Member } from "./member";

export interface Review {
    _id: string;
    reviewRating: number;
    reviewText: string;
    reviewImages?: string[];
    reviewStatus: ReviewStatus;
    memberId: string;
    productId: string;
    memberData?: Member;
    createdAt: Date;
    updatedAt: Date;
}

export interface ReviewInput {
    reviewRating: number;
    reviewText: string;
    productId: string;
}
