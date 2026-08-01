# VAVEVA - REST API Specification

Base URL: `http://localhost:5000/api`

---

## 1. Authentication Endpoints (`/api/auth`)

### `POST /api/auth/signup`
Creates a new customer account.
- **Request Body**:
  ```json
  {
    "name": "Arjun Kumar",
    "email": "customer@vaveva.com",
    "password": "password123",
    "phone": "+91 99887 76655"
  }
  ```
- **Response**: `201 Created` with User object, JWT access token, and refresh token.

### `POST /api/auth/login`
Authenticates a user.
- **Request Body**:
  ```json
  {
    "email": "customer@vaveva.com",
    "password": "password123"
  }
  ```

### `GET /api/auth/profile` *(Protected)*
Fetches logged-in user profile, saved addresses, and wishlist.

### `POST /api/auth/address` *(Protected)*
Saves a new shipping/billing address to the user profile.

---

## 2. Product Catalog Endpoints (`/api/products`)

### `GET /api/products`
Fetches catalog items with multi-facet filtering, sorting, and pagination.
- **Query Parameters**:
  - `category`: `T-Shirts` | `Shirts` | `Oversized` | `Pants` | `Hoodies` | `Accessories`
  - `minPrice`, `maxPrice`: Number
  - `color`, `size`: String
  - `search`: String
  - `sort`: `newest` | `price-low` | `price-high` | `popular`
  - `page`, `limit`: Number

### `GET /api/products/:slug`
Fetches detailed product information by slug or ID.

### `GET /api/products/:id/stock`
Returns live inventory stock breakdown per Color & Size variant.

---

## 3. Orders Endpoints (`/api/orders`)

### `POST /api/orders`
Places a new order and decrements variant inventory.
- **Request Body**:
  ```json
  {
    "orderItems": [
      {
        "product": "660000000000000000000001",
        "name": "Oversized Heavyweight T-Shirt",
        "image": "https://images.unsplash.com/...",
        "price": 1799,
        "color": "Obsidian Black",
        "size": "M",
        "quantity": 1
      }
    ],
    "shippingAddress": { ... },
    "paymentMethod": "Stripe",
    "itemsPrice": 1799,
    "taxPrice": 90,
    "shippingPrice": 0,
    "totalPrice": 1889
  }
  ```

### `GET /api/orders/myorders` *(Protected)*
Fetches all orders placed by the authenticated customer.

---

## 4. Admin Command Endpoints (`/api/admin`) *(Protected & Admin Only)*

### `GET /api/admin/dashboard`
Returns KPI metrics (sales growth, revenue, orders count, net profit, sales chart history, low stock alerts).

### `POST /api/admin/products`
Creates a new product with full color/size inventory setup.

### `PUT /api/admin/products/:id`
Updates product pricing, specifications, or variant stock.

### `DELETE /api/admin/products/:id`
Deletes a product from the catalog.

### `PUT /api/admin/orders/:id/status`
Updates order status timeline (`Pending`, `Confirmed`, `Packed`, `Shipped`, `Out For Delivery`, `Delivered`, `Cancelled`).

---

## 5. Promo Coupons Endpoints (`/api/coupons`)

### `POST /api/coupons/validate`
Validates promo code discount against subtotal.
- **Request Body**: `{ "code": "VAVEVA15", "cartTotal": 1799 }`
