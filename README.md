# POS & Inventory Management System

A modern Point of Sale (POS) and Inventory Management System built with React, TypeScript, and Vite.

## Overview

This application enables product management, receipt generation, barcode scanning, and transaction tracking for retail businesses.

## Technology Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19 |
| **Language** | TypeScript |
| **Build Tool** | Vite 7 |
| **Routing** | React Router 7 |
| **State Management** | Zustand |
| **Data Fetching** | TanStack Query |
| **Form Handling** | React Hook Form |
| **Validation** | Zod |
| **HTTP Client** | Axios |
| **UI Components** | Radix UI |
| **Styling** | Tailwind CSS 4 |
| **Icons** | Lucide React |

## Features

- **Product Management** - Add, view, and manage products with details like name, brand, price, and stock
- **Barcode Scanning** - Quick product lookup by ID with keyboard shortcut support
- **Receipt Generation** - Create receipts with multiple products, quantities, and custom prices
- **Income/Expense Tracking** - Record non-product transactions
- **Transaction History** - View all transactions with timestamps
- **Authentication** - JWT-based secure access
- **Responsive Design** - Works on desktop and mobile devices

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

## Environment Variables

Create a `.env` file with:

```env
VITE_BACKEND_SERVER="your-backend-server-url"
VITE_PRINT_SERVER="http://localhost:3000"
```

## Project Structure

```
src/
├── components/      # Reusable UI components
│         # Base UI   ├── ui/ components
│   └── ...         # Feature-specific components
├── lib/            # Utilities and API
├── pages/          # Page components
├── store.ts        # State management
└── App.tsx         # Main application
```

## API Endpoints

- `POST /auth/login` - User authentication
- `GET /product/:id` - Get product by ID
- `POST /product/add` - Add new product
- `POST /receipt/add` - Create new receipt
- `POST /transaction/add` - Add transaction

---

Developed by Marwan Zahran
