import { forwardRef, InputHTMLAttributes } from 'react';
import '@/styles/components/input.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, fullWidth = true, ...props }, ref) => {
    const inputClasses = [
      'input',
      error ? 'input-error' : '',
      fullWidth ? 'input-full-width' : '',
      className || '',
    ].filter(Boolean).join(' ');

    return (
      <div className="input-wrapper">
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && <p className="input-error-message">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
