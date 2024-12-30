import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Eye from '../../assets/auth/Eye';
import EyeOf from '../../assets/auth/EyeOf';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { useDispatch } from 'react-redux';
import { setErrorNull } from "../../redux/slices/authSlice";

const FormRegister = ({ formData, handleInputChange, handleSubmit }) => {
  const { loading, error } = useSelector((state) => state.auth);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setErrorNull());
  }, [dispatch]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-medium mb-1 text-center sm:text-left">Sign up</h2>
      <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
        Start your 30-day free trial.
      </p>
      <div className="mb-4 sm:mb-6 mt-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded relative">
            <span className="block sm:inline text-sm">{error || "An error occurred. Please try again."}</span>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div className="space-y-1 sm:space-y-1.5">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-400"
            required
          />
        </div>

        <div className="space-y-1 sm:space-y-1.5">
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-400"
            required
          />
        </div>

        <div className="space-y-1 sm:space-y-1.5">
          <label className="block text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={passwordVisibility ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-red-500 placeholder-gray-400"
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {passwordVisibility ? <EyeOf /> : <Eye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-colors duration-200"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            "Get started"
          )}
        </button>
      </form>

      <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
        Already a member?{' '}
        <Link
          to="/login"
          className="text-red-500 hover:text-red-600"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default FormRegister;