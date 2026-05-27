import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./app/theme";
import ContextProvider from "./app/context/ContextProvider";
import Navbar from "./app/components/headers/Navbar";
import Footer from "./app/components/footer/Footer";
import ProtectedRoute from "./app/components/auth/ProtectedRoute";
import ErrorBoundary from "./app/components/ErrorBoundary";
import HomePage from "./app/screens/homePage";
import { ProductsPage, ProductDetailPage } from "./app/screens/productsPage";
import { CartPage, OrdersPage } from "./app/screens/ordersPage";
import { LoginPage, SignupPage, ProfilePage } from "./app/screens/memberPage";
import { Settings } from "./app/screens/memberPage/Settings";
import WishlistPage from "./app/screens/wishlistPage";
import { FAQPage, PoliciesPage, ContactPage } from "./app/screens/supportPage";
import NotFoundPage from "./app/screens/notFoundPage";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <ContextProvider>
                    <Navbar />
                    <main style={{ flex: 1 }}>
                        <ErrorBoundary>
                            <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/products" element={<ProductsPage />} />
                            <Route path="/products/:id" element={<ProductDetailPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/policies" element={<PoliciesPage />} />
                            <Route path="/contact" element={<ContactPage />} />

                            <Route
                                path="/cart"
                                element={
                                    <ProtectedRoute>
                                        <CartPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/orders"
                                element={
                                    <ProtectedRoute>
                                        <OrdersPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/wishlist"
                                element={
                                    <ProtectedRoute>
                                        <WishlistPage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/member"
                                element={
                                    <ProtectedRoute>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/member/settings"
                                element={
                                    <ProtectedRoute>
                                        <Settings />
                                    </ProtectedRoute>
                                }
                            />

                            <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </ErrorBoundary>
                    </main>
                    <Footer />
                </ContextProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
