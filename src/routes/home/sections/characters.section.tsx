import { Button } from "@/ui/components";
import { Routes } from "@/models/routes.model";
import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./sections.module.scss";
import { landingCharactersData } from "./constants/characters.constant";

interface CharacterCardProps {
  name: string;
  role: string;
  affiliation: string;
  species: string;
  imagePlaceholder: string;
}

const CharacterCard = ({ name, role, affiliation, species, imagePlaceholder }: CharacterCardProps) => (
  <div className={styles.charactersCard}>
    <div className={styles.charactersCardImage} style={{ backgroundColor: imagePlaceholder }} />
    <div className={styles.charactersCardContent}>
      <h3 className={styles.charactersCardName}>{name}</h3>
      <div className={styles.charactersCardInfo}>
        <span>Role: {role}</span>
        <span>Affiliation: {affiliation}</span>
        <span>Species: {species}</span>
      </div>
    </div>
  </div>
);

const CharactersSection = () => {
  const { t } = useTranslate();

  return (
    <section className={`${styles.section} ${styles.characters}`}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>{t("landing.characters.title")}</h2>
        <p className={styles.sectionSubtitle}>{t("landing.characters.subtitle")}</p>

        <div className={styles.charactersGrid}>
          {landingCharactersData.map((character, index) => (
            <CharacterCard key={index} {...character} />
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <Button
            to={Routes.CHARACTER}
            intent="secondary"
            animation="scale"
            size="md"
          >
            {t("landing.characters.viewAll")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CharactersSection;
