import { createBrowserRouter, createHashRouter  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import { lazy, Suspense } from "react";
import LoadingComponent from "../components/ProgressSpinner";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login/index"));
const Error = lazy(() => import("../pages/error/index"));

const LoadingFallback = () => <LoadingComponent />;

export const router = createBrowserRouter ([
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
          <AuthLayout />
      </Suspense>
    ),
    children: [
      { 
        path: "/login", 
        element: <Login /> 
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
          <MainLayout />
      </Suspense>
    ),
    children: [
      { 
        path: "/", 
        element: <Home /> 
      },
    ],
  },
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
          <AuthLayout />
      </Suspense>
    ),
    children: [
      { 
        path: "/error", 
        element: <Error /> 
      },
    ],
  },
]);