import styles from "./header.module.scss";

import { Button } from "@/ui/components";
import { Routes } from "@/models/routes.model";


const Header = () => {
  return (
    <header className={styles.container}>
      <Button
        to={Routes.HOME}
        intent="ghost"
        size="lg"
        text="xl"
        animation={null}
      >
        Star Wars
      </Button>
      <div className={styles.actions}>
        <Button
          size="sm"
          intent="ghost"
          to={Routes.SIGN_IN}
        >
          Sign In
        </Button>
        <Button
          size="sm"
          intent="ghost"
          to={Routes.SIGN_UP}
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
}

export default Header;
