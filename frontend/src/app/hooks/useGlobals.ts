import { createContext, useContext } from "react";
import { Member } from "../../lib/types/member";
import { CartItem } from "../../lib/types/cart";
import { Wishlist } from "../../lib/types/wishlist";

export interface GlobalInterface {
    authMember: Member | null;
    setAuthMember: (member: Member | null) => void;
    orderBuilder: Date;
    setOrderBuilder: (input: Date) => void;
    cartItems: CartItem[];
    setCartItems: (items: CartItem[]) => void;
    wishlistItems: Wishlist[];
    setWishlistItems: (items: Wishlist[]) => void;
}

export const GlobalContext = createContext<GlobalInterface | undefined>(
    undefined
);

export const useGlobals = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) throw new Error("useGlobals within Provider");
    return context;
};
