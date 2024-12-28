import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import OrdersPage from "./pages/OrdersPage";
import PromotionPage from "./pages/PromotionPage";
import BannerPage from "./pages/BannerPage";
import RatingPage from "./pages/RatingPage";
import StockPage from "./pages/StockPage";
import StockForm from "./components/stock/StockForm";
import ProductForm from "./components/product/ProductForm";
import PromotionForm from "./components/promotion/PromotionForm";
import BannerForm from "./components/banner/BannerForm";
import AuthPage from "./pages/AuthPage";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation().pathname;
  const authPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ];
  const isAuthPage = authPage.includes(location);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<ProtectedRoute><AuthPage /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute><AuthPage /></ProtectedRoute>} />
        <Route path="/forgot-password" element={<ProtectedRoute><AuthPage /></ProtectedRoute>} />
        <Route path="/verify-otp" element={<ProtectedRoute><AuthPage /></ProtectedRoute>} />
        <Route path="/reset-password" element={<ProtectedRoute><AuthPage /></ProtectedRoute>} />
      </Routes>
      <div className="flex min-h-screen font-lato">
        {!isAuthPage && <Navbar />}
        <main className={`flex-1 ${!isMobile ? "lg:ml-72" : ""}`}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product"
              element={
                <ProtectedRoute>
                  <ProductPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/add"
              element={
                <ProtectedRoute>
                  <ProductForm mode="add" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/edit/:id"
              element={
                <ProtectedRoute>
                  <ProductForm mode="edit" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/detail/:id"
              element={
                <ProtectedRoute>
                  <ProductForm mode="detail" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/category"
              element={
                <ProtectedRoute>
                  <CategoryPage />
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
              path="/promotion"
              element={
                <ProtectedRoute>
                  <PromotionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/promotion/add"
              element={
                <ProtectedRoute>
                  <PromotionForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/promotion/edit"
              element={
                <ProtectedRoute>
                  <PromotionForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/promotion/detail"
              element={
                <ProtectedRoute>
                  <PromotionForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/banner"
              element={
                <ProtectedRoute>
                  <BannerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/banner/add"
              element={
                <ProtectedRoute>
                  <BannerForm mode="add" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/banner/edit/:id"
              element={
                <ProtectedRoute>
                  <BannerForm mode="edit" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/banner/detail/:id"
              element={
                <ProtectedRoute>
                  <BannerForm mode="detail" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rating"
              element={
                <ProtectedRoute>
                  <RatingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock"
              element={
                <ProtectedRoute>
                  <StockPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock/add"
              element={
                <ProtectedRoute>
                  <StockForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock/edit"
              element={
                <ProtectedRoute>
                  <StockForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stock/detail"
              element={
                <ProtectedRoute>
                  <StockForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
