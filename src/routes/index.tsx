import React, { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/index";
import LoadingSpinner from "../components/LoadingSpinner";
import ProtectedRoute from "../components/ProtectedRoute";
import SubmissionInsightLayout from "../components/layout/SubmissionInsightLayout";

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
const EditForm = React.lazy(() => import("../pages/EditForm"));
const Submission = React.lazy(() => import("../pages/Submission"));
const SubmissionInsight = React.lazy(
  () => import("../pages/SubmissionInsight")
);
const FormReview = React.lazy(() => import("../pages/FormReview"));
const PublicForm = React.lazy(() => import("../pages/PublicForm"));

// Define the route configuration
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
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
    path: "/templates",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/my-form",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <MyForm />
          </ProtectedRoute>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/my-forms",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <MyForm />
          </ProtectedRoute>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/draft",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <Draft />
          </ProtectedRoute>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/trash",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <Trash />
          </ProtectedRoute>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/create-form",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute>
          <CreateForm />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/create-form/:formId",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute>
          <EditForm />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/submission",
    element: (
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <Submission />
          </ProtectedRoute>
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/form/:formId",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <ProtectedRoute>
          <FormReview />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/form/submission/:formId",
    element: (
      <SubmissionInsightLayout>
        <Suspense fallback={<LoadingSpinner />}>
          <ProtectedRoute>
            <SubmissionInsight />
          </ProtectedRoute>
        </Suspense>
      </SubmissionInsightLayout>
    ),
  },
  {
    path: "/public/form/:formUrl",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <PublicForm />
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

// Default export for AppRoutes component
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
