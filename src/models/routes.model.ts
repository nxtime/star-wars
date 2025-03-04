export enum Routes {
  HOME = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  CHARACTER = "/character",
  PLANET = "/planet",
  STARSHIP = "/starship",
  VEHICLE = "/vehicle",
  AFFILIATION = "/AFFILIATION"
}

export enum RouteAccess {
  ALL = "all",
  AUTHENTICATED = "authenticated",
  UNAUTHENTICATED = "unauthenticated",
}

export interface RouteConfig {
  path: Routes;
  access: RouteAccess;
}

export const routeConfigs: RouteConfig[] = [
  { path: Routes.HOME, access: RouteAccess.ALL },
  { path: Routes.SIGN_IN, access: RouteAccess.UNAUTHENTICATED },
  { path: Routes.SIGN_UP, access: RouteAccess.UNAUTHENTICATED },
  { path: Routes.CHARACTER, access: RouteAccess.UNAUTHENTICATED },
  { path: Routes.PLANET, access: RouteAccess.UNAUTHENTICATED },
  { path: Routes.VEHICLE, access: RouteAccess.UNAUTHENTICATED },
  { path: Routes.STARSHIP, access: RouteAccess.UNAUTHENTICATED },
];

export const getRouteConfig = (path: Routes): RouteConfig | undefined => {
  return routeConfigs.find((config) => config.path === path);
};
