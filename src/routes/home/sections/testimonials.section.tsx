import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./sections.module.scss";
import { landingTestimonialsData } from "./constants/testimonials.constant";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  avatarColor: string;
}

const TestimonialCard = ({ quote, name, title, avatarColor }: TestimonialCardProps) => (
  <div className={styles.testimonialsCard}>
    <p className={styles.testimonialsCardQuote}>{quote}</p>
    <div className={styles.testimonialsCardAuthor}>
      <div
        className={styles.testimonialsCardAuthorAvatar}
        style={{ backgroundColor: avatarColor }}
      />
      <div className={styles.testimonialsCardAuthorInfo}>
        <span className={styles.testimonialsCardAuthorInfoName}>{name}</span>
        <span className={styles.testimonialsCardAuthorInfoTitle}>{title}</span>
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  const { t } = useTranslate();

  return (
    <section className={`${styles.section} ${styles.testimonials}`}>
      <div className={styles.sectionContent}>
        <h2 className={styles.sectionTitle}>{t("landing.testimonials.title")}</h2>
        <p className={styles.sectionSubtitle}>{t("landing.testimonials.subtitle")}</p>

        <div className={styles.testimonialsList}>
          {landingTestimonialsData.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection
