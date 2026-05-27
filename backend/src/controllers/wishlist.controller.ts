import { ExtendedRequest } from "../libs/types/member";
import { T } from "../libs/types/common";
import { Response } from "express";
import Errors, { HttpCode } from "../libs/Errors";
import WishlistService from "../models/Wishlist.service";

const wishlistService = new WishlistService();
const wishlistController: T = {};

wishlistController.toggleWishlist = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("toggleWishlist:");
        const result = await wishlistService.toggleWishlist({
            memberId: req.member._id,
            productId: req.body.productId,
        });
        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, toggleWishlist:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

wishlistController.getMyWishlist = async (req: ExtendedRequest, res: Response) => {
    try {
        console.log("getMyWishlist:");
        const result = await wishlistService.getMyWishlist(req.member._id as unknown as string);
        res.status(HttpCode.OK).json(result);
    } catch (err) {
        console.log("Error, getMyWishlist:", err);
        if (err instanceof Errors) res.status(err.code).json(err);
        else res.status(Errors.standard.code).json(Errors.standard);
    }
};

export default wishlistController;
