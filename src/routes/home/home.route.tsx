import styles from "./home.module.scss";
import HeroSection from "./sections/hero.section";
import FeaturesSection from "./sections/features.section";
import CharactersSection from "./sections/characters.section";
import PlanetsSection from "./sections/planets.section";
import TestimonialsSection from "./sections/testimonials.section";
import CallToActionSection from "./sections/cta.section";

const Home = () => {
  return (
    <div className={styles.container}>
      <HeroSection />
      <FeaturesSection />
      <CharactersSection />
      <PlanetsSection />
      <TestimonialsSection />
      <CallToActionSection />
    </div>
  );
};

export default Home;
