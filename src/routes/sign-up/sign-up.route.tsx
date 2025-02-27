import { useState } from "react";
import { useForm } from "@/hooks/use-form.hook";
import { Button } from "@/ui/components";
import Input from "@/ui/components/input/input.component";
import styles from "./sign-up.module.scss";
import { useTranslate } from "@/hooks/use-translate.hook";
import { SignUpFormFieldsConfig, SignupFormValues } from "./sign-up.contants";

const SignupForm = () => {
  const { t } = useTranslate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    getFieldProps,
    isValid,
    touched,
    reset,
    errors
  } = useForm<SignupFormValues>(SignUpFormFieldsConfig);

  const handleFormSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.warn('Form submitted with values:', values);

      setFormSubmitted(true);

      reset();
    } catch (err) {

      console.error('Error submitting form:', err);

    } finally {
      setIsLoading(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="success-message">
        <h2>Thank you for signing up!</h2>
        <p>Your account has been created successfully.</p>
        <Button onClick={() => setFormSubmitted(false)}>
          Sign Up Another User
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <h2 className="text-xl">Create an Account</h2>
        <div className="form-row">
          <div className="form-group">
            <label className={styles.formLabel} htmlFor="firstName">First Name</label>
            <Input
              id="firstName"
              placeholder="John"
              {...getFieldProps('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <span className="error-message">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label className={styles.formLabel} htmlFor="lastName">Last Name</label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...getFieldProps('lastName')}
            />
            {touched.lastName && errors.lastName && (
              <span className="error-message">{errors.lastName}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className={styles.formLabel} htmlFor="email">Email Address</label>
          <Input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            {...getFieldProps('email')}
          />
          {touched.email && errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label className={styles.formLabel} htmlFor="phoneNumber">Phone Number (Optional)</label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...getFieldProps('phoneNumber')}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <span className="error-message">{errors.phoneNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label className={styles.formLabel} htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            {...getFieldProps('password')}
          />
          {touched.password && errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label className={styles.formLabel} htmlFor="confirmPassword">Confirm Password</label>
          <Input
            id="confirmPassword"
            type="password"
            {...getFieldProps('confirmPassword')}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              id="agreeToTerms"
              {...getFieldProps('agreeToTerms')}
            />
            I agree to the terms and conditions
          </label>
          {touched.agreeToTerms && errors.agreeToTerms && (
            <span className="error-message">{errors.agreeToTerms}</span>
          )}
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            disabled={isLoading || !isValid}
            fullWidth
          >
            {isLoading ? "Creating Account..." : t("common.signUp")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
