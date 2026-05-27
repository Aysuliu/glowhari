import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Button,
    Chip,
    Stack,
    Card,
    CardContent,
    IconButton,
    Divider,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import OrderService from "../../services/OrderService";
import { Order, OrderItemInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const statusColors: Record<string, "warning" | "info" | "success" | "error"> = {
    PAUSE: "warning",
    PROCESS: "info",
    FINISH: "success",
    DELETE: "error",
};

/** Cart & Checkout Page */
export const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { authMember, cartItems, setCartItems } = useGlobals();

    const removeItem = (id: string) => {
        const updated = cartItems.filter((item) => item._id !== id);
        setCartItems(updated);
        localStorage.setItem("cartData", JSON.stringify(updated));
    };

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = total < 50 ? 5 : 0;

    const handleCheckout = async () => {
        if (!authMember) {
            alert("Please login to checkout");
            navigate("/login");
            return;
        }
        try {
            const items: OrderItemInput[] = cartItems.map((item) => ({
                itemQuantity: item.quantity,
                itemPrice: item.price,
                productId: item._id,
            }));
            await OrderService.createOrder(items);
            setCartItems([]);
            localStorage.removeItem("cartData");
            alert("Order placed successfully!");
            navigate("/orders");
        } catch (err) {
            console.log("Checkout error:", err);
            alert("Checkout failed");
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <ShoppingBagOutlinedIcon sx={{ fontSize: 32, color: "primary.main" }} />
                <Typography variant="h2" sx={{ fontSize: 32 }}>Shopping Cart</Typography>
            </Stack>

            {cartItems.length === 0 ? (
                <Typography sx={{ textAlign: "center", color: "text.secondary", py: 8, fontSize: 18 }}>
                    Your cart is empty
                </Typography>
            ) : (
                <>
                    <Stack spacing={2} sx={{ mb: 4 }}>
                        {cartItems.map((item) => (
                            <Card key={item._id} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
                                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2, "&:last-child": { pb: 2 } }}>
                                    <Box
                                        component="img"
                                        src={item.image ? `${API_URL}/${item.image}` : "/img/default-product.png"}
                                        alt={item.name}
                                        sx={{ width: 80, height: 80, objectFit: "cover", borderRadius: 2 }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography fontWeight={600}>{item.name}</Typography>
                                        <Typography variant="body2">
                                            ${item.price} x {item.quantity}
                                        </Typography>
                                    </Box>
                                    <IconButton onClick={() => removeItem(item._id)} color="error" size="small">
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>

                    <Card elevation={0} sx={{ bgcolor: "#faf6f3", border: "1px solid", borderColor: "divider" }}>
                        <CardContent>
                            <Stack spacing={1}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography>Subtotal:</Typography>
                                    <Typography>${total.toFixed(2)}</Typography>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <LocalShippingOutlinedIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                                        <Typography>Shipping:</Typography>
                                    </Stack>
                                    <Typography>{shipping === 0 ? "Free" : `$${shipping}`}</Typography>
                                </Stack>
                                <Divider />
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="h6" fontSize={20}>Total:</Typography>
                                    <Typography variant="h6" fontSize={20}>${(total + shipping).toFixed(2)}</Typography>
                                </Stack>
                                {total < 50 && (
                                    <Typography variant="subtitle2" sx={{ color: "secondary.main" }}>
                                        Add ${(50 - total).toFixed(2)} more for free shipping!
                                    </Typography>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    onClick={handleCheckout}
                                    sx={{ mt: 1 }}
                                >
                                    Checkout
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </>
            )}
        </Container>
    );
};

/** Orders History Page */
export const OrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [status, setStatus] = useState<OrderStatus>(OrderStatus.PAUSE);

    const fetchOrders = async () => {
        try {
            const result = await OrderService.getMyOrders({ page: 1, limit: 20, orderStatus: status });
            setOrders(result);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
        try {
            await OrderService.updateOrder(orderId, newStatus);
            setStatus(newStatus);
        } catch (err) {
            console.log("Update error:", err);
            alert("Failed to update order status");
        }
    };

    useEffect(() => {
        fetchOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <Container maxWidth="md" sx={{ py: 5 }}>
            <Typography variant="h2" sx={{ fontSize: 32, mb: 3 }}>My Orders</Typography>

            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {Object.values(OrderStatus).map((s) => (
                    <Chip
                        key={s}
                        label={s}
                        onClick={() => setStatus(s)}
                        color={status === s ? statusColors[s] : "default"}
                        variant={status === s ? "filled" : "outlined"}
                    />
                ))}
            </Stack>

            {orders.length === 0 ? (
                <Typography sx={{ textAlign: "center", color: "text.secondary", py: 8, fontSize: 18 }}>
                    No orders found
                </Typography>
            ) : (
                <Stack spacing={2}>
                    {orders.map((order) => (
                        <Card key={order._id} elevation={0} sx={{ border: "1px solid", borderColor: "divider" }}>
                            <CardContent>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                                    <Typography fontWeight={600}>
                                        Order #{order.orderNumber
                                            ? order.orderNumber.toString().padStart(4, "0")
                                            : "—"}
                                    </Typography>
                                    <Chip
                                        label={order.orderStatus}
                                        size="small"
                                        color={statusColors[order.orderStatus] || "default"}
                                    />
                                </Stack>
                                <Stack direction="row" spacing={1.5} sx={{ mb: 1.5, overflowX: "auto" }}>
                                    {order.productData?.map((product) => (
                                        <Stack key={product._id} direction="row" alignItems="center" spacing={1}>
                                            <Box
                                                component="img"
                                                src={
                                                    product.productImages?.[0]
                                                        ? `${API_URL}/${product.productImages[0]}`
                                                        : "/img/default-product.png"
                                                }
                                                alt={product.productName}
                                                sx={{ width: 50, height: 50, objectFit: "cover", borderRadius: 1.5 }}
                                            />
                                            <Typography variant="body2">{product.productName}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2">
                                        Shipping: {order.orderDelivery === 0 ? "Free" : `$${order.orderDelivery}`}
                                    </Typography>
                                    <Typography fontWeight={700}>Total: ${order.orderTotal}</Typography>
                                </Stack>

                                {order.orderStatus === OrderStatus.PAUSE && (
                                    <Stack direction="row" spacing={1} sx={{ mt: 1.5, justifyContent: "flex-end" }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="info"
                                            startIcon={<PlayArrowIcon />}
                                            onClick={() => handleUpdateStatus(order._id, OrderStatus.PROCESS)}
                                        >
                                            Process
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteOutlineIcon />}
                                            onClick={() => handleUpdateStatus(order._id, OrderStatus.DELETE)}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                )}

                                {order.orderStatus === OrderStatus.PROCESS && (
                                    <Stack direction="row" spacing={1} sx={{ mt: 1.5, justifyContent: "flex-end" }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="success"
                                            startIcon={<CheckCircleOutlineIcon />}
                                            onClick={() => handleUpdateStatus(order._id, OrderStatus.FINISH)}
                                        >
                                            Finish
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            startIcon={<DeleteOutlineIcon />}
                                            onClick={() => handleUpdateStatus(order._id, OrderStatus.DELETE)}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            )}
        </Container>
    );
};
