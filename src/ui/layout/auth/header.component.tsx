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
