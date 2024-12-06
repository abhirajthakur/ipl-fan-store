<div align="center">
  <h1>🏏 IPL Fan Store</h1>
  <p>A personalized e-commerce platform for IPL team merchandise</p>

![Next.js](https://img.shields.io/badge/Next.js-13.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-5.10-2D3748?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)

</div>

## ✨ Features

- 🎯 **Team Assignment**: Users are automatically assigned to an IPL team upon registration
- 🎨 **Dynamic Theming**: UI adapts to team colors and branding
- 🛍️ **Personalized Shopping**: Team-specific merchandise and recommendations
- 🔐 **Secure Authentication**: JWT-based auth with NextAuth.js
- 🛒 **Shopping Cart**: Real-time cart management with optimistic updates
- 📱 **Responsive Design**: Seamless experience across all devices

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/ipl-fan-store.git

# Install dependencies
npm install

# Set up the database
npx prisma migrate dev
npx prisma db seed

# Start the development server
npm run dev
```

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5 with App Router
- **Language**: TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React

## 📚 API Documentation

### Authentication

#### Register User

```http
POST /api/auth/register
```

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**: User object with assigned team

#### Login

```http
POST /api/auth/login
```

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**: Session token and user details

### Products

#### Get All Products

```http
GET /api/products
```

**Response**: List of available products

### Cart Management

#### Get Cart

```http
GET /api/cart
```

**Response**: Current user's cart with items

#### Add to Cart

```http
POST /api/cart
```

```json
{
  "productId": "product_id",
  "quantity": 1
}
```

**Response**: Updated cart

#### Update Cart Item

```http
PATCH /api/cart/items/:itemId
```

```json
{
  "quantity": 2
}
```

**Response**: Updated cart

#### Remove from Cart

```http
DELETE /api/cart/items/:itemId
```

**Response**: Updated cart

## 🏗️ Project Structure

```
ipl-fan-store/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── actions/           # Server actions
│   └── (routes)/         # Page routes
├── components/            # React components
│   ├── ui/               # UI components
│   └── cart/             # Cart components
├── lib/                   # Utilities and helpers
│   ├── services/         # API services
│   ├── stores/           # State management
│   └── utils/            # Helper functions
└── prisma/               # Database schema and migrations
```

## 🎨 Team Themes

Each IPL team has its unique theme:

- 🔴 **Royal Challengers Bangalore**: Red & Gold
- 💙 **Mumbai Indians**: Blue & Gold
- 💛 **Chennai Super Kings**: Yellow & Blue
- 🟣 **Kolkata Knight Riders**: Purple & Gold
- 🔵 **Delhi Capitals**: Blue & Red
- 💖 **Rajasthan Royals**: Pink & Blue
- 🟠 **Sunrisers Hyderabad**: Orange & Black
- ❤️ **Punjab Kings**: Red & Silver
- ⚫ **Gujarat Titans**: Navy & Gold
- 🎀 **Lucknow Super Giants**: Burgundy & Turquoise

