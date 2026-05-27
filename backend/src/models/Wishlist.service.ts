import WishlistModel from "../schema/Wishlist.model";
import { Wishlist, WishlistInput } from "../libs/types/wishlist";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { shapeIntoMongooseObjectId } from "../libs/config";

class WishlistService {
    private readonly wishlistModel;

    constructor() {
        this.wishlistModel = WishlistModel;
    }

    public async toggleWishlist(input: WishlistInput): Promise<{toggled: boolean}> {
        const memberId = shapeIntoMongooseObjectId(input.memberId);
        const productId = shapeIntoMongooseObjectId(input.productId);

        const exist = await this.wishlistModel
            .findOne({memberId, productId})
            .exec();

        if (exist) {
            await this.wishlistModel.deleteOne({_id: exist._id}).exec();
            return {toggled: false}; // removed from wishlist
        } else {
            await this.wishlistModel.create({memberId, productId});
            return {toggled: true}; // added to wishlist
        }
    }

    public async getMyWishlist(memberId: string): Promise<Wishlist[]> {
        const id = shapeIntoMongooseObjectId(memberId);
        const result = await this.wishlistModel.aggregate([
            {$match: {memberId: id}},
            {$sort: {createdAt: -1}},
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productData",
                },
            },
            {$unwind: "$productData"},
        ]).exec();
        if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
        return result;
    }
}

export default WishlistService;
