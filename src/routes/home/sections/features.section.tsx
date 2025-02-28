import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./sections.module.scss";
import { featureItems, landingFeatureIcons } from "./constants/features.constant";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className={styles.featuresCard}>
    <div className={styles.featuresCardIcon}>{icon}</div>
    <h3 className={styles.featuresCardTitle}>{title}</h3>
    <p className={styles.featuresCardDescription}>{description}</p>
  </div>
);

const FeaturesSection = () => {
  const { t } = useTranslate();

  const features = featureItems.map((feature) => ({
    title: t(`landing.features.cards.${feature}.title`),
    description: t(`landing.features.cards.${feature}.description`),
    icon: landingFeatureIcons[feature],
  }));

  return (
    <section className={`${styles.section} ${styles.features}`}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>{t("landing.features.title")}</h2>
        <p className={styles.sectionSubtitle}>{t("landing.features.subtitle")}</p>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
