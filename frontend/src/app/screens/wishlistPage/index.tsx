import React from "react";
import {
    Container,
    Typography,
    Grid,
    Button,
    Box,
    Stack,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useWishlist from "../../hooks/useWishlist";
import ProductCard from "../../components/products/ProductCard";

const WishlistPage: React.FC = () => {
    const { wishlistItems, onToggle } = useWishlist();

    const handleRemove = async (productId: string) => {
        try {
            await onToggle(productId);
        } catch (err) {
            console.log("Error:", err);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 5 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <FavoriteIcon sx={{ fontSize: 28, color: "secondary.main" }} />
                <Typography variant="h2" sx={{ fontSize: 32 }}>My Wishlist</Typography>
            </Stack>

            {wishlistItems.length === 0 ? (
                <Typography sx={{ textAlign: "center", color: "text.secondary", py: 8, fontSize: 18 }}>
                    Your wishlist is empty
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {wishlistItems.map((item) =>
                        item.productData ? (
                            <Grid key={item._id} size={{ xs: 6, sm: 4, md: 3 }}>
                                <Box>
                                    <ProductCard product={item.productData} />
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteOutlineIcon />}
                                        onClick={() => handleRemove(item.productId)}
                                        sx={{ mt: 1, borderRadius: 2 }}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        ) : null
                    )}
                </Grid>
            )}
        </Container>
    );
};

export default WishlistPage;
