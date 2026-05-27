import axios from "axios";
import { OrderItemInput, OrderInquiry } from "../../lib/types/order";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const OrderService = {
    createOrder: async (items: OrderItemInput[]) => {
        const response = await axios.post(`${API_URL}/order/create`, items, {
            withCredentials: true,
        });
        return response.data;
    },

    getMyOrders: async (inquiry: OrderInquiry) => {
        const response = await axios.get(`${API_URL}/order/all`, {
            params: inquiry,
            withCredentials: true,
        });
        return response.data;
    },

    updateOrder: async (orderId: string, orderStatus: string) => {
        const response = await axios.post(
            `${API_URL}/order/update`,
            { orderId, orderStatus },
            { withCredentials: true }
        );
        return response.data;
    },
};

export default OrderService;
