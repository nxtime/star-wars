import { FC, useRef } from 'react';
import { useModal } from '@/hooks/use-modal.hook';
import styles from './planet-card.module.scss';
import { Planet } from '@/models/entity.model';
import { useRouter } from '@/hooks/use-router.hook';
import { formatPopulation } from '@/utils/entity.util';
import { getImage } from '@/utils/fetch.util';

const PlanetCard: FC<Planet> = ({
  id,
  name,
  region,
  climate,
  terrain,
  population,
  imageUrl,
  imagePlaceholder
}) => {
  const { setParam } = useRouter();
  const { openModal } = useModal();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      cardRef.current.setAttribute("data-modal-triggered", "true");

      openModal(name);
      setParam("id", id);
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div
        className={styles.image}
        style={{
          backgroundColor: imagePlaceholder,
          backgroundImage: `url(${getImage(imageUrl, "planets", true)})`
        }}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.region}>{region}</p>

        <div className={styles.info}>
          <span className={styles.infoItem}>
            <span className={styles.label}>Climate:</span>
            <span className={styles.value}>{climate[0]}</span>
          </span>

          <span className={styles.infoItem}>
            <span className={styles.label}>Terrain:</span>
            <span className={styles.value}>{terrain[0]}</span>
          </span>

          <span className={styles.infoItem}>
            <span className={styles.label}>Population:</span>
            <span className={styles.value}>{formatPopulation(population)}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlanetCard;
