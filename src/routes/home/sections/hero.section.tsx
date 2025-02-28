import { Button } from "@/ui/components";
import { Routes } from "@/models/routes.model";
import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./sections.module.scss";

const HeroSection = () => {
  const { t } = useTranslate();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Explore the <span>Star Wars</span> Universe
        </h1>
        <p className={styles.heroSubtitle}>{t("landing.hero.subtitle")}</p>
        <div className={styles.heroActions}>
          <Button
            to={Routes.SIGN_UP}
            intent="primary"
            animation="bounce"
          >
            {t("landing.hero.cta.join")}
          </Button>
          <Button
            to={Routes.SIGN_IN}
            intent="secondary"
            animation="scale"
          >
            {t("landing.hero.cta.signIn")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
