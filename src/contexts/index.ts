import { lazy } from "react";

const AuthProvider = lazy(() => import("@/contexts/auth.context"));
const RouterProvider = lazy(() => import("@/contexts/routes.context"));
const I18nProvider = lazy(() => import("@/contexts/i18n.context"));

export {
  AuthProvider,
  RouterProvider,
  I18nProvider
}
