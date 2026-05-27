import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Link,
    Stack,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const faqTopics = [
    { label: "General", anchor: "general" },
    { label: "My Account", anchor: "account" },
    { label: "Order", anchor: "order" },
    { label: "Payment", anchor: "payment" },
    { label: "Shipping & Delivery", anchor: "shipping" },
    { label: "Customs & Tax", anchor: "customs" },
    { label: "Returns & Refunds", anchor: "returns" },
    { label: "Others", anchor: "others" },
];

const footerLinkSx = {
    color: "#c4a08a",
    textDecoration: "none",
    fontSize: 13,
    lineHeight: 1.8,
    transition: "color 0.2s",
    display: "inline-block",
    "&:hover": { color: "#f5c8d0" },
};

const sectionHeadingSx = {
    fontFamily: "'Georgia', serif",
    fontSize: 12,
    fontWeight: 600,
    color: "#fff",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    mb: 1,
} as const;

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                background: "linear-gradient(180deg, #5a3e36 0%, #4a302a 100%)",
                color: "#f5dcc8",
                mt: 10,
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { md: "flex-start" },
                        gap: { xs: 3, md: 6 },
                        py: 3,
                    }}
                >
                    {/* Brand */}
                    <Box sx={{ flex: "none", mr: { md: "auto" } }}>
                        <Typography
                            component={RouterLink}
                            to="/"
                            sx={{
                                fontFamily: "'Georgia', serif",
                                fontSize: 18,
                                fontWeight: 700,
                                color: "#fff",
                                textDecoration: "none",
                                letterSpacing: 3,
                                display: "block",
                                "&:hover": { color: "#f0c4b0" },
                            }}
                        >
                            GLOWHARI
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: "#a08878", letterSpacing: 1, mt: 0.5 }}>
                            &copy; 2026 All rights reserved.
                        </Typography>
                        <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
                            <InstagramIcon sx={{ fontSize: 16, color: "#c4a08a", cursor: "pointer", "&:hover": { color: "#f5c8d0" } }} />
                            <MusicNoteIcon sx={{ fontSize: 16, color: "#c4a08a", cursor: "pointer", "&:hover": { color: "#f5c8d0" } }} />
                            <YouTubeIcon sx={{ fontSize: 16, color: "#c4a08a", cursor: "pointer", "&:hover": { color: "#f5c8d0" } }} />
                        </Stack>
                    </Box>

                    {/* FAQ */}
                    <Box>
                        <Typography variant="subtitle1" sx={sectionHeadingSx}>
                            FAQ
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                columnGap: 3,
                            }}
                        >
                            {faqTopics.map((topic) => (
                                <Link
                                    key={topic.anchor}
                                    component={RouterLink}
                                    to={`/faq#${topic.anchor}`}
                                    sx={footerLinkSx}
                                >
                                    {topic.label}
                                </Link>
                            ))}
                        </Box>
                    </Box>

                    {/* Policies */}
                    <Box>
                        <Typography variant="subtitle1" sx={sectionHeadingSx}>
                            Policies
                        </Typography>
                        <Stack spacing={0.25}>
                            <Link component={RouterLink} to="/policies#return-refund" sx={footerLinkSx}>
                                Return &amp; Refund
                            </Link>
                            <Link component={RouterLink} to="/policies#shipping-delay" sx={footerLinkSx}>
                                Shipping Delay Notice
                            </Link>
                        </Stack>
                    </Box>

                    {/* Contact */}
                    <Box>
                        <Typography variant="subtitle1" sx={sectionHeadingSx}>
                            Contact
                        </Typography>
                        <Stack spacing={0.25}>
                            <Link component={RouterLink} to="/contact" sx={footerLinkSx}>
                                support@glowhari.com
                            </Link>
                            <Typography sx={{ fontSize: 11, color: "#a08878" }}>
                                Mon &ndash; Fri, 9 AM &ndash; 6 PM KST
                            </Typography>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
