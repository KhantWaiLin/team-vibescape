import React, { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Layout } from "../components/layout/index";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load components
const Home = React.lazy(() => import("../pages/Home"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const CreateForm = React.lazy(() => import("../pages/CreateForm"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

// Define the route configuration
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Home />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/create-form",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <CreateForm />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/browse-forms",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Browse Forms
            </h1>
            <p className="text-gray-600">
              This page will show all available forms.
            </p>
          </div>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/my-forms",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">My Forms</h1>
            <p className="text-gray-600">
              This page will show your created forms.
            </p>
          </div>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Admin Panel
            </h1>
            <p className="text-gray-600">This page will show admin controls.</p>
          </div>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile</h1>
            <p className="text-gray-600">
              This page will show user profile information.
            </p>
          </div>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
];

// Export individual routes for easy access
