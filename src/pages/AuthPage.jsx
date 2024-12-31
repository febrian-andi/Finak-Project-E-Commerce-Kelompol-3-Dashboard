import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FormLogin from '../components/auth/FormLogin';
import FormRegister from '../components/auth/FormRegister';
import FormForgotPassword from '../components/auth/FormForgotPassword';
import FormOTP from '../components/auth/FormOTP ';
import womanImage from '../assets/auth/woman.png';
import { login, register } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import DOMPurify from 'dompurify';

const AuthPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: DOMPurify.sanitize(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (location.pathname === '/login') {
        dispatch(login(formData));
        // console.log('Login:', { email: formData.email, password: formData.password });
      } else if (location.pathname === '/register') {
        dispatch(register(formData));
        // console.log('Register:', formData);
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert(error || 'An error occurred. Please try again.');
    }
  };

  // Helper function to get the appropriate title based on the current route
  const getTitle = () => {
    switch (location.pathname) {
      case '/login':
        return 'Welcome Back!';
      case '/register':
        return 'Sign up Now';
      case '/forgot-password':
        return 'Reset Password';
      case '/verify-otp':
        return 'Verify OTP';
      case '/reset-password':
        return 'New Password';
      default:
        return 'Welcome';
    }
  };

  // Check if current route should show banner
  const shouldShowBanner = !['/forgot-password', '/verify-otp'].includes(location.pathname);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className={`w-full max-w-[1100px] min-h-[700px] p-5 flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl bg-white shadow-xl overflow-hidden`}>
        {/* Left side - Auth forms */}
        <div className={`w-full ${shouldShowBanner ? 'lg:w-1/2' : ''} flex items-center justify-center order-2 lg:order-1`}>
          {location.pathname === '/login' && <FormLogin formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
          {location.pathname === '/register' && <FormRegister formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
          {location.pathname === '/forgot-password' && <FormForgotPassword />}
          {location.pathname === '/verify-otp' && <FormOTP />}
        </div>

        {/* Right side - Banner - Only shown for login and register */}
        {shouldShowBanner && (
          <div className='w-full lg:w-1/2 bg-red-500 p-6 sm:p-8 md:p-12 rounded-2xl text-white relative order-1 lg:order-2 min-h-[200px] lg:min-h-0'>
            <div className='space-y-2 sm:space-y-4'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-medium leading-tight text-center lg:text-left'>Very good works are waiting for you</h1>
              <h2 className='text-xl sm:text-2xl text-center lg:text-left'>{getTitle()}</h2>
            </div>

            <div className='hidden lg:block absolute bottom-20 left-12 space-y-40'>
              <div className='w-px h-40 bg-white' />
              <div className='w-16 h-px bg-white' />
            </div>

            {/* Image - Only shown on desktop */}
            <img src={womanImage} alt='Professional with laptop' className='hidden lg:block absolute bottom-0 right-0 w-[90%] object-cover' />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
