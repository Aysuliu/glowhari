import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Badge,
    Box,
    Container,
    Popover,
    Stack,
    Divider,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGlobals } from "../../hooks/useGlobals";
import useWishlist from "../../hooks/useWishlist";
import MemberService from "../../services/MemberService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const Navbar: React.FC = () => {
    const { authMember, setAuthMember, cartItems } = useGlobals();
    const { wishlistCount } = useWishlist();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleLogout = async () => {
        try {
            await MemberService.logout();
            setAuthMember(null);
            localStorage.removeItem("memberData");
            navigate("/");
        } catch (err) {
            console.log("Logout error:", err);
        }
    };

    const handleCartHover = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleCartLeave = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "background.paper",
                borderBottom: "1px solid",
                borderColor: "divider",
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ height: 70, justifyContent: "space-between" }}>
                    <Typography
                        component={RouterLink}
                        to="/"
                        variant="h5"
                        sx={{
                            fontFamily: "'Georgia', serif",
                            fontWeight: 700,
                            color: "primary.main",
                            textDecoration: "none",
                            letterSpacing: 2,
                            fontSize: 28,
                        }}
                    >
                        GlowHari
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Button
                            component={RouterLink}
                            to="/"
                            sx={{ color: "primary.main", "&:hover": { color: "secondary.main" } }}
                        >
                            Home
                        </Button>
                        <Button
                            component={RouterLink}
                            to="/products"
                            sx={{ color: "primary.main", "&:hover": { color: "secondary.main" } }}
                        >
                            Shop
                        </Button>

                        {authMember ? (
                            <>
                                <Button
                                    component={RouterLink}
                                    to="/orders"
                                    sx={{ color: "primary.main", "&:hover": { color: "secondary.main" } }}
                                >
                                    Orders
                                </Button>

                                <Box
                                    onMouseEnter={handleCartHover}
                                    onMouseLeave={handleCartLeave}
                                    sx={{ display: "inline-flex" }}
                                >
                                    <IconButton
                                        component={RouterLink}
                                        to="/cart"
                                        sx={{ color: "primary.main" }}
                                    >
                                        <Badge badgeContent={cartCount} color="secondary">
                                            <ShoppingCartOutlinedIcon />
                                        </Badge>
                                    </IconButton>

                                    <Popover
                                        open={Boolean(anchorEl)}
                                        anchorEl={anchorEl}
                                        onClose={handleCartLeave}
                                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                                        disableRestoreFocus
                                        sx={{ pointerEvents: "none", mt: 1 }}
                                        slotProps={{
                                            paper: {
                                                sx: {
                                                    pointerEvents: "auto",
                                                    minWidth: 280,
                                                    maxWidth: 340,
                                                    p: 2,
                                                    borderRadius: 2,
                                                },
                                                onMouseEnter: handleCartHover,
                                                onMouseLeave: handleCartLeave,
                                            },
                                        }}
                                    >
                                        {cartItems.length === 0 ? (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ textAlign: "center", py: 2 }}
                                            >
                                                Your cart is empty
                                            </Typography>
                                        ) : (
                                            <>
                                                <Typography fontWeight={600} sx={{ mb: 1 }}>
                                                    Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
                                                </Typography>
                                                <Stack spacing={1.5} sx={{ maxHeight: 260, overflowY: "auto" }}>
                                                    {cartItems.map((item) => (
                                                        <Stack
                                                            key={item._id}
                                                            direction="row"
                                                            spacing={1.5}
                                                            alignItems="center"
                                                        >
                                                            <Box
                                                                component="img"
                                                                src={
                                                                    item.image
                                                                        ? `${API_URL}/${item.image}`
                                                                        : "/img/default-product.png"
                                                                }
                                                                alt={item.name}
                                                                sx={{
                                                                    width: 44,
                                                                    height: 44,
                                                                    objectFit: "cover",
                                                                    borderRadius: 1,
                                                                }}
                                                            />
                                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                                <Typography
                                                                    variant="body2"
                                                                    fontWeight={600}
                                                                    noWrap
                                                                >
                                                                    {item.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                >
                                                                    {item.quantity} x ${item.price}
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2" fontWeight={600}>
                                                                ${(item.quantity * item.price).toFixed(2)}
                                                            </Typography>
                                                        </Stack>
                                                    ))}
                                                </Stack>
                                                <Divider sx={{ my: 1.5 }} />
                                                <Stack spacing={0.5}>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                    >
                                                        <Typography variant="body2">Subtotal</Typography>
                                                        <Typography variant="body2">
                                                            ${cartTotal.toFixed(2)}
                                                        </Typography>
                                                    </Stack>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                    >
                                                        <Typography variant="body2">Shipping</Typography>
                                                        <Typography variant="body2">
                                                            {cartTotal >= 50 ? "Free" : "$5.00"}
                                                        </Typography>
                                                    </Stack>
                                                    <Divider sx={{ my: 0.5 }} />
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                    >
                                                        <Typography fontWeight={600}>Total</Typography>
                                                        <Typography fontWeight={700} color="primary.main">
                                                            ${(cartTotal + (cartTotal < 50 ? 5 : 0)).toFixed(2)}
                                                        </Typography>
                                                    </Stack>
                                                    {cartTotal < 50 && (
                                                        <Typography variant="caption" color="secondary.main">
                                                            Add ${(50 - cartTotal).toFixed(2)} more for free shipping!
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            </>
                                        )}
                                    </Popover>
                                </Box>

                                <IconButton component={RouterLink} to="/wishlist" sx={{ color: "primary.main" }}>
                                    <Badge badgeContent={wishlistCount} color="secondary">
                                        <FavoriteBorderIcon />
                                    </Badge>
                                </IconButton>
                                <Button
                                    component={RouterLink}
                                    to="/member"
                                    startIcon={<PersonOutlineIcon />}
                                    sx={{ color: "primary.main", "&:hover": { color: "secondary.main" } }}
                                >
                                    {authMember.memberNick}
                                </Button>
                                <IconButton onClick={handleLogout} sx={{ color: "secondary.dark" }}>
                                    <LogoutIcon />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <Button
                                    component={RouterLink}
                                    to="/login"
                                    variant="outlined"
                                    color="secondary"
                                    size="small"
                                >
                                    Login
                                </Button>
                                <Button
                                    component={RouterLink}
                                    to="/signup"
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                >
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
