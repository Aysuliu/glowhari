import ReviewModel from "../schema/Review.model";
import { Review, ReviewInput, ReviewInquiry, ReviewUpdateInput } from "../libs/types/review";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";
import { ReviewStatus } from "../libs/enums/review.enum";

class ReviewService {
    private readonly reviewModel;

    constructor() {
        this.reviewModel = ReviewModel;
    }

    public async createReview(input: ReviewInput): Promise<Review> {
        try {
            return await this.reviewModel.create(input);
        } catch (err) {
            console.log("Error, model:createReview:", err);
            throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
        }
    }

    public async getProductReviews(inquiry: ReviewInquiry): Promise<Review[]> {
        const productId = shapeIntoMongooseObjectId(inquiry.productId);
        const result = await this.reviewModel.aggregate([
            {$match: {productId: productId, reviewStatus: ReviewStatus.ACTIVE}},
            {$sort: {createdAt: -1}},
            {$skip: (inquiry.page - 1) * inquiry.limit},
            {$limit: inquiry.limit},
            {
                $lookup: {
                    from: "members",
                    localField: "memberId",
                    foreignField: "_id",
                    as: "memberData",
                },
            },
            {$unwind: "$memberData"},
        ]).exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
    }
}

export default ReviewService;
