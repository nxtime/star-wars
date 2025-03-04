import { createContext, FC, PropsWithChildren, useEffect, useState } from "react";

import { Routes } from "../models/routes.model";

interface URLParams {
  [key: string]: string;
}

type RouteContextType = {
  route: Routes;
  params: URLParams;
  goto(route: Routes, additionalParams?: Record<string, any>): void;
  setParam: (key: string, value: string) => void;
  removeParam: (key: string) => void;
  clearParams: () => void;
}

const getCurrentRoute = () => {
  const path = window.location.pathname;
  for (const [routeName, routePath] of Object.entries(Routes)) {
    if (routePath === path) {
      return Routes[routeName as keyof typeof Routes];
    }
  }
  return Routes.HOME;
}

const getURLParams = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const params: URLParams = {};

  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  return params;
}

export const RouterContext = createContext<RouteContextType | null>(null);

const RouterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [route, setRoute] = useState<Routes>(getCurrentRoute());
  const [params, setParams] = useState<URLParams>(getURLParams());

  const updateURL = (newRoute: Routes, newParams: URLParams = {}) => {
    const currentParams = newParams;
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(currentParams)) {
      searchParams.set(key, value);
    }

    const queryString = searchParams.toString();
    const newPath = queryString ? `${newRoute}?${queryString}` : newRoute;

    window.history.pushState({}, "", newPath);
    setRoute(newRoute);
    setParams(currentParams);
  }

  const setParam = (key: string, value: string) => {
    const newParams = { ...params, [key]: value };
    updateURL(route, newParams);
  };

  const removeParam = (key: string) => {
    const newParams = { ...params };
    delete newParams[key];
    updateURL(route, newParams);
  };

  const clearParams = () => {
    updateURL(route, {});
  };

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute());
      setParams(getURLParams());
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const value = {
    route,
    params,
    setParam,
    removeParam,
    clearParams,
    goto: updateURL
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export default RouterProvider;
