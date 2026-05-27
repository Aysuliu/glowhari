import { useCallback } from "react";
import { useGlobals } from "./useGlobals";
import { Wishlist } from "../../lib/types/wishlist";
import { Product } from "../../lib/types/product";
import WishlistService from "../services/WishlistService";

const useWishlist = () => {
    const { wishlistItems, setWishlistItems, authMember } = useGlobals();

    const isWishlisted = useCallback(
        (productId: string) =>
            wishlistItems.some((w) => w.productId === productId),
        [wishlistItems]
    );

    const onToggle = useCallback(
        async (productId: string, product?: Product) => {
            if (!authMember) throw new Error("Not authenticated");

            const previous = wishlistItems;
            const exists = wishlistItems.some((w) => w.productId === productId);

            if (exists) {
                setWishlistItems(
                    wishlistItems.filter((w) => w.productId !== productId)
                );
            } else {
                const optimistic: Wishlist = {
                    _id: `temp-${productId}`,
                    memberId: authMember._id,
                    productId,
                    productData: product,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                };
                setWishlistItems([...wishlistItems, optimistic]);
            }

            try {
                await WishlistService.toggleWishlist(productId);
            } catch (err) {
                setWishlistItems(previous);
                throw err;
            }
        },
        [authMember, wishlistItems, setWishlistItems]
    );

    return {
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isWishlisted,
        onToggle,
    };
};

export default useWishlist;
