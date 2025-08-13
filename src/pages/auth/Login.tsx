import React, { useState } from "react";
import bgImage from "../../assets/images/login_bg.png";
import StarImage from "../../assets/images/star.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { email, password });
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
                className="w-full px-4 py-3 border border-[var(--color-black-300)] rounded-lg focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] transition-colors duration-200 text-[var(--color-black-900)] placeholder-[var(--color-black-500)]"
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
                className="w-full px-4 py-3 border border-[var(--color-black-300)] rounded-lg focus:ring-2 focus:ring-[var(--color-green-500)] focus:border-[var(--color-green-500)] transition-colors duration-200 text-[var(--color-black-900)] placeholder-[var(--color-black-500)]"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 focus:ring-[var(--color-green-500)] border-[var(--color-black-300)] rounded"
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
                  className="text-[12px] font-[400] text-[var(--color-green-600)] hover:text-[var(--color-green-700)]"
                >
                  Forgot password?
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[var(--color-green-600)] hover:bg-[var(--color-green-700)] cursor-pointer text-[var(--color-light-text-inverse)] font-[700] text-[14px] py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-green-500)] focus:ring-offset-2"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
