import { useState } from "react";
import { useForm } from "@/hooks/use-form.hook";
import { Button, FormField, Link } from "@/ui/components";
import { useAuth } from "@/hooks/use-auth.hooks";
import { useTranslate } from "@/hooks/use-translate.hook";
import { Routes } from "@/models/routes.model";
import { SignInFormValues, createSignInFormConfig } from "./sign-in.constants";
import styles from "./sign-in.module.scss";

const SignIn = () => {
  const { t } = useTranslate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const signInFormConfig = createSignInFormConfig(t);

  const form = useForm<SignInFormValues>(signInFormConfig);

  const {
    handleSubmit,
    isValid
  } = form;

  const handleFormSubmit = async (formValues: SignInFormValues) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      await login({
        email: formValues.email,
        password: formValues.password
      });
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : t('forms.errors.loginFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
        <h2 className="text-lg">{t('common.signIn')}</h2>

        {authError && (
          <div className={styles.error}>
            {authError}
          </div>
        )}

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
          id="password"
          label={t('forms.labels.password')}
          fieldName="password"
          type="password"
          form={form}
          required
        />

        <div className={styles.formOptions}>
          <div className={styles.checkboxGroup}>
            <FormField
              id="rememberMe"
              label={t('forms.labels.rememberMe')}
              fieldName="rememberMe"
              form={form}
            >
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  {...form.getFieldProps('rememberMe')}
                />
                <span>{t('forms.labels.rememberMe')}</span>
              </label>
            </FormField>
          </div>
          <Button intent="ghost" size="sm" animation={null} type="button">
            {t('forms.actions.forgotPassword')}
          </Button>
        </div>

        <div className={styles.formActions}>
          <Button
            type="submit"
            disabled={isLoading || !isValid}
            fullWidth
          >
            {isLoading ? t('forms.submission.loggingIn') : t('common.signIn')}
          </Button>
        </div>

        <div className={styles.formFooter}>
          <p>{t('forms.texts.noAccount')}</p>
          <Link to={Routes.SIGN_UP} className="text-sm">
            {t('common.signUp')}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

