import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const WishlistService = {
    toggleWishlist: async (productId: string) => {
        const response = await axios.post(
            `${API_URL}/wishlist/toggle`,
            { productId },
            { withCredentials: true }
        );
        return response.data;
    },

    getMyWishlist: async () => {
        const response = await axios.get(`${API_URL}/wishlist/all`, {
            withCredentials: true,
        });
        return response.data;
    },
};

export default WishlistService;
