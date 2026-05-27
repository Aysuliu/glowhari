import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Chip,
    Grid,
    Stack,
    IconButton,
    Rating,
    Divider,
    Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Product } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import ProductCard from "../../components/products/ProductCard";
import ReviewService from "../../services/ReviewService";
import WishlistService from "../../services/WishlistService";
import { Review, ReviewInput } from "../../../lib/types/review";
import { useGlobals } from "../../hooks/useGlobals";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";
const ITEMS_PER_PAGE = 8;

/** Products List Page */
export const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [collection, setCollection] = useState<string>("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProducts = async () => {
        try {
            const inquiry: any = { order: "createdAt", page, limit: ITEMS_PER_PAGE };
            if (collection) inquiry.productCollection = collection;
            if (search) inquiry.search = search;
            const result = await ProductService.getProducts(inquiry);
            setProducts(result);
            // Estimate total pages: if we got a full page, there might be more
            if (result.length === ITEMS_PER_PAGE) {
                setTotalPages(Math.max(totalPages, page + 1));
            } else {
                setTotalPages(page);
            }
        } catch (err) {
            console.log("Error:", err);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, collection]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchProducts();
    };

    const collections = Object.values(ProductCollection);

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
                <Typography variant="h1" sx={{ fontSize: 36 }}>Shop Skincare</Typography>
                <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 1 }}>
                    <TextField
                        size="small"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ width: 280 }}
                    />
                    <Button type="submit" variant="contained" color="secondary" startIcon={<SearchIcon />}>
                        Search
                    </Button>
                </Box>
            </Box>

            {/* Filter bar */}
            <Stack direction="row" spacing={1} sx={{ mb: 4, flexWrap: "wrap", gap: 1 }}>
                <Chip
                    label="All"
                    onClick={() => { setCollection(""); setPage(1); }}
                    color={!collection ? "secondary" : "default"}
                    variant={!collection ? "filled" : "outlined"}
                />
                {collections.map((col) => (
                    <Chip
                        key={col}
                        label={col.replace("_", " ")}
                        onClick={() => { setCollection(col); setPage(1); }}
                        color={collection === col ? "secondary" : "default"}
                        variant={collection === col ? "filled" : "outlined"}
                    />
                ))}
            </Stack>

            {/* Products Grid */}
            <Grid container spacing={3}>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Grid key={product._id} size={{ xs: 6, sm: 4, md: 3 }}>
                            <ProductCard product={product} />
                        </Grid>
                    ))
                ) : (
                    <Grid size={{ xs: 12 }}>
                        <Typography sx={{ textAlign: "center", color: "text.secondary", py: 8, fontSize: 18 }}>
                            No products found
                        </Typography>
                    </Grid>
                )}
            </Grid>

            {/* MUI Pagination */}
            <Stack alignItems="center" sx={{ mt: 5 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(_, value) => setPage(value)}
                    color="secondary"
                    size="large"
                    showFirstButton
                    showLastButton
                />
            </Stack>
        </Container>
    );
};

/** Product Detail Page */
export const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { authMember, cartItems, setCartItems } = useGlobals();
    const [product, setProduct] = useState<Product | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewInput, setReviewInput] = useState<ReviewInput>({
        reviewRating: 5,
        reviewText: "",
        productId: id || "",
    });
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [descExpanded, setDescExpanded] = useState(false);
    const [ingredientsExpanded, setIngredientsExpanded] = useState(false);

    const PREVIEW_LEN = 120;

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const result = await ProductService.getProduct(id);
                setProduct(result);
                const reviewData = await ReviewService.getProductReviews(id);
                setReviews(reviewData);
            } catch (err) {
                console.log("Error:", err);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        if (!authMember) {
            alert("Please login first");
            navigate("/login");
            return;
        }
        try {
            const exist = cartItems.find((item) => item._id === product._id);
            let updated;
            if (exist) {
                updated = cartItems.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                updated = [
                    ...cartItems,
                    {
                        _id: product._id,
                        quantity,
                        price: product.productPrice,
                        name: product.productName,
                        image: product.productImages?.[0] || "",
                    },
                ];
            }
            setCartItems(updated);
            localStorage.setItem("cartData", JSON.stringify(updated));
            alert("Added to cart!");
        } catch (err) {
            alert("Failed to add to cart");
        }
    };

    const handleWishlist = async () => {
        if (!product) return;
        try {
            const result = await WishlistService.toggleWishlist(product._id);
            alert(result.toggled ? "Added to wishlist!" : "Removed from wishlist");
        } catch (err) {
            alert("Please login first");
            navigate("/login");
        }
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ReviewService.createReview(reviewInput);
            const updated = await ReviewService.getProductReviews(id || "");
            setReviews(updated);
            setReviewInput({ ...reviewInput, reviewText: "", reviewRating: 5 });
        } catch (err) {
            alert("Failed to submit review. You may have already reviewed this product.");
        }
    };

    if (!product) {
        return (
            <Box sx={{ textAlign: "center", py: 8 }}>
                <Typography color="text.secondary" fontSize={18}>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Grid container spacing={5} sx={{ mb: 8 }}>
                {/* Images */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        component="img"
                        src={`${API_URL}/${product.productImages[selectedImage]}`}
                        alt={`${product.productName} ${selectedImage + 1}`}
                        sx={{ width: "100%", height: 450, objectFit: "cover", borderRadius: 3, mb: 1.5 }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            overflowX: "auto",
                            pb: 1,
                            "&::-webkit-scrollbar": { height: 6 },
                            "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 3 },
                        }}
                    >
                        {product.productImages.map((img, idx) => (
                            <Box
                                key={idx}
                                component="img"
                                src={`${API_URL}/${img}`}
                                alt={`${product.productName} thumbnail ${idx + 1}`}
                                onClick={() => setSelectedImage(idx)}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    flexShrink: 0,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    border: "2px solid",
                                    borderColor: selectedImage === idx ? "primary.main" : "transparent",
                                    opacity: selectedImage === idx ? 1 : 0.7,
                                    transition: "opacity 0.2s, border-color 0.2s",
                                    "&:hover": { opacity: 1 },
                                }}
                            />
                        ))}
                    </Box>
                </Grid>

                {/* Info */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1.5}>
                        {product.productBrand && (
                            <Typography variant="subtitle2" sx={{ textTransform: "uppercase", letterSpacing: 1 }}>
                                {product.productBrand}
                            </Typography>
                        )}
                        <Typography variant="h3" sx={{ fontSize: 32 }}>{product.productName}</Typography>
                        <Typography sx={{ fontSize: 28, fontWeight: 700, color: "primary.main" }}>
                            ${product.productPrice}
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            <Chip label={`Size: ${product.productSize}`} size="small" variant="outlined" />
                            <Chip label={product.productCollection} size="small" variant="outlined" />
                            <Chip label={`${product.productViews} views`} size="small" variant="outlined" />
                        </Stack>
                        {product.productSkinType && product.productSkinType.length > 0 && (
                            <Typography variant="body2">
                                <strong>For skin type: </strong>{product.productSkinType.join(", ")}
                            </Typography>
                        )}
                        {product.productDesc && (
                            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                                <strong>Description: </strong>
                                {descExpanded || product.productDesc.length <= PREVIEW_LEN
                                    ? product.productDesc
                                    : `${product.productDesc.slice(0, PREVIEW_LEN)}... `}
                                {product.productDesc.length > PREVIEW_LEN && (
                                    <Box
                                        component="span"
                                        onClick={() => setDescExpanded(!descExpanded)}
                                        sx={{
                                            color: "primary.main",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            ml: 0.5,
                                            "&:hover": { textDecoration: "underline" },
                                        }}
                                    >
                                        {descExpanded ? "Show less" : "Show more"}
                                    </Box>
                                )}
                            </Typography>
                        )}
                        {product.productIngredients && (
                            <Typography variant="subtitle2" sx={{ lineHeight: 1.5 }}>
                                <strong>Ingredients: </strong>
                                {ingredientsExpanded || product.productIngredients.length <= PREVIEW_LEN
                                    ? product.productIngredients
                                    : `${product.productIngredients.slice(0, PREVIEW_LEN)}... `}
                                {product.productIngredients.length > PREVIEW_LEN && (
                                    <Box
                                        component="span"
                                        onClick={() => setIngredientsExpanded(!ingredientsExpanded)}
                                        sx={{
                                            color: "primary.main",
                                            cursor: "pointer",
                                            fontWeight: 600,
                                            ml: 0.5,
                                            "&:hover": { textDecoration: "underline" },
                                        }}
                                    >
                                        {ingredientsExpanded ? "Show less" : "Show more"}
                                    </Box>
                                )}
                            </Typography>
                        )}

                        {/* Actions */}
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    borderRadius: 2,
                                    px: 1,
                                }}
                            >
                                <IconButton size="small" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography sx={{ px: 2, fontWeight: 600 }}>{quantity}</Typography>
                                <IconButton size="small" onClick={() => setQuantity(quantity + 1)}>
                                    <AddIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddShoppingCartIcon />}
                                onClick={handleAddToCart}
                                sx={{ flex: 1, py: 1.5 }}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<FavoriteBorderIcon />}
                                onClick={handleWishlist}
                                sx={{ py: 1.5 }}
                            >
                                Wishlist
                            </Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>

            {/* Reviews */}
            <Divider sx={{ mb: 4 }} />
            <Typography variant="h5" sx={{ mb: 3 }}>Reviews ({reviews.length})</Typography>

            {authMember && (
                <Box component="form" onSubmit={handleReviewSubmit} sx={{ mb: 4, maxWidth: 600 }}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body2" fontWeight={600}>Rating:</Typography>
                            <Rating
                                value={reviewInput.reviewRating}
                                onChange={(_, value) =>
                                    setReviewInput({ ...reviewInput, reviewRating: value || 5 })
                                }
                                sx={{ color: "secondary.main" }}
                            />
                        </Stack>
                        <TextField
                            multiline
                            rows={3}
                            placeholder="Write your review..."
                            value={reviewInput.reviewText}
                            onChange={(e) => setReviewInput({ ...reviewInput, reviewText: e.target.value })}
                            required
                        />
                        <Button type="submit" variant="contained" color="secondary" sx={{ width: "fit-content" }}>
                            Submit Review
                        </Button>
                    </Stack>
                </Box>
            )}

            <Stack spacing={0}>
                {reviews.map((review) => (
                    <Box key={review._id} sx={{ py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                            <Typography fontWeight={600}>{review.memberData?.memberNick || "User"}</Typography>
                            <Rating value={review.reviewRating} readOnly size="small" sx={{ color: "secondary.main" }} />
                        </Stack>
                        <Typography variant="body2">{review.reviewText}</Typography>
                    </Box>
                ))}
            </Stack>
        </Container>
    );
};
