import { useState } from "react";
import { useForm } from "@/hooks/use-form.hook";
import { Button, FormField } from "@/ui/components";
import styles from "./sign-up.module.scss";
import { useTranslate } from "@/hooks/use-translate.hook";
import { SignupFormValues, createSignUpFormConfig } from "./sign-up.contants";

const SignupForm = () => {
  const { t } = useTranslate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signUpFormConfig = createSignUpFormConfig(t);

  const form = useForm<SignupFormValues>(signUpFormConfig);

  const {
    handleSubmit,
    isValid,
    reset
  } = form;

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
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <h2>{t('forms.submission.success')}</h2>
          <p>{t('forms.submission.successMessage')}</p>
          <Button onClick={() => setFormSubmitted(false)}>
            {t('common.createAnotherAccount')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <h2 className="text-lg">{t('common.createAccount')}</h2>

        <div className={styles.formRow}>
          <FormField
            id="firstName"
            label={t('forms.labels.firstName')}
            fieldName="firstName"
            placeholder={t('forms.placeholders.firstName')}
            form={form}
            required
          />

          <FormField
            id="lastName"
            label={t('forms.labels.lastName')}
            fieldName="lastName"
            placeholder={t('forms.placeholders.lastName')}
            form={form}
            required
          />
        </div>

        <FormField
          id="email"
          label={t('forms.labels.email')}
          fieldName="email"
          type="email"
          placeholder={t('forms.placeholders.email')}
          form={form}
          required
        />

        <FormField
          id="phoneNumber"
          label={t('forms.labels.phoneNumber')}
          fieldName="phoneNumber"
          type="tel"
          placeholder={t('forms.placeholders.phoneNumber')}
          form={form}
        />

        <div className={styles.formRow}>
          <FormField
            id="password"
            label={t('forms.labels.password')}
            fieldName="password"
            type="password"
            form={form}
            placeholder="*******"
            required
          />

          <FormField
            id="confirmPassword"
            label={t('forms.labels.confirmPassword')}
            fieldName="confirmPassword"
            type="password"
            form={form}
            placeholder="*******"
            required
          />
        </div>

        <div className={styles.checkboxGroup}>
          <FormField
            id="agreeToTerms"
            label={t('forms.labels.agreeToTerms')}
            fieldName="agreeToTerms"
            form={form}
            required
          >
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                id="agreeToTerms"
                {...form.getFieldProps('agreeToTerms')}
              />
              <span>{t('forms.labels.agreeToTerms')}</span>
            </label>
          </FormField>
        </div>

        <div className={styles.formActions}>
          <Button
            type="submit"
            disabled={isLoading || !isValid}
            fullWidth
          >
            {isLoading ? t('forms.submission.loading') : t('common.signUp')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
