import { FormConfig, FormValues } from "@/models/form.model";
import { TranslationKey } from "@/models/i18n.model";

export interface SignInFormValues extends FormValues {
  email: string;
  password: string;
  rememberMe: string;
}

export const createSignInFormConfig = (t: (key: TranslationKey, params?: Record<string, string>) => string): FormConfig<SignInFormValues> => ({
  email: {
    required: true,
    validate: (value) => {
      if (!value) return t('forms.validation.required');
      if (typeof value === 'string' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        return t('forms.validation.email');
      }
      return true;
    }
  },
  password: {
    required: true,
    validate: (value) => {
      if (!value) return t('forms.validation.required');
      return true;
    }
  },
  rememberMe: {
    required: false,
    initialValue: ''
  }
});
