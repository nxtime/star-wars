import { Button } from "@/ui/components";
import { Routes } from "@/models/routes.model";
import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./sections.module.scss";
import { landingPlanetsData } from "./constants/planets.constant";

interface PlanetCardProps {
  name: string;
  description: string;
  climate: string;
  terrain: string;
  population: string;
  colorHex: string;
}

const PlanetCard = ({ name, description, climate, terrain, population, colorHex }: PlanetCardProps) => {
  const { t } = useTranslate();

  return (
    <div className={styles.planetsCard}>
      <div className={styles.planetsCardImage} style={{ backgroundColor: colorHex }} />
      <h3 className={styles.planetsCardName}>{name}</h3>
      <p className={styles.planetsCardDescription}>{description}</p>
      <div className={styles.planetsCardStats}>
        <div className={styles.planetsCardStatsItem}>
          <span>{t("landing.planets.cards.climate")}</span>
          <span>{climate}</span>
        </div>
        <div className={styles.planetsCardStatsItem}>
          <span>{t("landing.planets.cards.terrain")}</span>
          <span>{terrain}</span>
        </div>
        <div className={styles.planetsCardStatsItem}>
          <span>{t("landing.planets.cards.population")}</span>
          <span>{population}</span>
        </div>
      </div>
    </div>
  )
};

const PlanetsSection = () => {
  const { t } = useTranslate();

  return (
    <section className={`${styles.section} ${styles.planets}`}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>{t("landing.planets.title")}</h2>
        <p className={styles.sectionSubtitle}>
          {t("landing.planets.subtitle")}
        </p>

        <div className={styles.planetsList}>
          {landingPlanetsData.map((planet, index) => (
            <PlanetCard key={index} {...planet} />
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Button
            to={Routes.PLANET}
            intent="secondary"
            animation="scale"
            size="md"
          >
            {t("landing.planets.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PlanetsSection;
