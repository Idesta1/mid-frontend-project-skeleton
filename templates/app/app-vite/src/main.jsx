import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import EventsPage from "./components/EventsPage/EventsPage.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./main.css";
import EventDetail from "./components/EventDetail/EventDetail.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import Cart from "./components/Cart/Cart.jsx";
import CheckoutPage from "./components/Checkout/CheckoutPage.jsx";
import CheckoutStatusPage from "./components/Checkout/CheckoutStatusPage.jsx";
import AccountPage from "./components/AccountPage/AccountPage.jsx";
import OrderDetail from "./components/OrderDetail/OrderDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

// Cart model: cart items are stored in localStorage via CartContext (no backend needed).
// At checkout, the cart is POSTed to POST /api/orders and then cleared.
// CartContext should follow the same pattern as AuthContext — see that file for reference.

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:id", element: <EventDetail /> },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "checkout/status",
        element: <CheckoutStatusPage />,
      },
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "account/orders/:orderId",
        element: (
          <ProtectedRoute>
            <OrderDetail />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
