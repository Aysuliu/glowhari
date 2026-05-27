import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product";

export interface OrderItem {
    _id: string;
    itemQuantity: number;
    itemPrice: number;
    orderId: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Order {
    _id: string;
    orderNumber?: number;
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;
    orderItems: OrderItem[];
    productData: Product[];
}

export interface OrderItemInput {
    itemQuantity: number;
    itemPrice: number;
    productId: string;
}

export interface OrderInquiry {
    page: number;
    limit: number;
    orderStatus: OrderStatus;
}
