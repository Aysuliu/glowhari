import axios from "axios";
import { ProductInquiry } from "../../lib/types/product";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const ProductService = {
    getProducts: async (inquiry: ProductInquiry) => {
        const params: any = {
            order: inquiry.order,
            page: inquiry.page,
            limit: inquiry.limit,
        };
        if (inquiry.productCollection) params.productCollection = inquiry.productCollection;
        if (inquiry.search) params.search = inquiry.search;
        if (inquiry.productSkinType) params.productSkinType = inquiry.productSkinType;

        const response = await axios.get(`${API_URL}/product/all`, {
            params,
            withCredentials: true,
        });
        return response.data;
    },

    getProduct: async (id: string) => {
        const response = await axios.get(`${API_URL}/product/${id}`, {
            withCredentials: true,
        });
        return response.data;
    },
};

export default ProductService;
