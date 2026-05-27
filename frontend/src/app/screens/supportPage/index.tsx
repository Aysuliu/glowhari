import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Chip,
    Stack,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SupportHero: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <Box sx={{ textAlign: "center", py: 7, borderBottom: "1px solid", borderColor: "divider", mb: 5 }}>
        <Typography variant="h1" sx={{ fontSize: 36, mb: 1 }}>{title}</Typography>
        <Typography sx={{ fontSize: 16, color: "text.secondary" }}>{subtitle}</Typography>
    </Box>
);

/* ─── FAQ Page ─── */
const faqSections = [
    {
        id: "general", title: "General", items: [
            { q: "What is GLOWHARI?", a: "GLOWHARI is a curated K-beauty destination offering authentic Korean skincare products shipped worldwide." },
            { q: "Are all products authentic?", a: "Yes. Every product is sourced directly from authorized Korean distributors and brands." },
        ],
    },
    {
        id: "account", title: "My Account", items: [
            { q: "How do I create an account?", a: "Click Sign Up in the navigation bar and fill in your details." },
            { q: "Can I update my profile information?", a: "Yes, visit your profile page to update your nickname, phone number, and address." },
        ],
    },
    {
        id: "order", title: "Order", items: [
            { q: "How do I place an order?", a: "Add products to your cart, proceed to checkout, and confirm your order." },
            { q: "Can I cancel my order?", a: "Orders in PAUSE status can be cancelled. Once processing begins, cancellation is no longer available." },
            { q: "Where can I track my order?", a: "Visit the Orders page to view your order history and current status." },
        ],
    },
    {
        id: "payment", title: "Payment", items: [
            { q: "What payment methods do you accept?", a: "We accept major credit cards, debit cards, and select digital payment options." },
            { q: "Is my payment information secure?", a: "Absolutely. All transactions are encrypted and processed through secure payment gateways." },
        ],
    },
    {
        id: "shipping", title: "Shipping & Delivery", items: [
            { q: "How much does shipping cost?", a: "Orders over $50 qualify for free shipping. Orders under $50 have a flat $5 shipping fee." },
            { q: "How long does delivery take?", a: "Standard delivery takes 7\u201314 business days depending on your location." },
            { q: "Do you ship internationally?", a: "Yes, we ship to most countries worldwide." },
        ],
    },
    {
        id: "customs", title: "Customs & Tax", items: [
            { q: "Will I be charged customs duties?", a: "Import duties and taxes vary by country and are the responsibility of the buyer." },
            { q: "Are prices inclusive of tax?", a: "Listed prices do not include local import taxes or customs fees." },
        ],
    },
    {
        id: "returns", title: "Returns & Refunds", items: [
            { q: "What is your return policy?", a: "Items may be returned within 30 days of delivery in unused, unopened condition. See our Return Policy page for full details." },
            { q: "How long do refunds take?", a: "Refunds are processed within 5\u201310 business days after we receive the returned item." },
        ],
    },
    {
        id: "others", title: "Others", items: [
            { q: "How can I contact customer support?", a: "Visit our Contact Us page or email support@glowhari.com." },
            { q: "Do you offer gift cards?", a: "Gift cards are coming soon! Stay tuned for updates." },
        ],
    },
];

export const FAQPage: React.FC = () => {
    const location = useLocation();
    const hash = location.hash.replace("#", "");
    const [expanded, setExpanded] = useState<string | false>(false);

    return (
        <Container maxWidth="md">
            <SupportHero title="Frequently Asked Questions" subtitle="Find answers to common questions about shopping with GLOWHARI" />

            {/* Nav Chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center", mb: 5, p: 2.5, bgcolor: "#fdf8f5", borderRadius: 3, border: "1px solid", borderColor: "divider" }}>
                {faqSections.map((s) => (
                    <Chip
                        key={s.id}
                        label={s.title}
                        component="a"
                        href={`#${s.id}`}
                        clickable
                        color={hash === s.id ? "secondary" : "default"}
                        variant={hash === s.id ? "filled" : "outlined"}
                        size="small"
                    />
                ))}
            </Box>

            {/* Sections */}
            {faqSections.map((section) => (
                <Box key={section.id} id={section.id} sx={{ mb: 5, scrollMarginTop: 100 }}>
                    <Typography variant="h5" sx={{ mb: 2, pb: 1, borderBottom: "2px solid", borderColor: "divider" }}>
                        {section.title}
                    </Typography>
                    {section.items.map((item, idx) => {
                        const key = `${section.id}-${idx}`;
                        return (
                            <Accordion
                                key={key}
                                expanded={expanded === key}
                                onChange={(_, isOpen) => setExpanded(isOpen ? key : false)}
                                elevation={0}
                                sx={{
                                    border: "1px solid",
                                    borderColor: expanded === key ? "secondary.main" : "divider",
                                    mb: 1,
                                    "&::before": { display: "none" },
                                    borderRadius: "10px !important",
                                    overflow: "hidden",
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: "secondary.main" }} />}
                                    sx={{ bgcolor: "#fdf8f5", "&:hover": { bgcolor: "#f8ede5" } }}
                                >
                                    <Typography fontWeight={500} color="primary.main">{item.q}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2" sx={{ lineHeight: 1.7 }}>{item.a}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })}
                </Box>
            ))}
        </Container>
    );
};

/* ─── Policies Page ─── */
export const PoliciesPage: React.FC = () => {
    return (
        <Container maxWidth="md">
            <SupportHero title="Our Policies" subtitle="Transparency and trust are at the heart of GLOWHARI" />

            <Box id="return-refund" sx={{ mb: 7, scrollMarginTop: 100 }}>
                <Typography variant="h4" sx={{ fontSize: 26, mb: 1.5 }}>Return and Refund Policy</Typography>
                <Typography sx={{ color: "text.secondary", fontStyle: "italic", mb: 3.5 }}>
                    We want you to love every product you receive. If something isn't right, we're here to help.
                </Typography>

                {[
                    { title: "Damaged Items", text: "If your order arrives damaged, please contact us within 48 hours of delivery with photographs of the damage. We will arrange a full replacement or refund at no additional cost." },
                    { title: "Missing Items", text: "If any items are missing from your order, reach out within 7 days of delivery. We will investigate and ship the missing items or issue a refund promptly." },
                    { title: "Returned Items", text: "Items must be returned in their original, unopened condition within 30 days of delivery. Please include your order number and reason for return. Shipping costs for returns are the responsibility of the customer unless the item was damaged or incorrect." },
                ].map((block) => (
                    <Card
                        key={block.title}
                        elevation={0}
                        sx={{ mb: 2.5, bgcolor: "#fdf8f5", borderLeft: "3px solid", borderColor: "secondary.main" }}
                    >
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 1 }}>{block.title}</Typography>
                            <Typography variant="body2">{block.text}</Typography>
                        </CardContent>
                    </Card>
                ))}

                <Typography variant="h6" sx={{ mb: 2, mt: 3 }}>Refund Options</Typography>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card elevation={0} sx={{ height: "100%", border: "1px solid", borderColor: "divider" }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontSize: 16, mb: 1 }}>Store Points</Typography>
                                <Typography variant="body2">
                                    Receive your refund as GLOWHARI store points, credited instantly to your account.
                                    Points never expire and can be used on any future purchase.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Card elevation={0} sx={{ height: "100%", border: "1px solid", borderColor: "divider" }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ fontSize: 16, mb: 1 }}>Original Payment Method</Typography>
                                <Typography variant="body2">
                                    Request a refund to your original payment method. Processing takes 5&ndash;10
                                    business days depending on your bank or card issuer.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Divider sx={{ mb: 5 }} />

            <Box id="shipping-delay" sx={{ mb: 7, scrollMarginTop: 100 }}>
                <Typography variant="h4" sx={{ fontSize: 26, mb: 1.5 }}>Shipping Delay Notice</Typography>
                <Typography sx={{ color: "text.secondary", fontStyle: "italic", mb: 3 }}>
                    While we strive to deliver every order on time, occasional delays may occur due to
                    high demand, customs processing, weather conditions, or carrier disruptions.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                    If your order is delayed beyond the estimated delivery window, please check your
                    order status on the Orders page. For further assistance, contact our support team
                    and we will provide a real-time update on your shipment.
                </Typography>
                <Typography variant="body2">
                    During peak seasons (holidays, major sales events), please allow an additional
                    3&ndash;5 business days for processing and delivery.
                </Typography>
            </Box>
        </Container>
    );
};

/* ─── Contact Page ─── */
export const ContactPage: React.FC = () => {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <Container maxWidth="md">
            <SupportHero title="Contact Us" subtitle="We'd love to hear from you" />

            <Grid container spacing={2.5} sx={{ mb: 6 }}>
                {[
                    { icon: <EmailOutlinedIcon />, title: "Email", main: "support@glowhari.com", detail: "Response within 24 hours" },
                    { icon: <AccessTimeIcon />, title: "Business Hours", main: "Mon \u2013 Fri, 9AM \u2013 6PM KST", detail: "Seoul, South Korea" },
                    { icon: <ShareIcon />, title: "Social", main: "@glowhari", detail: "Instagram \u00b7 TikTok \u00b7 YouTube" },
                ].map((card) => (
                    <Grid key={card.title} size={{ xs: 12, sm: 4 }}>
                        <Card elevation={0} sx={{ textAlign: "center", bgcolor: "#fdf8f5", border: "1px solid", borderColor: "divider", height: "100%" }}>
                            <CardContent>
                                <Box sx={{ color: "secondary.main", mb: 1 }}>{card.icon}</Box>
                                <Typography variant="h6" sx={{ fontSize: 16, mb: 0.5 }}>{card.title}</Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>{card.main}</Typography>
                                <Typography variant="subtitle2">{card.detail}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {submitted ? (
                <Card elevation={0} sx={{ textAlign: "center", py: 8, bgcolor: "#fdf8f5", border: "1px solid", borderColor: "divider" }}>
                    <CardContent>
                        <CheckCircleOutlineIcon sx={{ fontSize: 48, color: "secondary.main", mb: 2 }} />
                        <Typography variant="h4" sx={{ mb: 1 }}>Thank you!</Typography>
                        <Typography color="text.secondary">
                            We've received your message and will get back to you within 24 hours.
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <Card elevation={0} sx={{ bgcolor: "#fdf8f5", border: "1px solid", borderColor: "divider" }}>
                    <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                        <Typography variant="h5" sx={{ textAlign: "center", mb: 3.5 }}>Send us a message</Typography>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Stack spacing={2.5}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            label="Name"
                                            fullWidth
                                            value={form.name}
                                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                                            required
                                        />
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                        <TextField
                                            label="Email"
                                            type="email"
                                            fullWidth
                                            value={form.email}
                                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                                            required
                                        />
                                    </Grid>
                                </Grid>
                                <TextField
                                    label="Subject"
                                    fullWidth
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    required
                                />
                                <TextField
                                    label="Message"
                                    multiline
                                    rows={5}
                                    fullWidth
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    required
                                />
                                <Button type="submit" variant="contained" color="secondary" fullWidth size="large">
                                    Send Message
                                </Button>
                            </Stack>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};
