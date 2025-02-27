export type FieldValue = string | number | readonly string[] | undefined;

export interface FieldConfig {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: FieldValue, values: FormValues) => boolean | string;
  initialValue?: FieldValue;
}

export type FormConfig<K extends Partial<FormValues>> = {
  [Key in keyof K]: FieldConfig;
}

export type FormValues = {
  [fieldName: string]: FieldValue;
};

export type FormErrors<K extends FormValues> = {
  [Key in keyof K]: string | null;
};

export type FieldTouched<K extends FormValues> = {
  [Key in keyof K]: boolean;
};

type FormElements = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export interface UseFormReturn<T extends FormValues> {
  values: T;
  errors: FormErrors<T>;
  touched: FieldTouched<T>;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<FormElements>) => void;
  handleBlur: (e: React.FocusEvent<FormElements>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void> | void) => (e: React.FormEvent) => void;
  reset: () => void;
  setValue: (name: keyof T, value: FieldValue) => void;
  setError: (name: keyof T, error: string | null) => void;
  setTouched: (name: keyof T, isTouched: boolean) => void;
  getFieldProps: (fieldName: keyof T) => {
    name: string;
    value: FieldValue;
    onChange: (e: React.ChangeEvent<FormElements>) => void;
    onBlur: (e: React.FocusEvent<FormElements>) => void;
    'aria-invalid'?: boolean;
  };
}

