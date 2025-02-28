import { Routes } from "@/models/routes.model";
import { Button } from "@/ui/components";
import { useAuth } from "@/hooks/use-auth.hooks";
import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./user-header.module.scss";

const UserHeader = () => {
  const { t } = useTranslate();
  const { user, logout } = useAuth();

  const getRandomQuote = () => {
    const quotes = [
      "The Force is strong with this one.",
      "I find your lack of faith disturbing.",
      "Do. Or do not. There is no try.",
      "In my experience, there's no such thing as luck.",
      "Your focus determines your reality.",
      "Never tell me the odds!",
      "I've got a bad feeling about this.",
    ];

    const nameSum = user?.firstName?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;

    return quotes[nameSum % quotes.length];
  };

  return (
    <header className={styles.container}>
      <Button
        to={Routes.HOME}
        intent="ghost"
        text="xl"
        animation={null}
      >
        {t('common.title')}
      </Button>

      <nav className={styles.navigation}>
        <Button
          to={Routes.CHARACTER}
          intent="ghost"
          size="sm"
        >
          {t('footer.navigation.characters')}
        </Button>
        <Button
          to={Routes.PLANET}
          intent="ghost"
          size="sm"
        >
          {t('footer.navigation.planets')}
        </Button>
      </nav>

      <div className={styles.userActions}>
        {user && (
          <>
            <div className={styles.userGreeting}>
              <span className={styles.userName}>Hello, {user.firstName}</span>
              <span className={styles.userQuote}>{getRandomQuote()}</span>
            </div>
            <div className={styles.userAvatar}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.firstName} />
              ) : (
                <div className={styles.userInitials}>
                  {user.firstName[0]}{user.lastName[0]}
                </div>
              )}
            </div>
            <Button
              intent="ghost"
              size="sm"
              onClick={logout}
            >
              Rebel Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
