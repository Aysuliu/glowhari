import React, { ReactNode, useEffect, useState } from "react";
import { Member } from "../../lib/types/member";
import { CartItem } from "../../lib/types/cart";
import { Wishlist } from "../../lib/types/wishlist";
import { GlobalContext } from "../hooks/useGlobals";
import MemberService from "../services/MemberService";
import WishlistService from "../services/WishlistService";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authMember, setAuthMember] = useState<Member | null>(
        localStorage.getItem("memberData")
            ? JSON.parse(localStorage.getItem("memberData") as string)
            : null
    );
    const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("cartData");
        return stored ? JSON.parse(stored) : [];
    });
    const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);

    useEffect(() => {
        if (!localStorage.getItem("memberData")) return;

        MemberService.getMemberDetail()
            .then((member: Member) => {
                setAuthMember(member);
                localStorage.setItem("memberData", JSON.stringify(member));
            })
            .catch(() => {
                // 401 handled by axios interceptor (clears storage + redirects)
            });
    }, []);

    useEffect(() => {
        if (!authMember) {
            setWishlistItems([]);
            return;
        }
        WishlistService.getMyWishlist()
            .then((items: Wishlist[]) => setWishlistItems(items))
            .catch((err) => console.log("Wishlist hydrate error:", err));
    }, [authMember?._id]);

    return (
        <GlobalContext.Provider
            value={{
                authMember,
                setAuthMember,
                orderBuilder,
                setOrderBuilder,
                cartItems,
                setCartItems,
                wishlistItems,
                setWishlistItems,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default ContextProvider;
