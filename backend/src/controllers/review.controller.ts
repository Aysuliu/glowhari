import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Request, Response } from "express";
import Errors, { HttpCode } from "../libs/Errors";
import ReviewService from "../models/Review.service";
import { ReviewInput, ReviewInquiry } from "../libs/types/review";
import { shapeIntoMongooseObjectId } from "../libs/config";

const reviewService = new ReviewService();
const reviewController: T = {};

reviewController.createReview = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("createReview:");
        const input: ReviewInput = req.body;
        input.memberId = req.member._id;
        const result = await reviewService.createReview(input);
        res.status(HttpCode.CREATED).json(result);
    } catch (err) {
        console.log("Error, createReview:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

reviewController.getProductReviews = async (req: Request, res: Response) => {
    try {
        console.log("getProductReviews:");
        const {id} = req.params;
        const {page, limit} = req.query;
        const inquiry: ReviewInquiry = {
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            productId: shapeIntoMongooseObjectId(id),
        };
        const result = await reviewService.getProductReviews(inquiry);
        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getProductReviews:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default reviewController;
