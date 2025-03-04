import styles from "./header.module.scss";

import { Button } from "@/ui/components";
import { Routes } from "@/models/routes.model";
import { useTranslate } from "@/hooks/use-translate.hook";


const Header = () => {
  const { t } = useTranslate();

  return (
    <header className={styles.container}>
      <Button
        to={Routes.HOME}
        intent="ghost"
        size="lg"
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
        <Button
          to={Routes.VEHICLE}
          intent="ghost"
          size="sm"
        >
          {t('footer.navigation.vehicles')}
        </Button>
        <Button
          to={Routes.STARSHIP}
          intent="ghost"
          size="sm"
        >
          {t('footer.navigation.starships')}
        </Button>
      </nav>
      <div className={styles.actions}>
        <Button
          size="sm"
          intent="ghost"
          to={Routes.SIGN_IN}
        >
          {t('common.signIn')}
        </Button>
        <Button
          size="sm"
          intent="ghost"
          to={Routes.SIGN_UP}
        >
          {t('common.signUp')}
        </Button>
      </div>
    </header>
  );
}

export default Header;
