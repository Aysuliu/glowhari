import express from 'express';
import memberController from "./controllers/member.controller";
import uploader from "./libs/utils/uploader";
import productController from './controllers/product.controller';
import orderController from './controllers/order.controller';
import reviewController from './controllers/review.controller';
import wishlistController from './controllers/wishlist.controller';

const router = express.Router();

// Member
router.get("/member/admin", memberController.getAdmin);
router.post("/member/login", memberController.login);
router.post("/member/signup", memberController.signup);
router.post("/member/logout", memberController.verifyAuth, memberController.logout);
router.get("/member/detail", memberController.verifyAuth, memberController.getMemberDetail);
router.post(
    "/member/update",
    memberController.verifyAuth,
    uploader("members").single("memberImage"),
    memberController.updateMember
);
router.get("/member/top-users", memberController.getTopUsers);

// Product
router.get("/product/all", productController.getProducts);
router.get("/product/:id", memberController.retrieveAuth, productController.getProduct);

// Order
router.post("/order/create", memberController.verifyAuth, orderController.createOrder);
router.get("/order/all", memberController.verifyAuth, orderController.getMyOrders);
router.post("/order/update", memberController.verifyAuth, orderController.updateOrder);

// Review
router.post("/review/create", memberController.verifyAuth, reviewController.createReview);
router.get("/review/product/:id", reviewController.getProductReviews);

// Wishlist
router.post("/wishlist/toggle", memberController.verifyAuth, wishlistController.toggleWishlist);
router.get("/wishlist/all", memberController.verifyAuth, wishlistController.getMyWishlist);

export default router;
