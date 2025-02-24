import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";
import { Routes } from "../models/routes.model";

type RouteContextType = {
  route: Routes;
  goto(route: Routes): void;
}

const pathToRoute: Record<string, keyof typeof Routes> = Object.entries(Routes).reduce(
  (acc, [route, path]) => ({
    ...acc,
    [path]: route as keyof typeof Routes,
  }),
  {} as Record<string, keyof typeof Routes>
);

const getCurrentRoute = (): Routes => {
  const path = window.location.pathname;

  return Routes[pathToRoute[path]] || Routes.HOME;
};

export const RouterContext = createContext<RouteContextType | null>(null);

const RouterProvider: FC<PropsWithChildren> = ({ children }) => {

  const [route, setRoute] = useState<Routes>(getCurrentRoute());

  console.log({ route })

  const goto = (newRoute: Routes) => {
    const path = newRoute;

    window.history.pushState({}, "", path);
    setRoute(newRoute);
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const value = {
    route,
    goto,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export default RouterProvider;
