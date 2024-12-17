import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import HomePage from "./pages/HomePage";
import PoductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import OrdersPage from "./pages/OrdersPage";
import PromotionPage from "./pages/PromotionPage";
import BannerPage from "./pages/BannerPage";
import RatingPage from "./pages/RatingPage";
import StockPage from "./pages/StockPage";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<PoductPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/promotion" element={<PromotionPage />} />
        <Route path="/banner" element={<BannerPage />} />
        <Route path="/rating" element={<RatingPage />} />
        <Route path="/stock" element={<StockPage />} />
      </Routes>
    </Router>
  )
}

export default App
