import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import home_icon from '../assets/navbar/home_icon.svg';
import product_icon from '../assets/navbar/product_icon.svg';
import category_icon from '../assets/navbar/category_icon.svg';
import orders_icon from '../assets/navbar/orders_icon.svg';
import promotion_icon from '../assets/navbar/promotion_icon.svg';
import banner_icon from '../assets/navbar/banner_icon.svg';
import rating_icon from '../assets/navbar/rating_icon.svg';
import stock_icon from '../assets/navbar/stock_icon.svg';
import profile_icon from '../assets/navbar/profile_icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
   

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Handle logout 
  const handleLogout = () => {
    dispatch(logout());
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1024);
      if (width >= 1024) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { title: 'Home', path: '/', icon: home_icon },
    { title: 'Product', path: '/product', icon: product_icon },
    { title: 'Category', path: '/category', icon: category_icon },
    { title: 'Orders', path: '/orders', icon: orders_icon },
    { title: 'Promotion', path: '/promotion', icon: promotion_icon },
    { title: 'Banner Management', path: '/banner', icon: banner_icon },
    { title: 'Rating', path: '/rating', icon: rating_icon },
    { title: 'Stock', path: '/stock', icon: stock_icon },
  ];

  return (
    <div className={`${isMobile && !isOpen ? 'w-0' : ''} relative`}>
      {/* Mobile Toggle Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-md bg-white shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-2xl leading-none">≡</span>
      </button>

      {/* Sidebar */}
      <nav className={`
        fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out z-40
        ${isMobile ? (isOpen ? 'w-72' : 'w-0 opacity-0') : 'w-72'}
        overflow-hidden
      `}>
        {/* Profile Section */}
        <div className="bg-black text-white p-6 min-w-[288px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              <img src={profile_icon} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate">{user?.name}</h3>
              <p className="text-gray-400 text-sm truncate">{user?.email}</p>
              <button onClick={handleLogout} className="text-sm text-red-500 underline underline-offset-2">Logout</button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <ul className="py-6 space-y-4 min-w-[288px]">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path} className="group relative">
                <div className={`
                  absolute left-0 top-0 w-2 h-full bg-red-500 rounded-r-md transition-all duration-200
                  ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                `} />
                
                <Link
                  to={item.path}
                  className="flex items-center gap-6 px-6 py-3"
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <img 
                    src={item.icon} 
                    alt={`${item.title} icon`}
                    className={`w-6 h-6 transition-all duration-200
                      ${isActive 
                        ? '[filter:invert(36%)_sepia(51%)_saturate(5471%)_hue-rotate(337deg)_brightness(98%)_contrast(93%)]' 
                        : 'group-hover:[filter:invert(36%)_sepia(51%)_saturate(5471%)_hue-rotate(337deg)_brightness(98%)_contrast(93%)]'
                      }`}
                  />
                  <span className={`text-base transition-colors duration-200 
                    ${isActive ? 'text-red-500' : 'text-gray-700 group-hover:text-red-500'}`}
                  >
                    {item.title}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Navbar;