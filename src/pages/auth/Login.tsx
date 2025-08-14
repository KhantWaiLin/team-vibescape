import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import bgImage from "../../assets/images/login_bg.png";
import StarImage from "../../assets/images/star.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState("");
  
  const { login, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Clear local error when auth error changes
  useEffect(() => {
    if (error) {
      setLocalError(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
      // Login successful - useAuth will handle the state
      // Navigation will happen automatically via useEffect
    } catch (error) {
      setLocalError("Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Left side - Background image */}
      <div className="hidden lg:flex lg:w-1/3 relative">
        {/* Background image that covers the entire left side */}
        <img
          src={bgImage}
          alt="background-image"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      {/* Right side - Login form */}
      <div className="flex flex-1 lg:w-2/3 items-center justify-center">
        <div className="w-full max-w-md">
          {/* Mobile logo removed */}
          <div className="mb-6">
            <div className="flex flex-col justify-start items-start gap-6 mb-3">
              <img src={StarImage} alt="star-image" className="w-10 h-10" />
              <h2 className="text-3xl m-0 font-[700] font-satoshi text-[var(--color-black-900)]">
                Welcome back!
              </h2>
            </div>
            <p className="text-[var(--color-black-500)] font-[400] text-[14px]">
              Get started with the simplest way to create forms.
            </p>
          </div>

          {/* Error Message */}
          {localError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{localError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-black-700)] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-[var(--color-black-300)] rounded-lg focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] transition-colors duration-200 text-[var(--color-black-900)] placeholder-[var(--color-black-500)] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--color-black-700)] mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                className="w-full px-4 py-3 border border-[var(--color-black-300)] rounded-lg focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] transition-colors duration-200 text-[var(--color-black-900)] placeholder-[var(--color-black-500)] disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={isSubmitting}
                  className="h-4 w-4 focus:ring-[var(--color-green-500)] border-[var(--color-black-300)] rounded disabled:opacity-50"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block font-[300] text-sm text-[var(--color-black-700)]"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="text-[12px] font-[400] text-[var(--color-green-600)] hover:text-[var(--color-green-700)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] disabled:bg-[var(--color-green-400)] cursor-pointer text-[var(--color-light-text-inverse)] font-[700] text-[14px] py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-green-500)] focus:ring-offset-2 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
