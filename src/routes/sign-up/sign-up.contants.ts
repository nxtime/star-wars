import { FormConfig, FormValues } from "@/models/form.model";

export interface SignupFormValues extends FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: string;
  phoneNumber?: string;
};

export const SignUpFormFieldsConfig: FormConfig<SignupFormValues> = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  },
  password: {
    required: true,
    minLength: 8,
    validate: (value) => {
      if (typeof value !== 'string') return 'Password must be a string';

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (!hasUpperCase) return 'Password must contain at least one uppercase letter';
      if (!hasLowerCase) return 'Password must contain at least one lowercase letter';
      if (!hasNumber) return 'Password must contain at least one number';
      if (!hasSpecialChar) return 'Password must contain at least one special character';

      return true;
    }
  },
  confirmPassword: {
    required: true,
    validate: (value, values) =>
      value === values.password || 'Passwords must match'
  },
  phoneNumber: {
    required: false,
    pattern: /^\+?[1-9]\d{1,14}$/,
    validate: (value) => {
      if (!value) return true; // Optional field
      return typeof value === 'string' && value.length >= 10 ? true : 'Invalid phone number';
    }
  },
  agreeToTerms: {
    required: true,
    validate: (value) =>
      !!value || 'You must agree to the terms and conditions'
  }
};
