import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Avatar,
} from "@mui/material";
import { Product } from "../../../lib/types/product";
import { Member } from "../../../lib/types/member";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import ProductCard from "../../components/products/ProductCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

const HomePage: React.FC = () => {
    const [bestProducts, setBestProducts] = useState<Product[]>([]);
    const [newProducts, setNewProducts] = useState<Product[]>([]);
    const [topUsers, setTopUsers] = useState<Member[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [best, latest, users] = await Promise.all([
                    ProductService.getProducts({ order: "productViews", page: 1, limit: 4 }),
                    ProductService.getProducts({ order: "createdAt", page: 1, limit: 4 }),
                    MemberService.getTopUsers(),
                ]);
                setBestProducts(best);
                setNewProducts(latest);
                setTopUsers(users);
            } catch (err) {
                console.log("Error fetching home data:", err);
            }
        };
        fetchData();
    }, []);

    return (
        <Box>
            {/* Hero */}
            <Box
                sx={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(/img/hero-bg.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    py: { xs: 10, md: 15 },
                    textAlign: "center",
                    px: 3,
                }}
            >
                <Typography
                    variant="h1"
                    sx={{ fontSize: { xs: 48, md: 72 }, letterSpacing: 4, mb: 1, color: "#fff" }}
                >
                    GlowHari
                </Typography>
                <Typography sx={{ fontSize: 20, color: "rgba(255,255,255,0.85)", fontStyle: "italic", mb: 2 }}>
                    Fresh skin, every single day
                </Typography>
                <Typography sx={{ fontSize: 16, color: "rgba(255,255,255,0.9)", mb: 4, maxWidth: 500, mx: "auto" }}>
                    Your skin deserves more. Discover authentic Korean skincare.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/products"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ px: 5, py: 1.75, fontSize: 16 }}
                >
                    Shop Now
                </Button>
            </Box>

            {/* Best Sellers */}
            {bestProducts.length > 0 && (
                <Container maxWidth="lg" sx={{ my: 8 }}>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: 32, mb: 4 }}>
                        Best Sellers
                    </Typography>
                    <Grid container spacing={3}>
                        {bestProducts.map((product) => (
                            <Grid key={product._id} size={{ xs: 6, md: 3 }}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}

            {/* New Arrivals */}
            {newProducts.length > 0 && (
                <Container maxWidth="lg" sx={{ my: 8 }}>
                    <Typography variant="h2" sx={{ textAlign: "center", fontSize: 32, mb: 4 }}>
                        New Arrivals
                    </Typography>
                    <Grid container spacing={3}>
                        {newProducts.map((product) => (
                            <Grid key={product._id} size={{ xs: 6, md: 3 }}>
                                <ProductCard product={product} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            )}

            {/* Top Members */}
            {topUsers.length > 0 && (
                <Container maxWidth="lg" sx={{ my: 8, textAlign: "center" }}>
                    <Typography variant="h2" sx={{ fontSize: 32, mb: 4 }}>
                        Top Members
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 4, flexWrap: "wrap" }}>
                        {topUsers.map((user) => (
                            <Box key={user._id} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                                <Avatar
                                    src={user.memberImage ? `${API_URL}/${user.memberImage}` : undefined}
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        bgcolor: "secondary.main",
                                        fontSize: 24,
                                        fontWeight: 700,
                                    }}
                                >
                                    {user.memberNick?.charAt(0).toUpperCase()}
                                </Avatar>
                                <Typography sx={{ fontWeight: 600, color: "primary.main" }}>
                                    {user.memberNick}
                                </Typography>
                                <Typography variant="subtitle2">
                                    {user.memberPoints} pts
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            )}
        </Box>
    );
};

export default HomePage;
