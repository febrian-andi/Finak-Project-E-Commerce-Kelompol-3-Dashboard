// FormForgotPassword.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FormForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would typically make an API call to send the reset email
      console.log('Sending reset email to:', email);
      // On success, redirect to OTP verification
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium mb-1 text-center sm:text-left">Forgot password?</h2>
      <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 text-center sm:text-left">
        No worries, we'll send you reset instructions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-1.5">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors duration-200"
        >
          Send Email
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
        <Link
          to="/login"
          className="text-red-500 hover:text-red-600"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};


export default FormForgotPassword;