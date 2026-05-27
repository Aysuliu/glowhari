import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Chip,
    Box,
    Stack,
    IconButton,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Product } from "../../../lib/types/product";
import { useGlobals } from "../../hooks/useGlobals";
import useWishlist from "../../hooks/useWishlist";
import useBasket from "../../hooks/useBasket";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const { authMember } = useGlobals();
    const { isWishlisted, onToggle } = useWishlist();
    const { onAdd } = useBasket();
    const wishlisted = isWishlisted(product._id);

    const imageSrc = product.productImages?.[0]
        ? `${API_URL}/${product.productImages[0]}`
        : "/img/default-product.png";

    const handleWishlistClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!authMember) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        try {
            await onToggle(product._id, product);
        } catch (err) {
            console.log("Wishlist toggle error:", err);
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!authMember) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        onAdd({
            _id: product._id,
            quantity: 1,
            price: product.productPrice,
            name: product.productName,
            image: product.productImages?.[0] || "",
        });
    };

    return (
        <Card
            sx={{ cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
            onClick={() => navigate(`/products/${product._id}`)}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height={240}
                    image={imageSrc}
                    alt={product.productName}
                    sx={{ objectFit: "cover", bgcolor: "#faf6f3" }}
                />
                <IconButton
                    onClick={handleWishlistClick}
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        bgcolor: "rgba(255,255,255,0.9)",
                        "&:hover": { bgcolor: "#fff" },
                    }}
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    {wishlisted ? (
                        <FavoriteIcon sx={{ fontSize: 18, color: "secondary.main" }} />
                    ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    )}
                </IconButton>
                {product.productSkinType && product.productSkinType.length > 0 && (
                    <Chip
                        label={product.productSkinType[0]}
                        size="small"
                        sx={{
                            position: "absolute",
                            top: 10,
                            right: 10,
                            bgcolor: "secondary.main",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 11,
                        }}
                    />
                )}
                <IconButton
                    onClick={handleAddToCart}
                    size="small"
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        bgcolor: "primary.main",
                        color: "#fff",
                        "&:hover": { bgcolor: "primary.dark" },
                    }}
                    aria-label="Add to cart"
                >
                    <AddShoppingCartIcon sx={{ fontSize: 18 }} />
                </IconButton>
            </Box>
            <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                {product.productBrand && (
                    <Typography
                        variant="subtitle2"
                        sx={{ textTransform: "uppercase", letterSpacing: 1, fontSize: 12 }}
                    >
                        {product.productBrand}
                    </Typography>
                )}
                <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, mb: 0.5 }}>
                    {product.productName}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                    <Chip label={product.productSize} size="small" variant="outlined" sx={{ fontSize: 12, borderColor: "divider", color: "text.secondary" }} />
                    <Chip label={product.productCollection} size="small" variant="outlined" sx={{ fontSize: 12, borderColor: "divider", color: "text.secondary" }} />
                </Stack>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto" }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 700, color: "primary.main" }}>
                        ${product.productPrice}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <VisibilityOutlinedIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                        <Typography variant="subtitle2">{product.productViews}</Typography>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
