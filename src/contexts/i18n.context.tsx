import type { I18nContextType, I18nProviderProps, Pluralization, TranslationKey } from "@/models/i18n.model";
import { useState, createContext, useCallback } from "react";

export const I18nContext = createContext<I18nContextType | null>(null);

const I18nProvider: React.FC<I18nProviderProps> = ({
  children,
  defaultLocale,
  translations,
}) => {
  const [locale, setLocale] = useState<string>(defaultLocale);

  const locales = Object.keys(translations);

  const t = (key: TranslationKey, params?: Record<string, string>): string => {
    const keys = key.split('.');

    let translation: any = translations[locale];

    for (const k of keys) {

      if (!translation || !translation[k]) {
        console.warn(`Translation key not found: ${key} in locale: ${locale}`);
        return key;
      }

      translation = translation[k];
    }

    if (typeof translation !== 'string') {
      console.warn(`Translation is not a string for key: ${key} in locale: ${locale}`);
      return key;
    }

    if (params) {
      return Object.entries(params).reduce((result, [param, value]) => {
        const regex = new RegExp(`{{\\s*${param}\\s*}}`, 'g');
        return result.replace(regex, value);
      }, translation);
    }

    return translation;
  };

  const formatDate = useCallback((date: Date | number, options?: Intl.DateTimeFormatOptions): string => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    return new Intl.DateTimeFormat(locale, defaultOptions).format(date);
  }, [locale]);

  const changeLocale = (newLocale: string) => {
    if (translations[newLocale]) {
      setLocale(newLocale);
    } else {
      console.warn(`Locale not found: ${newLocale}`);
    }
  };

  const plural = useCallback((count: number, forms: Pluralization, params?: Record<string, string>): string => {
    let form: string;

    if (count === 0 && forms.zero) {
      form = forms.zero;
    } else if (count === 1) {
      form = forms.one;
    } else {
      form = forms.other;
    }

    form = form.replace(/{{count}}/g, count.toString());

    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        const regex = new RegExp(`{{\\s*${param}\\s*}}`, 'g');
        form = form.replace(regex, value);
      });
    }

    return form;
  }, []);

  const values = {
    locale,
    locales,
  };

  const actions = {
    t,
    changeLocale,
    formatDate,
    plural
  }

  const args = {
    ...values,
    ...actions
  }

  return <I18nContext.Provider value={args}>{children}</I18nContext.Provider>;
};

export default I18nProvider;
