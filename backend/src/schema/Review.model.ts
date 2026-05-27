import mongoose, { Schema } from "mongoose";
import { ReviewStatus } from "../libs/enums/review.enum";

const reviewSchema = new Schema({
    reviewRating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    reviewText: {
        type: String,
        required: true,
    },

    reviewImages: {
        type: [String],
        default: [],
    },

    reviewStatus: {
        type: String,
        enum: ReviewStatus,
        default: ReviewStatus.ACTIVE,
    },

    memberId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Member",
    },

    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
},
{timestamps: true, collection: "reviews"}
);

reviewSchema.index({memberId: 1, productId: 1}, {unique: true});

export default mongoose.model("Review", reviewSchema);
