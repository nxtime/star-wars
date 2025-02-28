import { ReactNode } from 'react';
import Input from '../input/input.component';
import styles from './form-field.module.scss';
import type { FormValues, UseFormReturn } from '@/models/form.model';

interface FormFieldProps<T extends FormValues> {
  id: string;
  label: string;
  fieldName: string;
  placeholder?: string;
  type?: string;
  form: UseFormReturn<T>;
  children?: ReactNode;
  required?: boolean;
}

const FormField = <T extends FormValues>({
  id,
  label,
  fieldName,
  placeholder,
  form,
  children,
  type = 'text',
  required = false
}: FormFieldProps<T>) => {
  const { getFieldProps, touched, errors } = form;
  const fieldError = touched[fieldName] && errors[fieldName] ? errors[fieldName] : null;

  return (
    <div className={styles.formGroup}>
      <label className={styles.formLabel} htmlFor={id}>
        {label}{required && <span className={styles.required}>*</span>}
      </label>

      {children || (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...getFieldProps(fieldName)}
          error={fieldError || undefined}
        />
      )}
    </div>
  );
};

export default FormField;
