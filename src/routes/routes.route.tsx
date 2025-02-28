import { lazy, JSX } from "react";
import { getRouteConfig, RouteAccess, Routes } from "@/models/routes.model";
import { useAuth } from "@/hooks/use-auth.hooks";
import { useRouter } from "@/hooks/use-router.hook";
import AuthLayout from "@/ui/layout/auth/auth-layout.component";
import UserLayout from "@/ui/layout/user/user-layout.component";

// Routes
const Home = lazy(() => import("@/routes/home/home.route"));
const SignUp = lazy(() => import("@/routes/sign-up/sign-up.route"));
const SignIn = lazy(() => import("@/routes/sign-in/sign-in.route"));
const Character = lazy(() => import("@/routes/character/character.route"));
const Planet = lazy(() => import("@/routes/planet/planet.route"));
const NotFound = lazy(() => import("@/routes/not-found/not-found.route"));

const routes: Partial<Record<Routes, React.LazyExoticComponent<() => JSX.Element>>> = {
  [Routes.HOME]: Home,
  [Routes.SIGN_UP]: SignUp,
  [Routes.SIGN_IN]: SignIn,
  [Routes.CHARACTER]: Character,
  [Routes.PLANET]: Planet,
};

const Router = () => {
  const { isAuthenticated } = useAuth();
  const { route, goto } = useRouter();

  const routeConfig = getRouteConfig(route);

  if (routeConfig) {
    const { access } = routeConfig;

    if (isAuthenticated && access === RouteAccess.UNAUTHENTICATED) {
      goto(Routes.HOME);
      return null;
    }

    if (!isAuthenticated && access === RouteAccess.AUTHENTICATED) {
      goto(Routes.SIGN_IN);
      return null;
    }
  }

  const WrapperLayout = isAuthenticated ? UserLayout : AuthLayout;

  const RouteComponent = routes[route];

  if (!RouteComponent) {
    return (
      <AuthLayout>
        <NotFound />
      </AuthLayout>
    );
  }

  return (
    <WrapperLayout>
      <RouteComponent />
    </WrapperLayout>
  );
};

export default Router;
