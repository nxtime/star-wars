import { Button } from "@/ui/components";
import { Routes } from "@/models/routes.model";
import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./sections.module.scss";

const CallToActionSection = () => {
  const { t } = useTranslate();

  return (
    <section className={`${styles.section} ${styles.cta}`}>
      <div className={`${styles.sectionContent} ${styles.ctaContainer}`}>
        <h2 className={styles.ctaTitle}>{t("landing.cta.title")}</h2>
        <p className={styles.ctaSubtitle}>{t("landing.cta.subtitle")}</p>

        <div className={styles.ctaActions}>
          <Button
            to={Routes.SIGN_UP}
            intent="secondary"
            animation="bounce"
          >
            {t("landing.cta.join")}
          </Button>
          <Button
            to={Routes.SIGN_IN}
            intent="ghost"
            animation="scale"
            className="text-surface1"
          >
            {t("landing.cta.signIn")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
