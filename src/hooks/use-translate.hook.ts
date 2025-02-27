import { I18nContext } from "@/contexts/i18n.context";
import { I18nContextType } from "@/models/i18n.model";
import { useContext } from "react";

export const useTranslate = (): I18nContextType => {
  const context = useContext(I18nContext);

  if (context === null) {
    throw new Error('useTranslate must be used within an I18nProvider');
  }

  return context;
};
