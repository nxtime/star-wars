import { useState } from "react";
import { landingPlanetsData } from "@/routes/home/sections/constants/planets.constant";
import { useTranslate } from "@/hooks/use-translate.hook";
import styles from "./planet.module.scss";

const Planet = () => {
  const { t } = useTranslate();
  const [planets] = useState([
    ...landingPlanetsData,
    {
      name: "Dagobah",
      description: "A remote world of swamps and forests, and home to Yoda during his final years.",
      climate: "Murky",
      terrain: "Swamp, Jungle",
      population: "Unknown",
      colorHex: "#4a6741"
    },
    {
      name: "Mustafar",
      description: "A small volcanic planet that was the site of Darth Vader's defeat by Obi-Wan Kenobi.",
      climate: "Hot",
      terrain: "Volcanoes, Lava rivers",
      population: "20,000",
      colorHex: "#c43c00"
    },
    {
      name: "Kashyyyk",
      description: "Forest planet and homeworld of the Wookiees, including Chewbacca.",
      climate: "Tropical",
      terrain: "Jungle, Forests, Lakes",
      population: "45 million",
      colorHex: "#355e3b"
    },
    {
      name: "Kamino",
      description: "Ocean world where the Republic's clone army was created.",
      climate: "Temperate",
      terrain: "Ocean",
      population: "1 billion",
      colorHex: "#1a3f5c"
    }
  ]);

  // A cheeky Star Wars quote
  const starWarsQuote = "The galaxy is full of worlds to explore, but few as interesting as these.";

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Planets of the Galaxy</h1>
        <p className={styles.subtitle}>{starWarsQuote}</p>
      </div>

      <div className={styles.grid}>
        {planets.map((planet, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.cardImage}
              style={{ backgroundColor: planet.colorHex }}
            ></div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardName}>{planet.name}</h2>
              <p className={styles.cardDescription}>{planet.description}</p>

              <div className={styles.cardDetails}>
                <div className={styles.cardDetail}>
                  <span className={styles.cardDetailLabel}>
                    {t("landing.planets.cards.climate")}:
                  </span>
                  <span>{planet.climate}</span>
                </div>
                <div className={styles.cardDetail}>
                  <span className={styles.cardDetailLabel}>
                    {t("landing.planets.cards.terrain")}:
                  </span>
                  <span>{planet.terrain}</span>
                </div>
                <div className={styles.cardDetail}>
                  <span className={styles.cardDetailLabel}>
                    {t("landing.planets.cards.population")}:
                  </span>
                  <span>{planet.population}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planet;
