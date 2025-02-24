import { lazy } from "react";

const AuthProvider = lazy(() => import("@/contexts/auth.context"));
const RouterProvider = lazy(() => import("@/contexts/routes.context"));

export {
  AuthProvider,
  RouterProvider
}
