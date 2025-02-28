import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/ui/components';
import { Routes } from '@/models/routes.model';
import styles from './error-boundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });

    // Log error to console or error tracking service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use provided fallback or default error UI
      if (fallback) {
        return fallback;
      }

      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className={styles.title}>The Dark Side has disrupted this page</h2>
            <p className={styles.message}>
              {error?.message || "A disturbance in the Force has occurred. We've dispatched a team of Jedi to investigate."}
            </p>
            <div className={styles.actions}>
              <Button onClick={this.handleReset} intent="secondary" size="md">
                Try Again
              </Button>
              <Button to={Routes.HOME} intent="primary" size="md">
                Return Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
