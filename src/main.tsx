import Router from "./routes/routes.route";
import { AuthProvider, RouterProvider } from "@/contexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.scss";

const queryClient = new QueryClient();

const DOM_CONTAINER = document.getElementById('root')!;

createRoot(DOM_CONTAINER).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider>
          <Router />
        </RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
