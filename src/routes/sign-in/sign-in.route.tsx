import { useState } from "react";

import styles from "./sign-in.module.scss";

import { useAuth } from "@/hooks/use-auth.hooks";
import { Button } from "@/ui/components";
import Input from "@/ui/components/input/input.component";

const SignIn = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Get form data using FormData API
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login({
        email,
        password,
      });
      // Successful login is handled by the auth context
    } catch (err) {
      setError(typeof err === "string" ? err : "Failed to sign in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className="sign-in-title text-xl">Sign In</h2>

        {error && <div className="sign-in-error">{error}</div>}

        <fieldset className="sign-in-fieldset" disabled={isLoading}>
          <div className="form-group">
            <label htmlFor="email" className={styles.formLabel}>Email:</label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Password:</label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="******"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
