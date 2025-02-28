import { lazy } from "react";

const Button = lazy(() => import("@/ui/components/button/button.component"));
const Input = lazy(() => import("@/ui/components/input/input.component"));
const Link = lazy(() => import("@/ui/components/link/link.component"));
const FormField = lazy(() => import("@/ui/components/form/form-field.component"));
const Footer = lazy(() => import("@/ui/components/footer/footer.component"));
const ErrorBoundary = lazy(() => import("@/ui/components/error-boundary/error-boundary.component"));

export {
  Button,
  Input,
  Link,
  FormField,
  Footer,
  ErrorBoundary
}
