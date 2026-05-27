import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Stack } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

const NotFoundPage: React.FC = () => {
    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 70px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #faf6f3 0%, #f0e6df 100%)",
                px: 3,
                py: 8,
                textAlign: "center",
            }}
        >
            <Stack spacing={2} alignItems="center" maxWidth={520}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: 96, sm: 128 },
                        fontWeight: 700,
                        lineHeight: 1,
                        color: "secondary.main",
                    }}
                >
                    404
                </Typography>
                <Typography variant="h3" sx={{ fontSize: 28, fontWeight: 600 }}>
                    Page not found
                </Typography>
                <Typography sx={{ fontSize: 15, color: "text.secondary", mb: 1 }}>
                    The page you're looking for doesn't exist or has been moved.
                </Typography>
                <Button
                    component={RouterLink}
                    to="/"
                    variant="contained"
                    color="secondary"
                    size="large"
                    startIcon={<HomeOutlinedIcon />}
                >
                    Back to Home
                </Button>
            </Stack>
        </Box>
    );
};

export default NotFoundPage;
