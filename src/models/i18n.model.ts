import { EnglishTranslation } from "public/locales/en";
import { ReactNode } from "react";

export type Pluralization = {
  zero?: string;
  one: string;
  other: string;
};

export type NestedTranslation = {
  [key: string]: string | NestedTranslation;
};

export type Translations = {
  [locale: string]: NestedTranslation;
};

export type I18nContextValues = {
  locale: string;
  locales: string[];
};

export type I18nContextActions = {
  t: (key: TranslationKey, params?: Record<string, string>) => string;
  changeLocale(newLocale: string): void;
  formatDate: (date: Date | number, options?: Intl.DateTimeFormatOptions) => string;
  plural: (count: number, forms: Pluralization, params?: Record<string, string>) => string;
}

export type I18nContextType = I18nContextActions & I18nContextValues;

export interface I18nProviderProps {
  children: ReactNode;
  defaultLocale: string;
  translations: Translations;
}

type PathsToStringProps<T> = T extends string
  ? []
  : {
    [K in Extract<keyof T, string>]: [K, ...PathsToStringProps<T[K]>]
  }[Extract<keyof T, string>];

type Join<T extends string[], D extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string
  ? R extends string[]
  ? `${F}${D}${Join<R, D>}`
  : never
  : never
  : string;

type TranslationSchema = typeof EnglishTranslation;

// Creates a union type of all possible translation keys in dot notation
export type TranslationKey = Join<PathsToStringProps<TranslationSchema>, ".">;

// Type for checking if all required translations exist in a locale
export type TranslationLocale = {
  [K in keyof TranslationSchema]: {
    [P in keyof TranslationSchema[K]]: string;
  };
};
