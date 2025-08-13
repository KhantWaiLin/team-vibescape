import React, { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Layout } from "../components/layout/index";
import LoadingSpinner from "../components/LoadingSpinner";

// Lazy load components
const Home = React.lazy(() => import("../pages/Home"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Login = React.lazy(() => import("../pages/auth/Login"));
const NotFound = React.lazy(() => import("../pages/NotFound"));
const Draft = React.lazy(() => import("../pages/Draft"));
const Trash = React.lazy(() => import("../pages/Trash"));
const MyForm = React.lazy(() => import("../pages/MyForm"));
const Templates = React.lazy(() => import("../pages/Templates"));
const CreateForm = React.lazy(() => import("../pages/CreateForm"));

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
    path: "/my-form",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <MyForm />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/templates",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Templates />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/my-forms",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <MyForm />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/draft",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Draft />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/trash",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <Trash />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/create-form",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <CreateForm />
      </Suspense>
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
