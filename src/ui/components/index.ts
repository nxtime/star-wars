import { lazy } from "react";

const Button = lazy(() => import("@/ui/components/button/button.component"));
const Input = lazy(() => import("@/ui/components/input/input.component"));
const Link = lazy(() => import("@/ui/components/link/link.component"));

export {
  Button,
  Input,
  Link
}
