import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import HomePage from './pages/HomePage';
import PoductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import OrdersPage from './pages/OrdersPage';
import PromotionPage from './pages/PromotionPage';
import BannerPage from './pages/BannerPage';
import RatingPage from './pages/RatingPage';
import StockPage from './pages/StockPage';
import StockForm from './components/stock/StockForm';
import ProductForm from './components/product/ProductForm';
import PromotionForm from './components/promotion/PromotionForm';
import BannerForm from './components/banner/BannerForm';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className='flex min-h-screen font-lato'>
        <Navbar />
        <main className={`flex-1 ${!isMobile ? 'lg:ml-72' : ''}`}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product' element={<PoductPage />} />
            <Route path='/product/add' element={<ProductForm mode='add' />} />
            <Route path='/product/edit/:id' element={<ProductForm mode='edit' />} />
            <Route path='/product/detail/:id' element={<ProductForm mode='detail' />} />
            <Route path='/category' element={<CategoryPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/promotion' element={<PromotionPage />} />
            <Route path='/promotion/add' element={<PromotionForm />} />
            <Route path='/promotion/edit' element={<PromotionForm />} />
            <Route path='/promotion/detail' element={<PromotionForm />} />
            <Route path='/banner' element={<BannerPage />} />
            <Route path='/banner/add' element={<BannerForm mode='add' />} />
            <Route path='/banner/edit/:id' element={<BannerForm mode='edit' />} />
            <Route path='/banner/detail/:id' element={<BannerForm mode='detail' />} />
            <Route path='/rating' element={<RatingPage />} />
            <Route path='/stock' element={<StockPage />} />
            <Route path='/stock/add' element={<StockForm />} />
            <Route path='/stock/edit' element={<StockForm />} />
            <Route path='/stock/detail' element={<StockForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
