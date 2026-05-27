import axios from "axios";
import { ReviewInput } from "../../lib/types/review";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const ReviewService = {
    createReview: async (input: ReviewInput) => {
        const response = await axios.post(`${API_URL}/review/create`, input, {
            withCredentials: true,
        });
        return response.data;
    },

    getProductReviews: async (productId: string, page = 1, limit = 10) => {
        const response = await axios.get(
            `${API_URL}/review/product/${productId}`,
            { params: { page, limit }, withCredentials: true }
        );
        return response.data;
    },
};

export default ReviewService;
