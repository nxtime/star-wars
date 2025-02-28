import { useState } from "react";
import { landingCharactersData } from "@/routes/home/sections/constants/characters.constant";
import styles from "./character.module.scss";

const Character = () => {
  const [characters] = useState([
    ...landingCharactersData,
    {
      name: "Obi-Wan Kenobi",
      role: "Jedi Master",
      affiliation: "Jedi Order, Rebel Alliance",
      species: "Human",
      imagePlaceholder: "#5d7b9e"
    },
    {
      name: "Rey",
      role: "Jedi",
      affiliation: "Resistance",
      species: "Human",
      imagePlaceholder: "#d2b48c"
    },
    {
      name: "Chewbacca",
      role: "Co-pilot, Warrior",
      affiliation: "Rebel Alliance, Resistance",
      species: "Wookiee",
      imagePlaceholder: "#8b4513"
    },
    {
      name: "Yoda",
      role: "Jedi Grand Master",
      affiliation: "Jedi Order, Galactic Republic",
      species: "Unknown",
      imagePlaceholder: "#6b8e23"
    }
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Star Wars Characters</h1>
        <p className={styles.subtitle}>
          "In a galaxy full of characters, these are the ones that stand out."
        </p>
      </div>

      <div className={styles.grid}>
        {characters.map((character, index) => (
          <div key={index} className={styles.card}>
            <div
              className={styles.cardImage}
              style={{ backgroundColor: character.imagePlaceholder }}
            >
              <div className={styles.cardInitial}>{character.name[0]}</div>
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardName}>{character.name}</h2>
              <div className={styles.cardDetails}>
                <div className={styles.cardDetail}>
                  <span className={styles.cardDetailLabel}>Role:</span>
                  <span>{character.role}</span>
                </div>
                <div className={styles.cardDetail}>
                  <span className={styles.cardDetailLabel}>Affiliation:</span>
                  <span>{character.affiliation}</span>
                </div>
                <div className={styles.cardDetail}>
                  <span className={styles.cardDetailLabel}>Species:</span>
                  <span>{character.species}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Character;
