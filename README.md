# Glowhari

Glowhari is a full-stack skincare e-commerce project with a React storefront, an Express/TypeScript API, MongoDB/Mongoose persistence, and an EJS-based admin panel.

The customer-facing app supports product browsing, product detail pages, search and filtering, local cart management, checkout, order history, wishlist, reviews, profile updates, and support pages. The backend also includes admin screens for managing products and users.

## Features

- Product catalog with search, filtering, product detail pages, and review display
- Cart management with add, remove, quantity update, and clear-cart actions
- Member signup, login, logout, profile detail, and profile update flows
- Protected checkout, order creation, order history, and order status updates
- Wishlist toggle and wishlist page for authenticated members
- Product reviews
- Admin panel with session-based authentication, product management, and user management

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, React Router, Redux Toolkit, MUI, Emotion, Axios |
| Backend | Node.js, Express.js, TypeScript, EJS |
| Database | MongoDB, Mongoose |
| Auth/session | Express session, MongoDB session store, cookies, JWT helper |
| File upload | Multer |

## Project Structure

```text
.
├── backend/        # Express API, EJS admin panel, MongoDB models, services, controllers
├── frontend/       # Vite React storefront
└── README.md
```

## Environment Variables

Backend values are loaded from `backend/.env`:

```env
MONGO_URL=mongodb://localhost:27017/glowhari
SESSION_SECRET=your-session-secret
SECRET_TOKEN=your-jwt-secret
PORT=3003
```

Frontend values are loaded from `frontend/.env`:

```env
VITE_API_URL=http://localhost:3003
```

If `VITE_API_URL` is not set, the frontend defaults to `http://localhost:3003`.

## Getting Started

Install and run the backend:

```bash
cd backend
npm install
npm run start:dev
```

Install and run the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

By default:

- Backend API runs on `http://localhost:3003`
- Admin panel is available at `http://localhost:3003/admin`
- Vite prints the frontend URL when `npm run dev` starts, usually `http://localhost:5173`

## Backend Routes

The public API is mounted at the backend root path.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/member/admin` | Get admin/member auth-related data |
| POST | `/member/signup` | Register a member |
| POST | `/member/login` | Log in a member |
| POST | `/member/logout` | Log out the current member |
| GET | `/member/detail` | Get the authenticated member profile |
| POST | `/member/update` | Update authenticated member profile and image |
| GET | `/member/top-users` | Get top users |
| GET | `/product/all` | List products with pagination, search, and filters |
| GET | `/product/:id` | Get one product |
| POST | `/order/create` | Create an order |
| GET | `/order/all` | Get authenticated member orders |
| POST | `/order/update` | Update an order status |
| POST | `/review/create` | Create a product review |
| GET | `/review/product/:id` | Get reviews for a product |
| POST | `/wishlist/toggle` | Add or remove a product from wishlist |
| GET | `/wishlist/all` | Get authenticated member wishlist |

## Admin Routes

Admin screens are mounted under `/admin` and rendered with EJS.

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/admin` | Admin home |
| GET | `/admin/login` | Admin login page |
| POST | `/admin/login` | Process admin login |
| GET | `/admin/signup` | Admin signup page |
| POST | `/admin/signup` | Process admin signup with optional image upload |
| GET | `/admin/logout` | Log out admin |
| GET | `/admin/check-me` | Check admin session |
| GET | `/admin/product/all` | Manage products |
| POST | `/admin/product/create` | Create product with image uploads |
| POST | `/admin/product/:id` | Update product |
| GET | `/admin/user/all` | Manage users |
| POST | `/admin/user/edit` | Update user |

## Scripts

Backend:

```bash
npm run start       # run src/server.ts with ts-node
npm run start:dev   # run backend with nodemon
npm run build       # compile TypeScript
```

Frontend:

```bash
npm run dev         # start Vite dev server
npm run build       # typecheck and build production assets
npm run preview     # preview production build
npm run typecheck   # run TypeScript without emitting files
```

## Author

**Aysuliu Bakhieva** - [GitHub](https://github.com/Aysuliu) · [Portfolio](https://portfolio-aysulu.my.canva.site/)
