import AuthLayout from "@/ui/layout/auth/auth-layout.component";
import { FC, JSX, lazy, PropsWithChildren } from "react";
import { Routes } from "@/models/routes.model";
import { useAuth } from "@/hooks/use-auth.hooks";
import { useRouter } from "@/hooks/use-router.hook";

const Home = lazy(() => import("@/routes/home/home.route"));
const SignUp = lazy(() => import("@/routes/sign-up/sign-up.route"));

const routes: Partial<Record<Routes, React.LazyExoticComponent<() => JSX.Element>>> = {
  [Routes.HOME]: Home,
  [Routes.SIGN_IN]: Home,
  [Routes.SIGN_UP]: SignUp,
}

const SimpleLayout: FC<PropsWithChildren> = ({ children }) => <div>{children}</div>;

const Router = () => {
  const { user } = useAuth();
  const { route } = useRouter();

  const WrapperLayout = user ? SimpleLayout : AuthLayout;

  const RouteComponent = routes[route];

  if (!RouteComponent) {
    return <div>Error</div>
  }

  return (
    <WrapperLayout>
      <RouteComponent />
    </WrapperLayout>
  );
}

export default Router;
