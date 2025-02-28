import { FormConfig, FormValues } from "@/models/form.model";
import { TranslationKey } from "@/models/i18n.model";

export interface SignupFormValues extends FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: string;
  phoneNumber?: string;
};

export const createSignUpFormConfig = (t: (key: TranslationKey, params?: Record<string, string>) => string): FormConfig<SignupFormValues> => ({
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    validate: (value) => {
      if (!value && typeof value !== 'string') return t('forms.validation.required');
      if (typeof value === 'string' && value.length < 2) return t('forms.validation.minLength', { min: '2' });
      if (typeof value === 'string' && value.length > 50) return t('forms.validation.maxLength', { max: '50' });
      return true;
    }
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    validate: (value) => {
      if (!value && typeof value !== 'string') return t('forms.validation.required');
      if (typeof value === 'string' && value.length < 2) return t('forms.validation.minLength', { min: '2' });
      if (typeof value === 'string' && value.length > 50) return t('forms.validation.maxLength', { max: '50' });
      return true;
    }
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
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
    minLength: 8,
    validate: (value) => {
      if (!value) return t('forms.validation.required');
      if (typeof value !== 'string') return t('forms.validation.invalidValue');
      if (value.length < 8) return t('forms.validation.minLength', { min: '8' });

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasUpperCase) return t('forms.validation.passwordRequirements.uppercase');
      if (!hasLowerCase) return t('forms.validation.passwordRequirements.lowercase');
      if (!hasNumber) return t('forms.validation.passwordRequirements.number');
      if (!hasSpecialChar) return t('forms.validation.passwordRequirements.specialChar');

      return true;
    }
  },
  confirmPassword: {
    required: true,
    validate: (value, values) => {
      if (!value) return t('forms.validation.required');
      if (value !== values.password) return t('forms.validation.passwordMatch');
      return true;
    }
  },
  phoneNumber: {
    required: false,
    pattern: /^\+?[1-9]\d{1,14}$/,
    validate: (value) => {
      if (!value) return true; // Optional field
      if (typeof value !== 'string' || value.length < 10 || !/^\+?[1-9]\d{1,14}$/.test(value)) {
        return t('forms.validation.phoneNumber');
      }
      return true;
    }
  },
  agreeToTerms: {
    required: true,
    validate: (value) => {
      if (!value) return t('forms.validation.agreeToTerms');
      return true;
    }
  }
});
