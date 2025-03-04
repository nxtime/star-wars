import { FC, useRef } from 'react';
import { useModal } from '@/hooks/use-modal.hook';
import styles from './starship-card.module.scss';
import { Starship } from '@/models/entity.model';
import { useRouter } from '@/hooks/use-router.hook';
import { formatCredits, formatLength, formatArrayItems } from '@/utils/entity.util';

const StarshipCard: FC<Starship> = ({
  id,
  name,
  model,
  class: starshipClass,
  cost_in_credits,
  length,
  hyperdrive_rating,
  max_atmosphering_speed,
  crew,
  passengers,
  armament,
  imagePlaceholder
}) => {
  const { setParam } = useRouter();
  const { openModal } = useModal();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      cardRef.current.setAttribute("data-modal-triggered", "true");
      openModal(name);
      setParam("id", id.toString());
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
        style={{ backgroundColor: imagePlaceholder }}
      />
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.model}>{model}</p>
        <div className={styles.info}>
          <span className={styles.infoItem}>
            <span className={styles.label}>Class:</span>
            <span className={styles.value}>{starshipClass}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Hyperdrive:</span>
            <span className={styles.value}>Class {hyperdrive_rating}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Speed:</span>
            <span className={styles.value}>{max_atmosphering_speed} km/h</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Length:</span>
            <span className={styles.value}>{formatLength(length)}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Crew/Passengers:</span>
            <span className={styles.value}>{crew}/{passengers}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Armament:</span>
            <span className={styles.value}>{formatArrayItems(armament)}</span>
          </span>
          <span className={styles.infoItem}>
            <span className={styles.label}>Cost:</span>
            <span className={styles.value}>{formatCredits(cost_in_credits)} credits</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StarshipCard;
