import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import { lazy, Suspense } from "react";
import LoadingComponent from "../components/ProgressSpinner";
import { RequireAuth } from "../context/auth/RequiredAuth";

const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const Error = lazy(() => import("../pages/error"));

const LoadingFallback = () => <LoadingComponent />;

export const router = createBrowserRouter([
  // ROTAS LIVRES (LOGIN)
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      { path: "/login", element: <Login /> },
    ],
  },

  // ROTAS PROTEGIDAS
  {
    element: <RequireAuth />,
    children: [
      {
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <MainLayout />
          </Suspense>
        ),
        children: [
          { path: '/', element: <Home /> },
          { path: "/error", element: <Error /> },
        ],
      }
    ]
  },

  // ERRO
  {
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AuthLayout />
      </Suspense>
    ),
    children: [
      { path: "/error", element: <Error /> },
    ],
  },
]);
