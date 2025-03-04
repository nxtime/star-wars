import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Router from "./routes/routes.route";

import { AuthProvider, RouterProvider, I18nProvider } from "@/contexts";
import ModalProvider from "./contexts/modal.context";
import "@/styles/global.scss";
import { EnglishTranslation } from "@locales/en";

const queryClient = new QueryClient();

const DOM_CONTAINER = document.getElementById('root');

if (DOM_CONTAINER) {
  createRoot(DOM_CONTAINER).render(
    <StrictMode>
      <I18nProvider defaultLocale="en" translations={{ en: EnglishTranslation }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider>
              <ModalProvider>
                <Router />
              </ModalProvider>
            </RouterProvider>
          </AuthProvider>
        </QueryClientProvider>
      </I18nProvider>
    </StrictMode>,
  )
}
