import { Button } from "@/ui/components";
import { Routes } from "@/models/routes.model";
import styles from "./not-found.module.scss";

const NotFound = () => {
  const getRandomStarWarsQuote = () => {
    const quotes = [
      "This is not the page you're looking for.",
      "That's no page. It's a 404 error.",
      "The page has been destroyed. I felt a great disturbance in the Force.",
      "The page exists not. Do or do not, there is no page.",
      "The ability to navigate does not make you intelligent. This page is gone.",
      "These aren't the URLs you're looking for. Move along.",
      "I find your lack of navigation disturbing.",
      "Help me Obi-Wan Kenobi. This page is my only hope.",
    ];

    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.error}>404</h1>
        <h2 className={styles.quote}>{getRandomStarWarsQuote()}</h2>
        <p className={styles.message}>
          It seems the page you were looking for has been lost in a galaxy far, far away...
        </p>
        <div className={styles.actions}>
          <Button to={Routes.HOME} intent="primary" animation="bounce">
            Return to the Light Side
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
