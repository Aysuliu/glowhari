import { useCallback } from "react";
import { useGlobals } from "./useGlobals";
import { CartItem } from "../../lib/types/cart";

const useBasket = () => {
    const { cartItems, setCartItems } = useGlobals();

    const onAdd = useCallback(
        (input: CartItem) => {
            const exist = cartItems.find((item) => item._id === input._id);
            if (exist) {
                const updated = cartItems.map((item) =>
                    item._id === input._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                setCartItems(updated);
                localStorage.setItem("cartData", JSON.stringify(updated));
            } else {
                const updated = [...cartItems, { ...input, quantity: 1 }];
                setCartItems(updated);
                localStorage.setItem("cartData", JSON.stringify(updated));
            }
        },
        [cartItems, setCartItems]
    );

    const onRemove = useCallback(
        (input: CartItem) => {
            const exist = cartItems.find((item) => item._id === input._id);
            if (!exist) return;
            let updated: CartItem[];
            if (exist.quantity === 1) {
                updated = cartItems.filter((item) => item._id !== input._id);
            } else {
                updated = cartItems.map((item) =>
                    item._id === input._id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
            setCartItems(updated);
            localStorage.setItem("cartData", JSON.stringify(updated));
        },
        [cartItems, setCartItems]
    );

    const onDelete = useCallback(
        (input: CartItem) => {
            const updated = cartItems.filter((item) => item._id !== input._id);
            setCartItems(updated);
            localStorage.setItem("cartData", JSON.stringify(updated));
        },
        [cartItems, setCartItems]
    );

    const onDeleteAll = useCallback(() => {
        setCartItems([]);
        localStorage.removeItem("cartData");
    }, [setCartItems]);

    return {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
    };
};

export default useBasket;
