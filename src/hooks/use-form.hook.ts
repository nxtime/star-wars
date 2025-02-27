import { FieldTouched, FieldValue, FormConfig, FormErrors, FormValues, UseFormReturn } from '@/models/form.model';
import { useState, useCallback, useEffect } from 'react';

export const useForm = <T extends FormValues>(config: FormConfig<T>): UseFormReturn<T> => {
  const initialValues = Object.entries(config).reduce<Partial<Record<keyof T, FieldValue>>>((acc, [fieldName, fieldConfig]) => {
    acc[fieldName as keyof T] = fieldConfig.initialValue ?? '';

    return acc;
  }, {} as Record<keyof T, FieldValue>) as T;

  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({} as FormErrors<T>);
  const [touched, setTouched] = useState<FieldTouched<T>>({} as FieldTouched<T>);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkIsValid = useCallback((formErrors: FormErrors<T> = errors): boolean => {
    return Object.values(formErrors).every(error => !error);
  }, [errors]);

  const [isValid, setIsValid] = useState(checkIsValid());


  const validateField = useCallback((name: keyof T, value: FieldValue): string | null => {
    const fieldConfig = config[name];
    if (!fieldConfig) return null;

    if (fieldConfig.required && (value === '' || value === null)) {
      return 'This field is required';
    }

    if (typeof value === 'string') {
      if (fieldConfig.minLength && value.length < fieldConfig.minLength) {
        return `Minimum length is ${fieldConfig.minLength} characters`;
      }

      if (fieldConfig.maxLength && value.length > fieldConfig.maxLength) {
        return `Maximum length is ${fieldConfig.maxLength} characters`;
      }

      if (fieldConfig.pattern && !fieldConfig.pattern.test(value)) {
        return 'Invalid format';
      }
    }

    if (fieldConfig.validate) {
      const validationResult = fieldConfig.validate(value, values);
      if (typeof validationResult === 'string') {
        return validationResult;
      }
      if (validationResult === false) {
        return 'Invalid value';
      }
    }

    return null;
  }, [config]);

  const validateForm = useCallback((): FormErrors<T> => {
    const newErrors = {} as FormErrors<T>;

    Object.keys(config).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName as keyof T] = error;
      }
    });

    return newErrors;
  }, [config, validateField, values]);

  useEffect(() => {
    setIsValid(checkIsValid());
  }, [errors, checkIsValid]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const fieldValue: FieldValue = type === 'checkbox' ? String(checked) : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    setIsDirty(true);

    const fieldError = validateField(name, fieldValue);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  }, [validateField]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name } = e.target;

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const fieldError = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  }, [validateField, values]);

  const handleSubmit = useCallback((onSubmit: (values: T) => Promise<void> | void) => {
    return async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(config).reduce<FieldTouched<T>>((acc, fieldName) => {
        acc[fieldName as keyof T] = true;
        return acc;
      }, {} as FieldTouched<T>);

      setTouched(allTouched);

      const formErrors = validateForm();
      setErrors(formErrors);

      if (checkIsValid(formErrors)) {
        setIsSubmitting(true);
        try {
          await onSubmit(values);
        } finally {
          setIsSubmitting(false);
        }
      }
    };
  }, [config, validateForm, checkIsValid, values]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({} as FormErrors<T>);
    setTouched({} as FieldTouched<T>);
    setIsDirty(false);
    setIsSubmitting(false);
  }, [initialValues]);

  const setValue = useCallback((name: keyof T, value: FieldValue) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    setIsDirty(true);

    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  }, [validateField]);

  const setError = useCallback((name: keyof T, error: string | null) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  const setFieldTouched = useCallback((name: keyof T, isTouched: boolean) => {
    setTouched(prev => ({
      ...prev,
      [name]: isTouched
    }));
  }, []);

  const getFieldProps = useCallback((fieldName: keyof T) => {
    return {
      name: fieldName as string,
      value: values[fieldName] ?? '',
      onChange: handleChange,
      onBlur: handleBlur,
      'aria-invalid': Boolean(errors[fieldName] && touched[fieldName])
    };
  }, [values, handleChange, handleBlur, errors, touched]);

  return {
    values,
    errors,
    touched,
    isValid,
    isDirty,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
    setError,
    setTouched: setFieldTouched,
    getFieldProps
  };
};
